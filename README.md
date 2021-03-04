### Description

It a SaaS providing insights on employee and customer engagement and sentiment. By subscribing to coldsurface services, the managers and hr professionals are able to monitor and understand employees attitude and reactions towards business environment and company's initiatives.



### User Stories

- **404:** it is shown when we try to access to an end point which doesn't exist

- **Signup:** anon can sign up in order to have access to the service

- **Login:** signed up users can login and access to their profiles and dashboards

- **Logout:** logged in users can logout in order to close the session

- **Users profile**: users can access their profile to add, or update their information

- **Home Page:** the user has the links to the main dashboards, can access the dashboard page with the list of all remaining dashboards, access its profile, and close the session if wanted.

- **Dashboards:** there are displayed all the dashboards the user can access

- **Channel dashboard :** the user can analyse the sentiment of a slack channel

- **Team dashboard :** the user can analyse the sentiment of an slack team 

- **Daily dashboard:** the user can analyse the slack daily sentiment

  

### Backlog

- Zoom API

- GitHub API

- CRUD

  

### Client

------

#### Routes

| Path                | Component              | Permissions | Behavior                                                     |
| ------------------- | ---------------------- | ----------- | ------------------------------------------------------------ |
| /                   | MainPage               | all         | Link to login and signup in public                           |
| /signup             | SignupPage             | anon only   | signup form, link to login, navigate to homepage after signup |
| /login              | LoginPage              | anon only   | login form, link to signup, navigate to homepage after login |
| /home-page          | HomePage               | user only   | link to main dashboards, dashboard page, user profile and log out |
| /edit-profile       | UserProfilePage        | user only   | form to update user's data                                   |
| /dashboards         | DashboardPage          | user only   | list of all available dashboards, and link to home page, user profile and log out |
| /channelDashboard   | ChannelDashboardPage   | user only   | channel dashboard, with link to all the remaining dashboards |
| /workPlaceDashboard | WorkPlaceDashboardPage | user only   | work place dashboard, with link to all the remaining dashboards |
| /userDashboard      | UserDashboardPage      | user only   | user dashboard, with link to all the remaining dashboards    |



#### Components

- AnonRoute

- PrivateRoute

- Navbar

- Dashboard

- Barchat

- TrendLine

- KPI



#### Services

- auth-service
  - auth.signup( username, password ) 
  - auth.login( username, password ) 
  - auth.logout
  - auth.me



### Server

------

#### Models

```javascript
user = {

​	username: String,

​	password: String,

​   company: String,

​	timestamps: {

​		createdAt: "created_at",

​		updatedAt: "updated_at",

​	},

}
```



```javascript
raw-data = {

​	messageId:  String,

​	ts:  String,

​	tsDate: { type: Date },

​	chanel: { type: Schema.Types.ObjectId, ref: "Channel" },

​	text: String,

​	user: String,

​	emotion: {

​		sadness: Number, 

​		joy: Number,

​		fear: Number,

​		disgust: Number,

​		anger: Number

​	},

​	sentimentScore: Number,

}
```

​	

```javascript
statistics = {

​	day: { type: Date, default: Date.now } ,

​	user: String,

​	channel: { type: Schema.Types.ObjectId, ref: "Channel" },

​	numberOfMessages: Number,

 	emotionAverage: {

​		 sadness: Number,

​		 joy: Number,

​		 fear: Number,

 		disgust: Number,

​		 anger: Number,

​	},

​	sentimentScoreAverage: Number,

​	rawDataKeys: [{ type: Schema.Types.ObjectId, ref: "RawData" }], 

}
```



#### API Endpoints (backend routes) 

- GET /auth/me

  - 200 with user object

- POST /auth/signup

  - 201 if user is created
  - 500  internal server error
  - body:
    - username
    - password
  - create user with encrypted password
  - store user in session

- POST /auth/login

  - 401  unauthorized
  - 500  internal server error
  - body:
    - username
    - password
  - validation
    - store user in session
    - 200 with user object

- POST /auth/logout

  - 204 No content

    

#### Services

- Slack API

  - slackapi.channels( ) 
  - slackapi.messages( ) 

- Watson API

  - watsonapi.nlp( ) 

  

#### States and States Transitions

- Landing page

- Authentication

- Home page

- User Profiles

- Dashboards pages

  

#### Task

- Setup architecture product
- Create User, raw-data and statistics models
- Collect data from Slack
- Transform the data from Slack with Watson
- Create statistics based on the data retrieved from Watson
- Create dashboards



#### Links

### Trello

[Link url](https://trello.com/b/zsAbyr5C/project-3)

### Git

[coldsurface-server](https://github.com/dimitrijd-iron/coldsurface-server)

[coldsurface-client](https://github.com/cucabel/coldsurface-client)

### Slides