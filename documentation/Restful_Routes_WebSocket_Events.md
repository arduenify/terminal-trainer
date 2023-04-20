# 5. Restful API Routes & WebSocket Events

## 5.1 User Routes

### 5.1.1 Authentication

#### `POST /api/auth/register`

- Request Body JSON:
  - `username`: Unique username chosen by the user
  - `email`: User's email address
  - `password`: User's plaintext password
  - `firstName`: User's first name
  - `lastName`: User's last name
- Status Codes:
  - `201 Created`: Successful registration
  - `400 Bad Request`: Missing or invalid data
  - `409 Conflict`: Username or email already exists

#### `POST /api/auth/login`

- Request Body JSON:
  - `usernameOrEmail`: User's username or email
  - `password`: User's plaintext password
- Status Codes:
  - `200 OK`: Successful authentication
  - `400 Bad Request`: Missing or invalid data
  - `401 Unauthorized`: Incorrect username/email or password

### 5.1.2 Profiles

#### `GET /api/users/me`

- Status Codes:
  - `200 OK`: Successful profile retrieval
  - `401 Unauthorized`: User not authenticated
- Response Body JSON:

  ```json
  {
    "id": 1,
    "username": "username",
    "email": "email",
    "firstName": "first",
    "lastName": "last",
    "terminalTheme": "dark",
    "achievements": [],
    "progress": [],
    "userSince": "2023-04-01"
  }
  ```

#### `PUT /api/users/me`

- Request Body JSON:
  - Any of the editable user profile fields
- Status Codes:
  - `200 OK`: Successful profile update
  - `400 Bad Request`: Missing or invalid data
  - `401 Unauthorized`: User not authenticated

#### `DELETE /api/users/me`

- Status Codes:
  - `204 No Content`: Successful profile deletion
  - `401 Unauthorized`: User not authenticated

### 5.1.3 Progress

#### `GET /api/users/me/progress`

- Status Codes:
  - `200 OK`: Successful progress retrieval
  - `401 Unauthorized`: User not authenticated
- Response Body JSON:

  ```json
  [
    {
        "id": 1,
        "exerciseId": 1,
        "userId": 1,
        "completed": true,
        "score": 100,
        "hintsUsed": 0,
        "timeSpent": 300,
        "created_at": "2023-04-01",
        "updated_at": "2023-04-01"
    },
  ]
  ```

#### `GET /api/users/me/progress/:exerciseId`

- Status Codes:
  - `200 OK`: Successful progress retrieval for a specific exercise
  - `401 Unauthorized`: User not authenticated
  - `404 Not Found`: Exercise not found
- Response Body JSON:

  ```json
  {
    "id": 1,
    "exerciseId": 1,
    "userId": 1,
    "completed": true,
    "score": 100,
    "hintsUsed": 0,
    "timeSpent": 300,
    "created_at": "2023-04-01",
    "updated_at": "2023-04-01"
  }
  ```

#### `PUT /api/users/me/progress/:exerciseId`

- Request Body JSON:
  - Updated user progress data for the specific exercise
- Status Codes:
  - `200 OK`: Successful progress update for a specific exercise
  - `400 Bad Request`: Missing or invalid data
  - `401 Unauthorized`: User not authenticated
  - `404 Not Found`: Exercise not found

#### `POST /api/users/me/progress/reset`

- Status Codes:
  - `204 No Content`: Successful progress reset for all exercises
  - `401 Unauthorized`: User not authenticated

## 5.2 Exercises

### 5.2.1 Exercises Routes

#### `GET /api/exercises`

- Status Codes:
  - `200 OK`: Successful exercises retrieval
- Response Body JSON:

    ```json
    [
      {
        "id": 1,
        "title": "Navigating Directories",
        "description": "Learn how to navigate directories using 'cd' and 'pwd' commands.",
        "difficulty": "beginner",
        "category": "Basic Commands and Navigation",
        "prerequisites": [],
        "created_at": "2023-04-01",
        "updated_at": "2023-04-01"
      },
    ]
    ```

#### `POST /api/exercises` **(Admin only)**

- Request Body JSON:
  - Exercise data
- Status Codes:
  - `201 Created`: Successful exercise creation
  - `400 Bad Request`: Missing or invalid data
  - `401 Unauthorized`: User not authenticated or not an admin

#### `GET /api/exercises/:id`

- Status Codes:
  - `200 OK`: Successful exercise retrieval
  - `404 Not Found`: Exercise not found
- Response Body JSON:

  ```json
  {
    "id": 1,
    "title": "Navigating Directories",
    "description": "Learn how to navigate directories using 'cd' and 'pwd' commands.",
    "difficulty": "beginner",
    "category": "Basic Commands and Navigation",
    "prerequisites": [],
    "created_at": "2023-04-01",
    "updated_at": "2023-04-01"
  }
  ```

