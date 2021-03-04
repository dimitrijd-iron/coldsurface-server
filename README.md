## Description

It a SaaS providing insights on employee and customer engagement and sentiment. By subscribing to coldsurface services, the managers and hr professionals are able to monitor and understand employees attitude and reactions towards business environment and company's initiatives.

<br>

## User Stories



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

<br>

## Backlog

- Zoom API
- GitHub API
- CRUD

<br>

# Client/ Frontend

### React Router Routes (React App)

| Path                    | Component              | Permissions                | Behavior                                                     |
| ----------------------- | ---------------------- | -------------------------- | ------------------------------------------------------------ |
| `/`                     | MainPage               | public `<Route>`           | Link to login and signup in public                           |
| `/signup`               | SignupPage             | anon only `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`                | LoginPage              | anon only `<AnonRoute>`    | Login form, link to signup, navigate to homepage after login |
| `/home-page`            | HomePage               | user only `<PrivateRoute>` | Link to main dashboards, dashboard page, user profile and log out |
| `/edit-profile`         | UserProfilePage        | user only `<PrivateRoute>` | Form to update user's data                                   |
| `/dashboards`           | DashboardPage          | user only `<PrivateRoute>` | List of all available dashboards, and link to home page, user profile and log out |
| `/channel-dashboard`    | ChannelDashboardPage   | user only `<PrivateRoute>` | Channel dashboard, with link to all the remaining dashboards |
| `/work-place-dashboard` | WorkPlaceDashboardPage | user only `<PrivateRoute>` | Work place dashboard, with link to all the remaining dashboards |
| `/user-dashboard`       | UserDashboardPage      | user only `<PrivateRoute>` | User dashboard, with link to all the remaining dashboards    |

<br>

## Components

- MainPage
- SignupPage
- LoginPage
- HomePage
- UserProfilePage
- DashboardPage
- ChannelDashboardPage
- WorkPlaceDashboardPage
- UserDashboardPage
- AnonRoute

- PrivateRoute

- Navbar

- Dashboard

- Barchat

- TrendLine

- KPI

<br>

## Services

- Auth Service
  - auth.signup( username, password ) 
  - auth.login( username, password ) 
  - auth.logout
  - auth.me

<br>

# Server/ Backend

## Models

#### User Model

```javascript
{

​	username: String,

​	password: String,
    
​   company: String,

​	timestamps: {

​		createdAt: "created_at",

​		updatedAt: "updated_at",

​	},

}
```

<br>

#### RawData Model

```javascript
{

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

<br>

#### Statistics Model

```javascript
{

​	day: { type: Date, default: Date.now } ,

​	user: String,

​	channel: { type: Schema.Types.ObjectId, ref: "Channel" },

​	numberOfMessages: Number,

​	emotionAverage: {

​		 sadness: Number,

​		 joy: Number,

​		 fear: Number,

​		 disgust: Number,

​		 anger: Number,

​	},

​	sentimentScoreAverage: Number,

​	rawDataKeys: [{ type: Schema.Types.ObjectId, ref: "RawData" }], 

}
```

<br>

## API Endpoints (backend routes) 

| HTTP Method | URL            | Request Body         | Success status | Error Status | Description                                                  |
| ----------- | -------------- | -------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/me`     | Saved session        | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup` | {email, password}    | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`  | {username, password} | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout` | (empty)              | 204            | 400          | Logs out the user                                            |

<br>

## Services

- Slack API
  - slackapi.channels() 
  - slackapi.messages() 
- Watson API
  - watsonapi.nlp( ) 

<br>

## States and States Transitions

- Landing page
- Authentication
- Home page
- User Profiles
- Dashboards pages

<br>

## Task

- Setup architecture product
- Create User, raw-data and statistics models
- Collect data from Slack
- Transform the data from Slack with Watson
- Create statistics based on the data retrieved from Watson
- Create dashboards

<br>

## Links

### Trello/ Kanban

[Kanban Link](https://trello.com/b/zsAbyr5C/project-3)

### Git

[Server repository Link](https://github.com/dimitrijd-iron/coldsurface-server)

[Client repository Link](https://github.com/cucabel/coldsurface-client)

[Deployed App Link](https://github.com/cucabel/coldsurface-client)

### Slides

[Slides Link](https://github.com/cucabel/coldsurface-client)