# Backend (Server)
  

## Table of Contents
- [Installation](#installation)
- [Database Models](#database-models)
- [Ideas for Scalability](#ideas-for-scalability)
  - [Scaling](#scaling)
  - [Scaling Scheme](#scaling-scheme)
  - [Balancing](#balancing)
  - [Caching](#caching)
  - [Data Partitioning](#data-partitioning)
  - [CAP](#cap)
- [Environment Variables](#environment-variables)
- [Screeshots](#screenshots)
- [Folder Structure](#folder-structure)
- [Code Samples](#code-samples)
- [Testing](#Testing)

## installation

- clone the project `git clone https://github.com/Advanced-Computer-Lab-2022/Hungry-for-Grades`

- go to server : `cd server`

- to install packages : `yarn install`

- to run the backend : `yarn run dev`


## Database Models
- The Admin model is the user holds all the general information and personal information regarding that model like the name email password(hashed) and whether they are active or not and whether email is verfied or not..
```
{"_id":{"$oid":"637a20d4a0fc7dcfe39b4927"},"active":true,"email":{"address":"ahmed@gmail.com","_id":{"$oid":"637a20d4a0fc7dcfe39b4928"},"isVerified":false},"name":"Ahmed Wahba","password":"$2b$10$xZGIRZG0cTmKnhRkBDpu1.BJAVVl1pe8hW1q9uceocCDwYEogGOg6","profileImage":"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500","username":"ahmeda1a6k1llklavs1akc1a","lastLogin":{"$date":"2023-01-05T14:11:42.149Z"},"__v":0}
```
- The Trainee model is the user holds all the  general info and personal information regarding like social media accounts that model like the name email password(hashed) and whether they are active or not and whether email is verfied or not..
```
{"_id":{"$oid":"637969352c3f71696ca34759"},"_cart":[],"_wishlist":[{"$oid":"63b0b10ddd940f41fbb6ec00"}],"active":false,"balance":183.26,"email":{"address":"omar.elmeteny@gmail.com","isVerified":false},"name":"Omar Sherif","password":"$2b$10$0DxKD.1V16g8ry5I3m758O5NRQ/hInjyb/j5mOdKH83UZDTN4jVHu","preferredSkills":[],"profileImage":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fattackontitan.fandom.com%2Fwiki%2FEren_Jaeger_%2528Anime%2529&psig=AOvVaw0mxY2Pb_xNFgDuY0USyc8Q&ust=1673004459751000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCMjm2bqpsPwCFQAAAAAdAAAAABAD","username":"sherifssssss","_enrolledCourses":[{"_course":{"$oid":"63acc491a9f62a1eeba77704"},"_submittedQuestions":[{"_questionId":{"$oid":"63acc491a9f62a1eeba7770e"},"submittedAnswer":"JavaScript"},{"_questionId":{"$oid":"63acc491a9f62a1eeba7770f"},"submittedAnswer":"node install express"},{"_questionId":{"$oid":"63acc491a9f62a1eeba77710"},"submittedAnswer":"None of the above"},{"_questionId":{"$oid":"63acc491a9f62a1eeba77715"},"submittedAnswer":"Both of the above."},{"_questionId":{"$oid":"63acc491a9f62a1eeba77716"},"submittedAnswer":"It provides package-lock.json and package.json"}],"_submittedExamAnswers":[],"seenAnswers":false,"_visitedLessons":[{"$oid":"63acc491a9f62a1eeba77711"},{"$oid":"63acc491a9f62a1eeba77712"},{"$oid":"63acc491a9f62a1eeba7771f"},{"$oid":"63acc491a9f62a1eeba77717"},{"$oid":"63acc491a9f62a1eeba77720"},{"$oid":"63acc491a9f62a1eeba77718"},{"$oid":"63acc491a9f62a1eeba77719"},{"$oid":"63acc491a9f62a1eeba7771a"},{"$oid":"63acc491a9f62a1eeba77721"}],"dateOfEnrollment":{"$date":"2022-12-29T21:22:51.433Z"},"examGrade":0,"progress":100},{"_course":{"$oid":"63b0bcb2b7158ee8e28910b0"},"_submittedQuestions":[{"_questionId":{"$oid":"63b0bcb2b7158ee8e28910c7"},"submittedAnswer":"Primary Key"},{"_questionId":{"$oid":"63b0bcb2b7158ee8e28910c8"},"submittedAnswer":"Row"},{"_questionId":{"$oid":"63b0bcb2b7158ee8e28910bc"},"submittedAnswer":"Maintain the data in relational database management systems."},{"_questionId":{"$oid":"63b0bcb2b7158ee8e28910bd"},"submittedAnswer":"Sample data can also be described with the aid of this tool."}],"_submittedExamAnswers":[],"seenAnswers":false,"_visitedLessons":[{"$oid":"63b0bcb2b7158ee8e28910b8"},{"$oid":"63b0bcb2b7158ee8e28910b9"},{"$oid":"63b0bcb2b7158ee8e28910bf"},{"$oid":"63b0bcb2b7158ee8e28910be"},{"$oid":"63b0bcb2b7158ee8e28910c0"},{"$oid":"63b0bcb2b7158ee8e28910c1"},{"$oid":"63b0bcb2b7158ee8e28910c2"},{"$oid":"63b0bcb2b7158ee8e28910c3"},{"$oid":"63b0bcb2b7158ee8e28910c4"},{"$oid":"63b0bcb2b7158ee8e28910d7"},{"$oid":"63b0bcb2b7158ee8e28910d8"},{"$oid":"63b0bcb2b7158ee8e28910cf"},{"$oid":"63b0bcb2b7158ee8e28910cd"},{"$oid":"63b0bcb2b7158ee8e28910c9"},{"$oid":"63b0bcb2b7158ee8e28910cc"},{"$oid":"63b0bcb2b7158ee8e28910ce"},{"$oid":"63b0bcb2b7158ee8e28910cb"},{"$oid":"63b0bcb2b7158ee8e28910ca"},{"$oid":"63b0bcb2b7158ee8e28910d6"},{"$oid":"63b0bcb2b7158ee8e28910d5"},{"$oid":"63b0bcb2b7158ee8e28910d4"}],"dateOfEnrollment":{"$date":"2023-01-01T01:45:22.482Z"},"examGrade":0,"progress":100},{"_course":{"$oid":"637a03cf301cbd719dff6039"},"_submittedQuestions":[],"_submittedExamAnswers":[],"seenAnswers":false,"_visitedLessons":[{"$oid":"637a03cf301cbd719dff6040"},{"$oid":"637a03cf301cbd719dff6042"},{"$oid":"637a03cf301cbd719dff6043"},{"$oid":"637a03cf301cbd719dff6044"},{"$oid":"637a03cf301cbd719dff6045"},{"$oid":"637a03cf301cbd719dff6047"},{"$oid":"637a03cf301cbd719dff6048"}],"dateOfEnrollment":{"$date":"2023-01-01T02:08:33.977Z"},"examGrade":0,"progress":100}],"creditCards":[],"createdAt":{"$date":"2022-11-19T23:39:33.723Z"},"updatedAt":{"$date":"2023-01-06T16:54:19.277Z"},"lastLogin":{"$date":"2023-01-06T16:47:15.961Z"},"phone":"+10810187292","gender":"Male","__v":15,"country":"Palestinian Territory Occupied","_lastViewedCourse":{"$oid":"63acc491a9f62a1eeba77704"},"isCorporate":false,"corporate":null,"notes":[]}
```

- The Instructor model is the user holds all the general information like social media accounts and personal information regarding that model like the name email password(hashed) and whether they are active or not and whether email is verfied or not.
```
{"_id":{"$oid":"6379620f2c3f71696ca34735"},"active":true,"balance":3991.44,"bankAccount":{"_id":{"$oid":"6379620f2c3f71696ca34733"}},"biography":"new Bio","email":{"address":"newwww.email@gmail.com","isVerified":false},"name":"new name","password":"$2b$10$o7yCKZ8AaSJK8malqLCXf.0DGfxCmZY5W6O0LPTHXOVxJHsKdeY3C","profileImage":"new image URL","rating":{"averageRating":3.9,"reviews":[{"_trainee":{"$oid":"637a4a16b92cf8ec6d720bac"},"comment":"Very well taught and very well planned!!","createdAt":{"$date":"2022-09-15T19:45:02.000Z"},"rating":4.7,"_id":{"$oid":"639b1d321457b0a216250cfb"}},{"_trainee":{"$oid":"63b6d05bbe22527ce357ad7b"},"comment":"great!!","createdAt":{"$date":"2023-01-05T14:21:51.402Z"},"rating":3,"_id":{"$oid":"63b6dcffbe22527ce357b5d5"}},{"_trainee":{"$oid":"637969352c3f71696ca34759"},"comment":"Good","createdAt":{"$date":"2023-01-06T16:40:13.796Z"},"rating":4,"_id":{"$oid":"63b84eee2bcfc13fca5e7472"}}]},"socialMedia":{"facebook":"","github":"https://github.com/AWahba1","linkedin":"","personalWebsite":"","youtube":"https://www.youtube.com/TheNetNinja","_id":{"$oid":"63b245b6298d6548e3c7aa98"}},"speciality":"new specialty","title":"new title","username":"username1234","_teachedCourses":[{"_course":{"$oid":"637a03cf301cbd719dff6039"},"earning":605.34},{"_course":{"$oid":"63acc491a9f62a1eeba77704"},"earning":705.6},{"_course":{"$oid":"63acd1133e3bb517841b8124"},"earning":187.22},{"_course":{"$oid":"63b0b10ddd940f41fbb6ec00"},"earning":532},{"_course":{"$oid":"63b0bcb2b7158ee8e28910b0"},"earning":187.2},{"_course":{"$oid":"63b5f5e7936a54c89b519dd5"},"earning":80}],"lastLogin":{"$date":"2023-01-04T22:40:46.571Z"},"phone":"new phone number","gender":"Male","__v":0,"country":"Egypt"}
```
- The course model which holds Course information and outlien and all the sections , excersises and lessons info that course has. Moreover, holds statistical information like the duration of each lesson (which is auto generated) and the duration of the whole course (auto-calculated).
```
{"_id":{"$oid":"637a03cf301cbd719dff6039"},"_instructor":[{"$oid":"6379620f2c3f71696ca34735"}],"announcements":[{"createdAt":{"$date":"2022-10-15T13:40:15.000Z"},"description":"Hello and welcome to our Python Course. This course will cover many of the python basics you need to start your python programming journey that will unleash a plethora of capabilities that cna be achieved using this outstanding language.I'll always be there if you need anything, so don't hesitate to contact me whenever needed.","title":"A brief about the course and what to expect","_id":{"$oid":"63b5f9709efa24df1fd93044"}}],"captions":["English","Arabic","Spanish"],"category":"Web Development","coupouns":[{"code":"2dkfhg370","count":5,"discount":30,"expiryDate":{"$date":"2022-09-15T13:40:15.000Z"},"_id":{"$oid":"637a03cf301cbd719dff603b"}}],"description":"Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games","duration":1,"exam":[{"answer":"Indentation","options":["Brackets","Indentation","Key","None of the above"],"question":"How is a code block indicated in Python?","_id":{"$oid":"637a03cf301cbd719dff603c"}},{"answer":"All of the above","options":["try","except","finally","All of the above"],"question":"Which of the following statements are used in Exception Handling in Python?","_id":{"$oid":"637a03cf301cbd719dff603d"}}],"frequentlyAskedQuestions":[{"answer":"Yes, absolutely! This course is designed for beginners with no or little experience in programming.","question":"Is this course for absolute beginners with zero programming experience?","_id":{"$oid":"637a03cf301cbd719dff603e"}},{"answer":"Depends on each one's capability to grasp new info, but if I were to given a number, it would be around 50 hours","question":"How many hours does the course need average?","votes":0,"_id":{"$oid":"63b5f8979efa24df1fd9302d"}}],"keywords":["Python","bootcamp","selenium","numpy","matplotlib","data science","machine learning","object oriented programming","python 2","python 3","gui"],"language":"English","level":"Beginner","numberOfEnrolledTrainees":3,"outline":["You will learn how to leverage the power of Python to solve tasks.","You will be able to use Python for your own work problems or personal projects.","Learn to use Python professionally, learning both Python 2 and Python 3!","Learn advanced Python features, like the collections module and how to work with timestamps!","Understand complex topics, like decorators.","Get an understanding of how to create GUIs in the Jupyter Notebook system!","You will build games and programs that use Python libraries.","You will create a portfolio of Python based projects you can share.","Create games with Python, like Tic Tac Toe and Blackjack!","Learn to use Object Oriented Programming with classes!","Understand how to use both the Jupyter Notebook and create .py files","Build a complete understanding of Python from the ground up!"],"previewVideoURL":"https://www.youtube.com/embed/Y8Tko2YC5hA","price":{"currency":"USD","currentValue":100,"discounts":[{"endDate":{"$date":"2023-11-01T13:40:15.000Z"},"issuedByInstructor":true,"percentage":69,"startDate":{"$date":"2023-10-01T13:40:15.000Z"},"_id":{"$oid":"639781de276ea6f70a0e9c3b"}}]},"rating":{"averageRating":4.2,"reviews":[{"_trainee":{"$oid":"6379695b2c3f71696ca3475e"},"comment":"Very basic, needed more advanced topics to be taught in it","createdAt":{"$date":"2022-12-08T11:34:58.173Z"},"rating":3,"_id":{"$oid":"6391cbedb0e120612748bd6b"}},{"_trainee":{"$oid":"637969352c3f71696ca34759"},"comment":"Wonderful Course couldn't find any better alternative","createdAt":{"$date":"2022-10-27T19:43:02.000Z"},"rating":5,"_id":{"$oid":"63b1f8ac3a00f6ecbed54475"}}]},"sections":[{"exercises":[],"lessons":[{"description":"Learn why you should learn Python and what you can use it for and how to setup it on your machine","duration":15,"title":"Python Overview and Setup","videoURL":"https://www.youtube.com/embed/YYXdXT2l-Gg","_id":{"$oid":"637a03cf301cbd719dff6040"}}],"title":"Intoduction to Python","_id":{"$oid":"637a03cf301cbd719dff603f"}},{"exercises":[],"lessons":[{"description":"What is a string data type? What does it store? Learn String properties and methods","duration":21,"title":"Working with Textual Data","videoURL":"https://www.youtube.com/embed/k9TUPpGqYTo","_id":{"$oid":"637a03cf301cbd719dff6042"}},{"description":"Learn how to work with numbers and perform arithmetic calculations on them","duration":15,"title":"Working with Numeric Data","videoURL":"https://www.youtube.com/embed/YYXdXT2l-Gg","_id":{"$oid":"637a03cf301cbd719dff6043"}},{"description":"Learn how to combine related multiple data items in a single data structure","duration":15,"title":"Lists,Tuples and Sets","videoURL":"https://www.youtube.com/embed/YYXdXT2l-Gg","_id":{"$oid":"637a03cf301cbd719dff6044"}},{"description":"Learn how to store and read Key-Value Pairs using Dictionary data structure","duration":15,"title":"Working with Key-Value Pairs","videoURL":"https://www.youtube.com/embed/YYXdXT2l-Gg","_id":{"$oid":"637a03cf301cbd719dff6045"}}],"title":"Types in Python and basic data structures","_id":{"$oid":"637a03cf301cbd719dff6041"}},{"exercises":[],"lessons":[{"description":"Learn what a boolean is exactly and how to start using conditional statements in your code!","duration":16,"title":"Booleans and Conditional statements","videoURL":"https://www.youtube.com/embed/DZwmZ8Usvnk","_id":{"$oid":"637a03cf301cbd719dff6047"}},{"description":"Wondered how you could print on the console from 1 to 100 without writing 100 deadly boring print statements? That's what iterations do! Watch the video and learn how to do so now!","duration":10,"title":"Loops and Iterations","videoURL":"https://www.youtube.com/embed/6iF8Xb7Z3wQ","_id":{"$oid":"637a03cf301cbd719dff6048"}}],"title":"Learn Conditionals, Booleans and Loops","_id":{"$oid":"637a03cf301cbd719dff6046"}}],"subcategory":["Backend"],"thumbnail":"https://www.devopsschool.com/blog/wp-content/uploads/2022/03/Python-01-2.png","title":"Complete Python Bootcamp From Zero to Hero in Python 2022!","createdAt":{"$date":"2022-11-20T10:39:11.772Z"},"updatedAt":{"$date":"2023-01-04T22:10:56.649Z"},"__v":0,"examGrades":{"average":0,"totalAttempts":0}}
```

- The Reports Model which holds all the information regarding the problems like the description , date of submittion and the user who submitted that problem and finally the follow up if done by the user.

```
{"_id":{"$oid":"63b6d650be22527ce357b1b3"},"_course":{"$oid":"63acd1133e3bb517841b8124"},"_user":{"$oid":"63b6d05bbe22527ce357ad7b"},"description":"","reason":"Refund","status":"Resolved","followUp":[],"createdAt":{"$date":"2023-01-05T13:53:20.345Z"},"updatedAt":{"$date":"2023-01-05T14:03:17.690Z"},"__v":0}
```

- The  Payment Model which holds all the information regarding the Transaction .
```
{"_id":{"$oid":"63976f0ca7691a901835e492"},"paymentType":"CART_PAYMENT","_courses":[{"_course":{"$oid":"637a03cf301cbd719dff6039"},"discountApplied":0,"price":101.10600000000001,"_id":{"$oid":"63976f0ca7691a901835e493"}},{"_course":{"$oid":"637ca1802c6d4aaeacbee634"},"discountApplied":0,"price":50.553000000000004,"_id":{"$oid":"63976f0ca7691a901835e494"}},{"_course":{"$oid":"637ca5a12c6d4aaeacbee64b"},"discountApplied":0,"price":101.10600000000001,"_id":{"$oid":"63976f0ca7691a901835e495"}},{"_course":{"$oid":"638c6ce70389b89a5a3b596d"},"discountApplied":0,"price":80.8848,"_id":{"$oid":"63976f0ca7691a901835e496"}}],"amount":333.6498,"trainee":{"$oid":"637969352c3f71696ca34759"},"createdAt":{"$date":"2022-01-01T18:12:28.864Z"},"updatedAt":{"$date":"2022-12-12T18:12:28.864Z"}}
```

- The Newsletter model which holds all the emails that subscribed to the newsletter 

# Ideas for Scalability

## Scaling
    
In the future with increasing number of users to the system, the server will need to be upgraded and we can scale the system in one of two ways,
either vertival scaling with increasing the processing power of our server and the processing node or horizontal scaling and increasing the number of the processing nodes(servers that serve the functionality of our system).
Horizontal scaling is preferable because at the end you will hit a limit in which you will not go over a specific processing power and the vertical scaling is more expensive in upgrading one node power rather than having multiple nodes and have the total work divided over them.

## Scaling-Scheme

What is the schema to be chosen? will the servers will be divided according to functionality or according to region? and requests origin?
It depends on the number of users from each city or government so if we followed the scheme of each server is handling each region then we will have some servers overloaded that others depending on the popularity of the platform in one place than the other, this scheme can be used in the future when the number of users increases in many cities and all over egypt and even from other countries then we can consider this scaling schema, but on low level scaling (more users in smaller number of cities) it is better to follow the schema of having each server is responsible for a specific task or functionality, we can have many servers divided as follows : 
             --> server repsonsible for uploading videos of the lectures and lessons and requesting these videos 
             --> server responsible for the payment and banking actions
             --> server responsible for the other informtaion and normal requests within the system
        ** This schema can be mixed with the first proposed schema when having more and more users so for each region we can have this set responsible for serving this specific region.

## Balancing

Sometimes we can have some servers overwhelmed than the others depending on the amount of users accessing the platform and their place and region.
This can lead to losing availability because now one can try to access the platform and server is down hence the system is unavailable.
We can try to decrease this effect by having Load Balancers (type of a reverse proxy), these load balancers will receive the request on the behalf of the client and then these load balancers will send these requests to the servers, and these load balancer functionality is to choose what is the best server to choose that can receive this request and then it send this request to that server and there are many ways to choose what server to send to, one of these choosing policies is Round Robin in which you have your servers as a circle and you start sending reuqests in this way to server1 --> then server2 --> server3 --> back to start of the circle so you guarantee having equal amount of requests on each serve to have balanced work over the servers and another technique related to the network the least connection server (server having the least number of connections with other clients) or the server with the least bandwidth used, Load Balancers will be needed to try to decrease the unavailability of the server.

## Caching

One way of having faster and better performance on larger scale is to have cahces to cahce the data that is mostly requested by users so they can have the data faster in future requests. We can have a CDN(Content Distribution Network) which is type of cache that is used for large systems serving a lot amount of static data and this will be useful in our platform case because we will be having many static data and a lot of videos for lessons and courses that we will need to have an optimized way to serve these data to the client in efiicient and fast way.

## Data-Partitioning

On large Scale we can't still have only one database at the end we need to have multiple databases by replicas or partitioning.
We can partition the data vertivally or horziontally, in vertical partitioning we will have for each row entry the row itself will be divided into different databases, this is a better solution in our case because we will have static data and videos for the lessons and courses, so having these static data and videos in their databases would be preferable than putting these data with the other client's and course's information in one database.
We can have the database divided and partitioned into multiple partitions, one partition could be for the videos, and another partition could be for user and course's information and finally we can have replicas for these databases to avoid having a single point of failure in these databases partitions.

## CAP

Now with scaled system we have to choose one of two properties to the system, Availability and Consistency.
To our platform Availability would be more benefcial to have better UX because for e-learining platform that can not be accessible by the client at any time will be frustrating with bad UX.
We can tolerate some inconsistency in this platform and have eventually consistent system, as we really don't care if a client make a get request to see the reviews on a specific course and he doesn't get these reviews updated to the very last moment.
So having NoSQL database will be better on Scalability, as it is more flexible and with better performance and faster than SQL databases.
Now when choosing available system, the nodes will be available on any request but the node itself won't be up to date in any moment because it may need some data from other nodes and take time to get these data, and we chose availability so we can't ignore the user request waiting for data (here we lose avaialbility) but we respond with data available and then node will be updated. (this is what is called eventually consistent).



## Environment Variables

```
# PORT
PORT

# DATABASE
DB_USERNAME
DB_PASSWORD 
DB_DATABASE

# REDIS
REDIS_HOST 
REDIS_PORT 
REDIS_PASSWORD 


# TOKEN
ACCESS_TOKEN_PRIVATE_KEY
REFRESH_TOKEN_PRIVATE_KEY

# CLIENT URL
CLIENT_URL

# Company Info
COMPANY_LOGO
COMPANY_ADDRESS
COMPANY_PHONE
COMPANY_EMAIL
COMPANY_WEBSITE
COMPANY_FACEBOOK
COMPANY_TWITTER
COMPANY_INSTAGRAM
COMPANY_YOUTUBE
COMPANY_LINKEDIN
COMPANY_GITHUB
COMPANY_GOOGLE_PLAY
COMPANY_APP_STORE

# LOG
LOG_FORMAT
LOG_DIR

# CORS
ORIGIN 
CREDENTIALS

# ExchangeRate API Key
EXCHANGE_BASE_URL

# Nodemailer
EMAIL_SERVICE
SENDER_MAIL
SENDER_PASSSWORD

#Stripe
STRIPE_PRIVATE_KEY

```


## screenshots
 
<img src="../screenshots/systemDesign/My System Design.png" alt="Sign up User Form" align="center" >






## Folder Structure

```
.
└── src
    ├── Admin
    │   ├── admin.controller.ts
    │   ├── admin.dao.ts
    │   ├── admin.dto.ts
    │   ├── admin.interface.ts
    │   ├── admin.model.ts
    │   └── admin.route.ts
    ├── Authentication
    │   ├── auth.controller.ts
    │   ├── auth.dao.ts
    │   ├── auth.interface.ts
    │   └── auth.route.ts
    ├── Common
    │   ├── Email Service
    │   │   └── templates
    │   ├── Interfaces
    │   ├── Models
    │   └── Types
    ├── Config
    │   └── index.ts
    ├── Course
    │   ├── course.controller.ts
    │   ├── course.dao.ts
    │   ├── course.dto.ts
    │   ├── course.interface.ts
    │   ├── course.model.ts
    │   ├── course.common.ts
    │   ├── course.types.ts
    │   └── course.route.ts
    ├── Databases
    │   └── index.ts
    ├── Exceptions
    │   └── HttpException.ts
    ├── Instructor
    │   ├── instructor.controller.ts
    │   ├── instructor.dao.ts
    │   ├── instructor.dto.ts
    │   ├── instructor.interface.ts
    │   ├── instructor.model.ts
    │   └── instructor.route.ts
    ├── logs
    │   ├── debug
    │   └── error
    ├── Message
    ├── Middlewares
    │   ├── auth.middleware.ts
    │   ├── error.middleware.ts
    │   ├── rateLimiter.middleware.ts
    │   ├── modelsError.middleware.ts
    │   ├── user.middleware.ts
    │   └── validation.middleware.ts
    ├── NewsLetter
    │   ├── newsletter.controller.ts
    │   ├── newsletter.dao.ts
    │   ├── newsletter.dto.ts
    │   ├── newsletter.interface.ts
    │   ├── newsletter.model.ts
    │   └── newsletter.route.ts
    ├── Payment
    │   ├── payment.controller.ts
    │   ├── payment.dao.ts
    │   ├── payment.dto.ts
    │   ├── payment.interface.ts
    │   ├── payment.model.ts
    │   └── payment.route.ts
    ├── Report
    │   ├── report.controller.ts
    │   ├── report.dao.ts
    │   ├── report.dto.ts
    │   ├── report.interface.ts
    │   ├── report.model.ts
    │   └── report.route.ts
    ├── Tests
    ├── Token
    │   ├── token.interface.ts
    │   ├── token.model.ts
    │   ├── trainee.util.ts
    ├── Trainee
    │   ├── trainee.controller.ts
    │   ├── trainee.dao.ts
    │   ├── trainee.dto.ts
    │   ├── trainee.interface.ts
    │   ├── trainee.model.ts
    │   └── trainee.route.ts
    ├── Uploads
    ├── User
    │   ├── user.controller.ts
    │   ├── user.dto.ts
    │   ├── user.enum.ts
    │   ├── user.interface.ts
    │   ├── user.schema.ts
    │   ├── user.type.ts
    │   └── user.route.ts
    ├── Utils
    │   ├── HttpResponse.ts
    │   ├── HttpStatusCodes.ts
    │   ├── logger.ts
    │   ├── PaginationResponse.ts
    │   └── validateEnv.ts
    
```

## Code Samples
- Getting all Course Reviews Paginated
```
 public async getCourseReviews(courseID: string, page: number, pageLimit: number): Promise<PaginatedData<Review>> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseID).populate({
      path: 'rating.reviews._trainee',
      select: 'name country profileImage',
    });

    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, "Course doesn't exist");
    const courseReviews = course.rating.reviews;

    // sort descendingly
    courseReviews.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    const toBeSkipped = (page - 1) * pageLimit;
    const totalReviews = courseReviews.length;
    const totalPages = Math.ceil(totalReviews / pageLimit);
    const paginatedReviews = courseReviews.slice(toBeSkipped, toBeSkipped + pageLimit);

    return {
      data: paginatedReviews,
      page,
      pageSize: paginatedReviews.length,
      totalPages,
      totalResults: totalReviews,
    };
  }
```
- Reporting a problem or Requesting a refund/course from Admin
```
public async reportProblemOrRequestCourse(reportData: ReportDTO): Promise<Report> {
    const courseId = reportData._course;
    const userId = reportData._user;

    //Validation
    if (!mongoose.Types.ObjectId.isValid(userId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(courseId) && courseId != null)
      throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id can only be an Object Id or null');
    if ((reportData.reason === Reason.COUSE_REQUEST || reportData.reason === Reason.REFUND) && courseId == null)
      throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Course Id is required for a Course Request or Refund Request');

    if (reportData.reason === Reason.REFUND) {
      // trainee should be enrolled in course and at most 50% of the course content should be seen
      const enrolledCourse = await this.traineeService.getEnrolledCourseById(userId, courseId);
      if (!enrolledCourse) throw new HttpException(422, 'Trainee is not enrolled in this course');

      const traineeProgress = enrolledCourse?.progress ?? 0;

      if (traineeProgress >= 50) throw new HttpException(400, 'Refund is not allowed after 50% of the course is completed');
      const report = await reportModel.findOne({ reason: 'Refund', _user: `${reportData?._user}`, _course: `${reportData?._course}` });
      if (report) {
        throw new HttpException(409, 'You have asked for refund for this course before');
      }
    } else if (reportData.reason === Reason.COUSE_REQUEST) {
      const report = await reportModel.findOne({ reason: Reason.COUSE_REQUEST, _user: `${reportData?._user}`, _course: `${reportData?._course}` });
      if (report) {
        throw new HttpException(409, 'You have requested this course before');
      }
    }

    const report = await reportModel.create({ ...reportData });
    return report;
  }
```
- Mongoose pre middleware for hashing a password when signing up.
```
instructorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  next();
});
```
- Authentication Middleware
```
async function authenticateUser(req: RequestWithTokenPayload, res: Response, next: NextFunction) {
  try {
    const authHeader: string = req.headers.authorization || (req.headers.Authorization as string);
    if (!authHeader || !authHeader?.startsWith('Bearer ')) {
      throw new HttpException(HttpStatusCodes.UNAUTHORIZED, 'No authentication token, please log in');
    }
    const [, accessToken] = authHeader.split(' ');
    verify(accessToken, ACCESS_TOKEN_PRIVATE_KEY, (err, decoded) => {
      if (err) {
        throw new HttpException(HttpStatusCodes.UNAUTHORIZED, ' Invalid authentication token, please log in');
      }
      const { _id, role } = decoded as ITokenPayload;
      req.tokenPayload = { _id, role };
      next();
    });
  } catch (error) {
    next(new HttpException(HttpStatusCodes.UNAUTHORIZED, 'Wrong authentication token, please log in'));
  }
}
```

## Testing
Delete Review Route Testing
<img src="../screenshots/testing/InstructorRoutes/Delete Review Test.png" alt="Sign up User Form" align="center" >
Getting Instructor Reviews Route Testing
<img src="../screenshots/testing/InstructorRoutes/Get All Instructor Reviews Test.png" alt="Sign up User Form" align="center" >
Getting Instructor Courses Route Testing
<img src="../screenshots/testing/InstructorRoutes/Get Instructor Courses Test.png" alt="Sign up User Form" align="center" >
Get Instructor Data Route Testing
<img src="../screenshots/testing/InstructorRoutes/Get Instructor Test.png" alt="Sign up User Form" align="center" >

More Tests can be Found in the Postman Documentation.