#### `PUT /api/exercises/:id` **(Admin only)**

- Request Body JSON:
  - `completed`: (optional) Boolean, whether the exercise is completed or not
  - `score`: (optional) Integer, score achieved in the exercise
  - `hintsUsed`: (optional) Integer, number of hints used
  - `timeSpent`: (optional) Integer, time spent on the exercise in seconds

- Status Codes:
  - `200 OK`: Successful exercise update
  - `400 Bad Request`: Missing or invalid data
  - `401 Unauthorized`: User not authenticated or not an admin
  - `404 Not Found`: Exercise not found

#### `DELETE /api/exercises/:id` **(Admin only)**

- Status Codes:
  - `204 No Content`: Successful exercise deletion
  - `401 Unauthorized`: User not authenticated or not an admin
  - `404 Not Found`: Exercise not found

#### `GET /api/exercises/:id/hints`

- Status Codes:
  - `200 OK`: Successfully retrieved hints
  - `404 Not Found`: Exercise not found
- Response Body JSON:
  
  ```json
  {
    "hints": [
      "Use the 'cd' command to change directories",
      "Type 'cd ..' to move up one directory"
    ]
  }
  ```

## 5.3 Badges

### 5.3.1 Badges Routes

#### `GET /api/badges`

- Status Codes:
  - `200 OK`: Successful badges retrieval
- Response Body JSON:
  
  ```json
  [
    {
      "id": 1,
      "name": "Command Line Novice",
      "description": "Completed 5 beginner exercises",
      "criteria": "Complete 5 beginner exercises",
      "created_at": "2023-04-01",
      "updated_at": "2023-04-01"
    },
  ]
  ```

#### `POST /api/badges` **(Admin only)**

- Request Body JSON:
  - Badge data
- Status Codes:
  - `201 Created`: Successful badge creation
  - `400 Bad Request`: Missing or invalid data
  - `401 Unauthorized`: User not authenticated or not an admin

#### `GET /api/badges/:id`

- Status Codes:
  - `200 OK`: Successful badge retrieval
  - `404 Not Found`: Badge not found
- Response Body JSON:
  
  ```json
  {
    "id": 1,
    "name": "Command Line Novice",
    "description": "Completed 5 beginner exercises",
    "criteria": "Complete 5 beginner exercises",
    "created_at": "2023-04-01",
    "updated_at": "2023-04-01"
  }
  ```

#### `PUT /api/badges/:id` **(Admin only)**

- Request Body JSON:
  - Any of the editable badge fields
- Status Codes:
  - `200 OK`: Successful badge update
  - `400 Bad Request`: Missing or invalid data
  - `401 Unauthorized`: User not authenticated or not an admin
  - `404 Not Found`: Badge not found

#### `DELETE /api/badges/:id` **(Admin only)**

- Status Codes:
  - `204 No Content`: Successful badge deletion
  - `401 Unauthorized`: User not authenticated or not an admin
  - `404 Not Found`: Badge not found

## 5.4 Terminal Interaction

### 5.4.1 WebSocket Events

#### 1. Establish WebSocket connection

- Upon beginning an exercise, the client will establish a WebSocket connection with the server.
- The server will create a terminal session for the authenticated user.

#### 2. Sending Commands

- Client Event: `sendCommand`
- Client sends a command to the server as a JSON object:

```json
{
  "type": "sendCommand",
  "data": {
    "command": "ls"
  }
}
```

#### 3. Receiving Command Output

- Server Event: `commandOutput`
- Server sends the command output back to the client as a JSON object:

```json
{
  "type": "commandOutput",
  "data": {
    "output": "file1.txt\nfile2.txt\n"
  }
}
```

#### 4. Requesting a Hint

- Client Event: `requestHint`
- Client sends a request for a hint to the server as a JSON object:

```json
{
  "type": "requestHint"
}
```

#### 5. Receiving a Hint

- Server Event: `hint`
- Server sends the hint back to the client as a JSON object:

```json
{
  "type": "hint",
  "data": {
    "hint": "Use the 'cd' command to change directories."
  }
}
```

#### 6. Exercise Completion

- Server Event: `exerciseComplete`
- Server sends the exercise completion status to the client as a JSON object:

```json
{
  "type": "exerciseComplete",
  "data": {
    "success": true,
    "message": "Congratulations! You have completed the exercise."
  }
}
```

#### 7. Close the WebSocket connection

- When the user is done with the terminal interaction or logs out, closes the page, etc., close the WebSocket connection.
