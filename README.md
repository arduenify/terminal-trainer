# Terminal Trainer

## Table of Contents

1. [Terminal Trainer](./README.md)  
    1. [Overview](#11-overview)  
    2. [Purpose and Target Audience](#12-purpose-and-target-audience)  
    3. [Core Features](#13-core-features)
2. [User Stories](./documentation/User_Stories.md#2-user-stories)  
    1. [New Learners](./documentation/User_Stories.md/#21-new-learners-unauthenticated-users)  
    2. [Authenticated Users](./documentation/User_Stories.md/#22-authenticated-users)  
    3. [Administrators](./documentation/User_Stories.md/#23-administrators)  
3. [System Architecture](./documentation/System_Architecture.md)  
    1. [Frontend Technologies and Libraries](./documentation/System_Architecture.md#31-frontend-technologies-and-libraries)  
    2. [Backend Technologies and Libraries](./documentation/System_Architecture.md#32-backend-technologies-and-libraries)  
    3. [Hosting and Deployment](./documentation/System_Architecture.md#33-hosting-and-deployment)  
4. [Components And Data Models](./documentation/Components_And_Data_Models.md)  
    1. [Components](./documentation/Components_And_Data_Models.md#41-components)  
        1. [User Profiles](./documentation/Components_And_Data_Models.md#411-user-profiles)  
        2. [Exercises](./documentation/Components_And_Data_Models.md#412-exercises)  
        3. [User Progress](./documentation/Components_And_Data_Models.md#413-user-progress)  
        4. [Badges](./documentation/Components_And_Data_Models.md#414-badges)  
    2. [Data Models and Relationships](./documentation/Components_And_Data_Models.md#42-data-models-and-relationships)  
5. [Restful API Routes and WebSocket Events](./documentation/Restful_Routes_WebSocket_Events.md)  
    1. [User Routes](./documentation/Restful_Routes_WebSocket_Events.md#51-user-routes)  
        1. [Authentication](./documentation/Restful_Routes_WebSocket_Events.md#511-authentication)  
        2. [Profiles](./documentation/Restful_Routes_WebSocket_Events.md#512-profiles)  
        3. [Progress](./documentation/Restful_Routes_WebSocket_Events.md#513-progress)  
    2. [Exercises](./documentation/Restful_Routes_WebSocket_Events.md#52-exercises)  
        1. [Exercise Routes](./documentation/Restful_Routes_WebSocket_Events.md#521-exercise-routes)  
    3. [Badges](./documentation/Restful_Routes_WebSocket_Events.md#53-badges)  
        1. [Badges Routes](./documentation/Restful_Routes_WebSocket_Events.md#531-badges-routes)  
    4. [Terminal Integration](./documentation/Restful_Routes_WebSocket_Events.md#54-terminal-integration)  
        1. [WebSocket Events](./documentation/Restful_Routes_WebSocket_Events.md#541-websocket-events)  

## 1.1 Overview

*Terminal Trainer* is a browser-based web application that is designed to provide users an interactive and engaging learning platform for command-line skills. This application simulates a terminal environment within the browser, so that users can practice and re-inforce their command-line skills via challenging exercises. Knowledge level is kept in mind, as this app aims to tailor to all different skill levels.

## 1.2 Purpose and Target Audience

As someone who loves to mentor others and help them learn, I developed this guide with targets of all skill levels in mind. Individuals who are brand new to command-line interfaces will become much more comfortable when navigating around a terminal. Intermediate and experienced users will also find challening exercises that test even their vast knowledge of a CLI. Educators are also a targeted audience, as they can act as administrators to create or manage exercises, track user progress, and manage award badges.

## 1.3 Core Features

### User Profiles

Allows users to create, read, update, and delete their profiles, complete with progress tracking, achievements, and preferred terminal environment settings.

### Exercises

Enables administrators to create, read, update, and delete interactive exercises, specifying the task, difficulty, and any necessary prerequisites.

### User Progress

Grants users the ability to track, view, update, and reset their progress in completing exercises, including their scores, hints used, and time spent.

### Badges

Allows administrators to create, read, update, and delete achievement badges, awarded to users upon completion of specific tasks, or when reaching milestones.

### Terminal Customization

Provides users with options to customize the appearance of the terminal, enhancing both user experience and accessibility.

### Accessibility

Ensures the application is usable by a diverse audience, taking into account various accessibility needs and preferences.
