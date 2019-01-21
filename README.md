## !!!!WORK IN PROGRESS!!!!

## Introduction

DockIt is a project that sets you free from the development and deployment setup of your application.

Just jump into the code and focus on business logic we will do the rest.
Do hassle free development without worrying about the development environment or dependencies.

### WHAT IS THIS PROJECT ABOUT

When working on microservice architecture style project. There are lots of technologies involved for development. It can happen that one microservice uses java stack while other uses node stack and so on. All this  requires setup of environment for development and most importantly deployment. It becomes an intimidating task to setup the environment for development and deployment. It takes time to stable the environment.
Imagine if you have multiple such environment to manage and make sure everything works the way it should. What if i want to upgrade the technology stack and do a sanity if everything works as expected and get a report of what can go wrong before deploying your code to production.

Here comes container to your rescue. With dockit design your application once and deploy it anywhere or upgrade your technology stack and create a fresh environment to see the outcome of your upgrades and know the issues and fix it before deploying it to the production.

Create a pipeline of your deployment in one go for all the environment in one go. For development or testing or production.
Temporarily create an infra  for integration testing and shut it down after the testing is complete.

The benefit of isolating development environment with containers will allow us to easily create jenkins jobs for building and deploying application easily. 
If a build is created successfully in local using docker then it will run the same way in deployment servers because same container will be used for creation of build in deployment server also.
