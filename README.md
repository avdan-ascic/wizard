## Project Name

Wizard

## Introduction

The software system being produced is called Wizard. It is being produced to allow user to easily enter all the information needed for a specific business use case.

## Features

- Log in/Sign up to the website
- Fill in the form details in a wizard style with 4 steps.
- Saved all the form information in the database.
- Loaded form information into wizard from database .

## Buit With

JavaScript
ReactJS
NodeJS
Express JS
Mongo DB

## Libraries

- JSON Web Token
- passport-jwt
- axios
- React Bootstrap

## Setup

Clone this repository. You will need node and npm installed globally on your machine. If you want to run database locally make sure that you have mongoDB server installed and running in background. You can also run cloud database using mongoDB Compas. Create a clutser and paste your connection string in dotenv file.

## Environment Variables

Create a .env file in the root directory of your server route. This file will contain sensitive configuration information needed for your application to function properly.

PORT: The port number on which the server will listen for incoming requests.
JWT_SECRET: A secret key used for signing and verifying JWT tokens for authentication.
MONGO: The connection URL for your MongoDB database.
SESSION_SECRET: An optional secret key used for session management.

## To get a local copy up and running, follow these simple steps:

Clone the repo git clone https://github.com/your_username/wizard.git Install NPM packages npm install Start the project npm start

