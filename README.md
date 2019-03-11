# My List

DTY challenge by Anass Elidrissi  
Uses Node v10.13.0

## Project description

This project is a simple 'List' site where users can keep track of their animes and interact with other users.

### Prerequisites

Git, nginx, Node 10, express, mongo/mongoose, angular, flex-layout  
 
### Technical description

This project is made following the mean stack:   
* Mongodb with mongoose for the NoSQL database  
* Express : backend framework running on top of Nodejs  
* Angular : frontend  
  
Redis is used to cache data on the backend
JWT is used to authenticate users  

For the webapp:      
* The mongodb runs on mongo atlas. The credentials are: anasselidrissi97@gmail.com / Mccus@1997  
* Redis runs on redislabs.com, and the credentials are: anasselidrissi97@gmail.com / mccus1997 
* The frontend is hosted at firebase.  
* The backend is hosted on an ubuntu ec2 instance on AWS.  
* A nginx reverse proxy is set up to provide https and redirecting. 

### Functionalities

There are three types of roles: guest, user and admin  
Guestss can:  
* See animes, sort them by score or name, and search for animes.  
* Read animes descriptions and see the reviews.  
* See users profiles and animes lists.

Besides the above, users have the ability to:  
* Add animes to their personal list with different statuses / seen episodes.  
* Rate animes.  
* Post, edit and delete reviews.  
* Add friends.
* Edit their profiles and bio
* Send messages and reply to them.

Admins have access to the above functionalities and:
* Add new animes.
* Ban users.
* Remove users reviews. 

## Accessing the project 

You can find a live version of the site [here](https://www.ae-dty-chall.com)  
For admin rights, you can login using admin@admin / Admin0

## Installing and running the project locally

### Installing the SSL certificate:
Install the ssl certificate from the `/ssl`folder or generate your own using 
```
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```
and install it.  
Create an `ssl` folder in `/frontend` and `/backend` and copy your certificates in it.

### Staring Redis and Mongodb
Start Mongodb and Redis-server on your preferred port and replace the relevant details in `backend/.env` 

### Starting the backend server

Please make sure you port 3000 is not being used  
In the backend folder:    
Run `npm install` to install the dependencies  
Run `npm start server.js`

### Starting the frontend server

In the frontend folder
Run `npm install` to install the dependencies  
Run `ng serve --ssl`

### Testing the website

Enter `https://localhost:4200` in your browser.
For admin rights, change a user's role in the user collection to `admin`
