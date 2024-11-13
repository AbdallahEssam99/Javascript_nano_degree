# Project Documentation

## Description

This application provides a full-stack solution using **Angular** for the frontend, **Node.js** with **Express** for the backend, and integrates with several AWS services, including **RDS**, **S3**, and **Elastic Beanstalk**. The documentation outlines the project setup, dependencies, environment variables, pipeline, and other important configurations.

## Dependencies

- **Node.js** v14.15.1 (LTS) or more recent. While older versions can work, it is advised to keep Node.js updated to the latest LTS version.
- **npm** v6.14.8 (LTS) or more recent. Yarn can be used but was not tested for this project.
- **AWS CLI v2** (v1 can work but was not tested for this project).
- **AWS EB CLI**.
- **AWS RDS** database running **PostgreSQL**.
- **AWS S3 bucket** for hosting the frontend.
- **AWS Elastic Beanstalk** for deploying the backend.

## AWS Cloud Setup

- **RDS Database Host**: `postgres.c8swkvtplevs.us-east-1.rds.amazonaws.com`
- **RDS Database Port**: `5432`
- **RDS Database Name**: `postgres`
- **S3 Frontend Endpoint**: [Frontend URL](http://ahmedfathallahkhalil.s3-website-us-east-1.amazonaws.com/)
- **Elastic Beanstalk URL**: [Backend URL](http://udagram-api-env.eba-dmwpmndk.us-east-1.elasticbeanstalk.com/)

## Environment Variables

Setup the following environment variables either in the `.env` file or cloud environment variables:

```env
PORT                = 8080
POSTGRES_HOST       = postgres.c8swkvtplevs.us-east-1.rds.amazonaws.com
POSTGRES_PORT       = 5432
POSTGRES_DB         = postgres
POSTGRES_USERNAME   = postgres
POSTGRES_PASSWORD   = postgres
URL                 = http://localhost
JWT_SECRET          = damin_it
AWS_REGION          = us-east-1
AWS_PROFILE         = 
AWS_BUCKET          = ahmedfathallahkhalil

## Pipeline 

From the root of the project:
npm run frontend:install - To install frontend dependencies.
npm run frontend:build - To build the Angular/Frontend.
npm run frontend:deploy - To deploy the project to S3 using ./udagram-frontend/bin/deploy.sh deploy script.
npm run backend:install - To install backend dependencies.
npm run backend:change-main - To change the main entry point in the package.json from src/server.js to server.js using ./udagram-api/bin/edit-main-entry.sh with the help of jq and sponge.
npm run backend:build - To transpile the Typescript/Backend.
npm run backend:aws-eb - To Install AWS-EB using ./udagram-api/bin/aws-eb.sh install script.
npm run backend:deploy - To deploy the project to EB using ./udagram-api/bin/deploy.sh deploy script.

## CircleCi
The order of the run jobs:

Setting Env Variables.
Install NodeJS.
Checkout Code & unzip the code.
Install AWS CLI v2.
Check & Disable AWS pager.
Configure AWS AccessKeyID.
Configure AWS Region.
Frontend:
Install dependencies.
Build the angular.
Deploy the site to AWS S3.
Backend:
Install dependencies.
Change The main entry point in package.json.
Transpile the typescript/ build the app.
Install AWS Elastic Beanstalk CLI.
Deploy the app to AWS Elastic Beanstalk.
Testing
This project contains two different test suite: unit tests and End-To-End tests(e2e). Follow these steps to run the tests.

cd udagram-frontend
npm run test
npm run e2e
There are no Unit test on the back-end

## Unit Tests:
Unit tests are using the Jasmine Framework.

## End to End Tests:
The e2e tests are using Protractor and Jasmine.

## Built With
Angular - Single Page Application Framework
Node - Javascript Runtime
Express - Javascript API Framework