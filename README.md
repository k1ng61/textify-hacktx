<img width="1185" alt="banner" src="https://firebasestorage.googleapis.com/v0/b/bimi-b478b.appspot.com/o/Blue%20Pink%20Gradient%20Fashion%20Banner.png?alt=media&token=f5920a81-f6b2-4b18-b74c-8d4912c6d3ec">

## Inspiration
Brands make millions of dollars with email marketing every year. SMS marketing performs much better than email in every metric possible, yet its not widely used. Now imagine you can add an AI salesman to the mix that closes deals for you directly in your customers messages. Introducing Textify.

## What it does
Textify is a SMS marketing platform that allows brands to easily launch sales campaign directly on their customer's messages. All you have to do is add a some details about your company, product, upload csv of leads (optional), and our AI salesman will message everyone on your list in order to close them. 

## How we built it

There are three main parts of Textify. The web app, twilio webhook, and a proactive messaging algorithm. 

The web app allows brands to create an account and setup their campaigns. We have a couple different features for them built-in such as being able to upload a csv with their leads, a built-in form  they can send to people to join their campaign, and analytics. 

The twilio webhook is designed to respond to the lead. Whenver a message comes in, it figures out which campaign it belongs to, get the messaging history, and properly respond/nurture the lead.

The proactive message algorithm is designed to send the first message, and follow ups with users when necessary.

###UI/UX Design
We used figma to generalize our design inspo and used tailwind to build it out in our nextjs web app. Our focus was to make our design simple yet bold. Catching people's attention, yet still allowing a very simple user process. 

### Product Management
We used devrev to organize everything. It was really helpful, being able to easily add tasks/bugs as well as future roadmaps on the same app was great. We also embeded the customer support chatbot to our app, which will help us down the line when more people are using textify.

Overall using devrev really taught us the power of customer-centric development.

### Backend Development
<img width="1185" alt="Screen Shot 2023-04-16 at 10 37 28 AM" src="https://firebasestorage.googleapis.com/v0/b/bimi-b478b.appspot.com/o/textifydashboard.png?alt=media&token=e04ebff7-762c-4b3b-8aa7-620b6f3a3933">
####Database
We used google cloud to handle all of our data storage needs. Static info that required very less changes over time like User details and campaign details are stored in Firebase Firestore. All of the back and forth messages between our AI salesman and leads are stored in Firebase Realtime database. Usage of google cloud, overall, made everything much simpler as users can easily signup for an account on Textify by connecting their google account, which wouldn't have been possible without Firebase Authentication.

#### AI Salesman
![Dark Blue with Space Photos Movie Ticket-4](https://firebasestorage.googleapis.com/v0/b/bimi-b478b.appspot.com/o/textifydataset.png?alt=media&token=18c15367-a663-4434-89ed-0ec45719f651)
Our AI salesman is a gpt-3.5-turbo model fine tuned on a kaggle dataset. One of the biggest challenges we had was find a good dataset that had back and forth sales conversation in a short text-like manner. Emails are meant to be long, text messages are not. We ended up using this customer support dataset on twitter as it offered a lot of conversations between brands and users in a short text-like manner. 

Preprocessing this dataset was also a huge task as threads aren't very easy to detect algorithmically and it's filled with a bunch of fillers such as tags and tweet links that we had to get rid off. But once that was done, fine tuning it was pretty straightforward.

#### Twilio webhook and proactive messaging alogrithm
The twilio webhook and proactive messaging algorithms both work the same architecturally. Read messages from Firebase Realtime database, pass into fine tuned gpt, embeded with specification about the brand/product and send the response.

Both are hosted on AWS ec2 server, which allows us to keep the algorithms running at all time. 

## Challenges we ran into
###Twilio Toll free number Verification
While we were testing, we saw that some of the responses were being sent thorugh our server but they weren't being received. We dug further and found that some messages were being randomly blocked by twilio because we didn't have a toll free number on our account. The solution is to first switch to a paid account, and then fill out your company incorporation details in order to never get that error again.

## What we learned
One of the biggest thing we learned was data management. A full stack application using different types of databases for different types of data, all being pulled/edited from different parts of the app. Another thing was product management, we extensively used Dev Rev to keep track of all our tasks, so we can stay on top of things while maintaing good coding standards. Small things like designing the app architecturally before coding, and really separating  our core features from second-level ones in order to get things faster was very important.

## What's next for Textify
We genuinely believe this is a billion dollar company if executed well. SMS marketing is still a very un saturated market from a business prospective. We have a bunch of features in our notes such as customer segmentation (where the lead left off, so you can target them differently), allowing users to have multiple phone numbers, etc. 
