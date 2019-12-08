# My List

DTY challenge by Anass Elidrissi  
Uses Node v10.13.0

## Project description

This project is a simple 'List' site where users can keep track of their animes and interact with other users.

### Prerequisites

Git, nginx, Node 10, express, mongo/mongoose, passport, angular, flex-layout  
 
### Technical description

This project is made following the mean stack:   
* Mongodb with mongoose for the NoSQL database  
* Express : backend framework running on top of Nodejs
* Angular : frontend  
  
Redis is used to cache data on the backend
Passport is used with JWT tokens to authenticate users. Users using FB and goodle exchange their OAuth tokens for JWT tokens aswell

There are both a live version and a local one. The fb and google client of the two are different.

For the webapp:      
* The mongodb runs on mongo atlas
* Redis runs on redislabs.com
* A nginx reverse proxy is set up to provide https and redirecting. 

### Functionalities

There are three types of roles: guest, user and admin  
Guests can:  
* Login and signup using either email and password, facebook or google accounts.
* See animes, sort them by score or name, and search for animes.  
* Read animes descriptions and see the reviews. 
* Search for users. 
* See users profiles and animes lists.

Besides the above, users have the ability to:  
* Add a login method to their account in any order.
* Add animes to their personal list with different statuses / seen episodes.  
* Rate animes.  
* Upvote reviews.
* Post, edit and delete their reviews.  
* Add friends.
* Edit their profile information.
* Customize their bio using pictures, videos, colors etc.
* Send messages and reply to them.
* Be notified on new friend requests and received messages.

Admins have access to the above functionalities and:
* Add new animes.
* Ban users.
* Remove users reviews.

### Notes

I used DB Ids in my front end URLs, and while it doesn't seem like an issue, it might be a bad practice / bad for user experience. I thought about using uuids instead but seing I had little time left and had to change my whole project structure, I decided against it.
