# MyMDB

MyMDB is a personal movie database watchlist. Create an account and keep track of all your future streaming binge-watch sessions.

[View a live demonstration of the application here.](https://mymdb-client.herokuapp.com/)

Username: 'Tezting'

Password: '123456789'

Although feel free to make your own account.

## Stack

### Client - React.js && Redux.js

Front end broken into individual React components.

Used Redux to store state for access in particular child components.

Routing with React-Router-Dom

### Server - Node.js, Express.js, MongoDB

MyMDB uses Node.js as server sided environment.

Handles routing through Express.js

Persistent data stored with MongoDB via [mlab.com](http://www.mlab.com). Mongoose used for any and all DB CRUD operations.

Users are authenticated with Passport.js middleware. Bcrypt is used to hash user passwords. JWT Auth stored in local storage, hashed passwords stored in DB.

## Links

### Client

[Heroku](https://mymdb-client.herokuapp.com/)  
[Github Repository](https://github.com/Fantosism/mymdb)
