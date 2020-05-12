# Serverless Blog App - Udacity Final Project

This is a serverless application developed for the Udacity Cloud Developer Nanodegree Program.

## Getting Started

### Tools

- [Nodej.s 12](https://nodejs.org/dist/v12.16.3/node-v12.16.3.pkg)
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/)

### Deployment

#### Backend

Go to backend folder:

```
cd $PROJECT_HOME/backend
```

Execute the serverless cli deployment command:

```
sls deploy -v --stage dev --region us-east-1
```

#### Frontend

Go to client folder:

```
cd $PROJECT_HOME/frontend
```

Install dependencies:

```
npm install
```

Execute the npm script:

```
npm run start
```

##Functionalities

### Initial Page

This page shows all posts of all users of the app. Authentication is not necessary for this page.

![Initial Page](images/initial_page.png)

### Initial Page logged

When you log in, you will able to see another two options on the menu.

![Initial Page Logged](images/initial_page_logged.png)

### Create Page

Page to create a new post

![Create Post Page](images/create_post_page.png)

### Your Posts Page

This page show all posts created by the logged user.

![Your Post Page](images/your_posts_page.png)

### Edit Post Page

This page upload or edit the fields of a post.

![Edit Post Page](images/edit_post_page.png)
