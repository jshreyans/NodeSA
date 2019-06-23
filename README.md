# Building a basic shopping app

The webapp uses Express.js for the backend (API based) and [EJS](https://ejs.co/) to serve views. 

### Connecting to MongoDB
It uses MongoDB(Atlas) as the database. For a detailed guide on how to connect to a Mongo database, refer to these links:
- [Connect to Mongo](https://docs.mongodb.com/guides/server/drivers/)
- [Setup Atlas](https://docs.mongodb.com/guides/cloud/connectionstring/)

### Setup
1. Clone and cd into the repo folder
2. Run `npm install`
3. Create a nodemon.json in the root folder and add your Mongo credentials:
``` 
  {
    "env": {
      "MONGO_ATLAS_PW": <your_password>
    }
  }
  ```
4. Run `npm run start` to start the dev server at `localhost:3000`

### To do:
- [x] Make cart functional again
- [ ] Refactor all models and controllers to use [mongoose](https://mongoosejs.com/)
- [ ] Add authentication
- [ ] Add input validation while creating/editing product details

### Functionality

The user can expect the following basic functionality:
- View all products (stored on database)
- Add products to a user specific cart 
- checkout products in cart
- view and delete cart products 

Admins can expect the following functionality:
- Access and delete products on database
- Edit product details

### Endpoints from backend

To be added