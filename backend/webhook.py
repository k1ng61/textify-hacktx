from functools import wraps

from twilio.twiml.voice_response import VoiceResponse
from twilio.twiml.messaging_response import MessagingResponse
from twilio.request_validator import RequestValidator
import os
import json
from google.cloud import firestore
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from datetime import datetime, timedelta
from twilio.rest import Client
import openai
from datetime import datetime

from flask import (
    Flask,
    abort,
    current_app,
    request,
    Response
)

import os

openai.api_key = os.environ['OPENAI']

app = Flask(__name__)

cred = credentials.Certificate('firebase_data.json')

# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': os.environ['REALTIMEDBURL']
})

firestore_db = firestore.Client.from_service_account_json("firebase_data.json")


def validate_twilio_request(f):
    """Validates that incoming requests genuinely originated from Twilio"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Create an instance of the RequestValidator class
        validator = RequestValidator(os.environ['TWILIO'])

        # Validate the request using its URL, POST data,
        # and X-TWILIO-SIGNATURE header
        request_valid = validator.validate(
            request.url,
            request.form,
            request.headers.get('X-TWILIO-SIGNATURE', ''))

        # Continue processing the request if it's valid, return a 403 error if
        # it's not
        if request_valid or current_app.debug:
            return f(*args, **kwargs)
        else:
            return abort(403)
    return decorated_function



@app.route('/message', methods=['POST'])
@validate_twilio_request
def incoming_message():
    """Twilio Messaging URL - receives incoming messages from Twilio"""
    # Create a new TwiML response
    resp = MessagingResponse()
    
    sender_phone_number = request.values['From']
    collection_ref = firestore_db.collection("Campaigns")

    campaigns = collection_ref.stream()
    finalresponse = ''
    # Iterate through the documents
    for campaign in campaigns:
        # Access data from the document
        data = campaign.to_dict()
        
        for user in data['users']:
            if f"+{user['number']}" == sender_phone_number:
                current_datetime = datetime.now()

                timestamp = int(current_datetime.timestamp())

                oldref = db.reference('/' + str(campaign.id) + '/' + f"{user['number']}" + '/' + str(timestamp))

                # JSON data to add to the database
                json_data = {
                    "role": "user",
                    "content": request.values['Body'],
                    "timestamp": timestamp  # Add the timestamp to the JSON data
                }

                # Convert the JSON data to a dictionary and add it to the reference
                oldref.update(json_data)  

                realtime_db_ref = db.reference('/' + str(campaign.id) + '/' + f"{user['number']}")

                realtime_data = realtime_db_ref.get()
                unfilteredConvo = []
                for item in realtime_data:
                    if item is not None:
                        unfilteredConvo.append(realtime_data[item])
                
                print(unfilteredConvo)

                sortedConvo = sorted(unfilteredConvo, key=lambda x: x['timestamp'])

                # Create an empty list for 'filteredConvo'
                filteredConvo = []

                # Iterate over the 'sortedConvo', and add to 'filteredConvo'
                for item in sortedConvo:
                    # Only add 'content' and 'role' to the new list
                    filteredConvo.append({'content': item['content'], 'role': item['role']})
                schema = {
                    "type": "object",
                    "properties": {
                        "reply": {
                            "type": "string",
                            "description": "reply to the user"
                        },
                    
                    },
                    "required": ["reply"]
                }

                messages = [
                    {"role": "system", "content": f'''
                    You're a salesman, selling a product. here is details on the sale {data['salesInfo']} . This is a text convo, keep it short and simple. User's name is {user['name']}. keep responses under 10 words, don't get off topic, continue selling your sales'''},
                    
                ]   + filteredConvo + [{"role": "user", "content": request.values['Body']}]

                print(messages)
                completion = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo-0613", # model identifier may be different when implementing this
                    messages=messages,
                    functions=[{"name": "send_message", "parameters": schema}],
                    function_call={"name": "send_message"}
                )

                openresp = json.loads(completion.choices[0].message.function_call.arguments)

                finalresponse = openresp['reply']  
                print(finalresponse)
                current_datetime = datetime.now()

                timestamp = int(current_datetime.timestamp())

                realtime_db_ref = db.reference('/' + str(campaign.id) + '/' + f"{user['number']}" + '/' + str(timestamp))

                # JSON data to add to the database
                json_data = {
                    "role": "assistant",
                    "content": finalresponse,
                    "timestamp": timestamp  # Add the timestamp to the JSON data
                }

                # Convert the JSON data to a dictionary and add it to the reference
                realtime_db_ref.update(json_data)             
    
    # <Message> a text back to the person who texted us
    
    body = finalresponse
    resp.message(body)

    # Return the TwiML
    return str(resp)
  

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3000)