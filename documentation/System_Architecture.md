# 3. System Architecture

*Terminal Trainer*'s system architecture aims to provide a smooth, responsive, and secure learning experience for users. The architecture is divided into frontend and backend components, with a focus on modularity, scalability, and maintainability.

## 3.1 Frontend Technologies and Libraries

The frontend of *Terminal Trainer* will leverage modern web development frameworks and libraries to create a dynamic, user-friendly interface. Some of the key technologies to be used include:

- **React**: A popular JavaScript library for building user interfaces. This will be used to create scalable components and handle user interactions.
- **Redux Toolkit**: A clean & modern state management library for JavaScript applications.
- **xterm.js**: A JavaScript library that enables the creation of terminal-like interfaces within the browser. This library provides an API for handling user input, displaying output, and managing terminal instances.
- **React useWebSocket**: A library that provides robust WebSocket integrations into React Components.

## 3.2 Backend Technologies and Libraries

The backend of *Terminal Trainer* will handle server-side processing, command execution, and data storage. The following technologies and libraries will be used:

- **Node.js**: A JavaScript runtime environment for server-side applications.
- **Express**: A web application framework for Node.js that will be used to create a RESTful API that handles client requests, manages sessions, and performs server-side processing.
- **node-pty**: A Node.js library for creating pseudo-terminals on the server, allowing secure execution of shell commands.
- **SQLite** or **PostgreSQL**: A database technology for storing all user profiles, exercises, progress, achievements, and all other data used for the application.
- **WebSocket Server**: The WebSocket server handles real-time terminal interaction, including: sending commands, receiving output, requesting hints, and receiving exercise completion status. The server will be a part of the Express server.

## 3.3 Hosting and Deployment

*Terminal Trainer* will be hosted on Render, as will the database used with the application.
