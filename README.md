# FreeMentors-V2
[![Build Status](https://travis-ci.org/BurnerB/FreeMentors-V2.svg?branch=develop)](https://travis-ci.org/BurnerB/FreeMentors-V2)
[![Maintainability](https://api.codeclimate.com/v1/badges/9bb38711fceb55a72b11/maintainability)](https://codeclimate.com/github/BurnerB/FreeMentors-V2/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/BurnerB/FreeMentors-V2/badge.svg?branch=develop)](https://coveralls.io/github/BurnerB/FreeMentors-V2?branch=develop)

Free Mentors is a social initiative where accomplished professionals become role models to young people to provide free mentorship sessions.
![readme image](https://ibb.co/pz7pQPv)
#### Endpoints covered
| Method        | Endpoint                 | Description|
| ------------- | --------------------------|------------|
| POST           |`/auth/signup`   |User create an account|
| POST          | `/auth/login`   |User login to their account|
| PATCH          | `/user/<:mentor-id>` |Admin make a user a mentor|
| GET        | `/mentors`    |Get all mentors|
| GET         | `/mentors/<:mentor-id>`|User get a specific mentor|
| POST          | `/sessions`       |A User can request a session|
| PATCH       | `/sessions/<:user-id>/accept` |Mentor can accept a session|
| PATCH       | `/sessions/<:user-id>/decline` |Mentor can decline a session|
| GET          | `/sessions`|User or Mentor get all sessions|


#### Tech/frameworks Used
* Language: Javascript
* Server environment: Node.js 
* Back-end framework: Express 
* Testing library: Mocha.js
* Assertion library: Chai 
#### Github-Pages Link
Click here to access the [Github-pages-link](https://burnerb.github.io/FreeMentors-UI/UI/)
#### Pivotal Tracker story board
Click here to access the [Pivotal tracker board](https://www.pivotaltracker.com/n/projects/2379373)
#### Documentation
Click here to access the [Documentation](https://free-mentors.herokuapp.com/api-docs/)

### Getting Started
#### Setting up your system
Make sure you already have [Node.js](https://nodejs.org/en/) installed in your system..
#### How to get started
Clone this  repository by running the following on your terminal
` git clone https://github.com/BurnerB/FreeMentors-V2.git`
After cloning this repository to your local machine,cd into the package folder using your terminal and run the following:

`> npm install`
It will install the node_modules which will help you run the project on your local machine.

Create a .env file to store environment variables e.g
`
PORT=5000
JWT_KEY=imAsecret
`
#### Run the server
` npm start`
this will start your application and run on  **port 5000**

#### Run the tests
` npm test`


#### License
BurnerB/FreeMentors-V2 is licensed under the
GNU General Public License v3.0

MIT © [Barnaby Kamau](barnabykamau@gmail.com)

