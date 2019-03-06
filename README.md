# My List

DTY challenge by Anass Elidrissi  
Uses Node v10.13.0

## Project description

This project is a simple 'List' site where users can keep track of their animes and interact with other users.

### Prerequisites

Git, Node 10, express, mongo/mongoose, angular, flex-layout  
 
### Technical description

This project is made following the mean stack:   
_Mongodb with mongoose for the NoSQL database  
_Express : backend framework running on top of Nodejs  
_Angular : frontend  
  
Redis is used to cache data on the backend
JWT is used to authenticate users  
  
  The mongodb runs on mongo atlas. The credentials are: anasselidrissi97@gmail.com / Mccus@1997  
  Redis runs on redislabs.com, and the credentials are: anasselidrissi97@gmail.com / mccus1997 

### Functionalities

There are two types of roles: user and admin  
Unauthenticated users can:  
_ See animes, sort them by score or name, and search for animes.  
_ Read animes descriptions and see the reviews.  
_ See users profiles and animes lists.

Besides the above, users have the ability to:  
_ Add animes to their personal list with different statuses / seen episodes.  
_ Rate animes.  
_ Post, edit and delete reviews.  
_ Add friends.
_ Edit their profiles and bio
_ Send messages and reply to them.

Admins have access to the above functionalities and:
_ Add new animes.

## Installing and running the project

### Installing the SSL certificate:
Install the ssl certificate from the `frontend/ssl`folder.

### Starting the backend server
in the backend folder:    
Run `npm install` to install the dependencies  
Run `npm start server.js`
Whitelist your IP in mongo atlas. The credentials are: anasselidrissi97@gmail.com / Mccus@1997

### Starting the frontend server

in the frontend folder
Run `npm install` to install the dependencies  
Run `ng serve --ssl`

### Testing the website

Enter `https://localhost:4200` in your browser.  
To enter as an admin, use admin@admin as an email, and Admin0 as a password.  
