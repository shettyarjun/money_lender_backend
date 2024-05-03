# Money Management API

## Overview
This API allows users to manage your money lends.
I tried to code this with little reference to understand node better, so if any correction , feel free to fork it and push the changes

## Setup
1. Clone the repository to your local machine.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root directory and add the following variables:
    ```
    PORT=3000
    NODE_ENV=(production or deployment) 
    MONGODB_URI=<your_mongodb_uri>
    SECRET_KEY=<your_secret_key_for_jwt>
    ```
4. Start the server by running `npm start` or `nodemon server.js`.

## Endpoints for (http://localhost:3000)

### 1. Register User

#### URL
```
POST /api/users/register
```

#### Body (JSON)
```json
{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpassword"
}
```

#### Response
```json
{
    "_id": "60a6f2c6a022d51f30576b4b",
    "username": "testuser",
    "email": "test@example.com"
}
```

### 2. Login User

#### URL
```
POST /api/users/login
```

#### Body (JSON)
```json
{
    "email": "test@example.com",
    "password": "testpassword"
}
```

#### Response
```json
{
    "accesstoken": "<your_access_token>"
}
```

### 3. Get User Profile

#### URL
```
GET /api/users/profile
```

#### Headers
```
Authorization: Bearer <your_access_token>
```

#### Response
```json
{
    "_id": "60a6f2c6a022d51f30576b4b",
    "username": "testuser",
    "email": "test@example.com"
}
```

### 4. Create Money Lend

#### URL
```
POST /api/moneylends
```

#### Body (JSON)
```json
{
    "name": "Friend",
    "money_taken": 100,
    "money_given": 0,
    "date": "2023-05-20"
}
```

#### Headers
```
Authorization: Bearer <your_access_token>
```

#### Response
```json
{
    "_id": "60a6f2c6a022d51f30576b4c",
    "name": "Friend",
    "money_taken": 100,
    "money_given": 0,
    "date": "2023-05-20"
}
```

### 5. Update Money Lend

#### URL
```
PUT /api/moneylends/:id
```

#### Params
```
id: 60a6f2c6a022d51f30576b4c
```

#### Body (JSON)
```json
{
    "money_given": 50
}
```

#### Headers
```
Authorization: Bearer <your_access_token>
```

#### Response
```json
{
    "_id": "60a6f2c6a022d51f30576b4c",
    "name": "Friend",
    "money_taken": 100,
    "money_given": 50,
    "date": "2023-05-20"
}
```

### 6. Delete Money Lend

#### URL
```
DELETE /api/moneylends/:id
```

#### Params
```
id: 60a6f2c6a022d51f30576b4c
```

#### Headers
```
Authorization: Bearer <your_access_token>
```

#### Response
```json
{
    "message": "Money lend has been deleted"
}
```

