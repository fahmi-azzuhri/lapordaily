# Lapor Daily API Documentation

## Introduction

This project is a user management and work report system at PT KMI Wire and Cable Tbk PP Support Production using Express, Prisma, and MySQL. The system has two main roles: `ADMIN` and `USER`. Admins can add new users and manage work reports, while users can only log in and manage their own work reports.
## Screenshots

### 1. Login page
![loginpage](https://github.com/user-attachments/assets/c7ac1145-2c97-4950-a97d-4e37d34a8fda)

### 2. Role User
![userpage](https://github.com/user-attachments/assets/849bec7f-0ac0-4fb3-9bb2-f86f488d7cbb)

### 3. Role Admin
![dashboard-laporan](https://github.com/user-attachments/assets/0ba9f962-e1e9-4615-b0cb-1d6bc72b21c2)
![dashboard-users](https://github.com/user-attachments/assets/9efdc8e5-0739-4035-a253-d26d176920da)
![dashboard-adduser](https://github.com/user-attachments/assets/5b2443f1-b686-4e5f-b555-731b3daf8908)



## API Endpoints

### 1. Login
**Endpoint:** `POST /login`  
**Description:** This endpoint is used to log in to the system using `username` and `password`.

- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

- **Response:**
  ```json
  {
    "token": "string",
    "role": "string"
  }
  ```

### 2. Add New User (Admin Only)
**Endpoint:** `POST /admin/add-user`  
**Description:** This endpoint allows an admin to add a new user to the system.

- **Headers:**
  - `Authorization: Bearer <token>`

- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string",
    "role": "string"  // Either "ADMIN" or "USER"
  }
  ```

- **Response:**
  ```json
  {
    "id": "number",
    "username": "string",
    "role": "string"
  }
  ```

### 3. Create Admin Account (Initial Setup Only)
**Endpoint:** `POST /create-admin`  
**Description:** This endpoint is used to create the initial admin account. It can only be used once.

- **Response:**
  ```json
  {
    "message": "Admin account created successfully"
  }
  ```

### 4. Get All Users (Admin Only)
**Endpoint:** `GET /users`  
**Description:** This endpoint allows an admin to retrieve a list of all users in the system.

- **Headers:**
  - `Authorization: Bearer <token>`

- **Response:**
  ```json
  [
    {
      "id": "number",
      "username": "string",
      "role": "string"
    }
  ]
  ```

### 5. Get User by ID (Admin Only)
**Endpoint:** `GET /user/:id`  
**Description:** This endpoint allows an admin to retrieve details of a specific user by their ID.

- **Headers:**
  - `Authorization: Bearer <token>`

- **Response:**
  ```json
  {
    "id": "number",
    "username": "string",
    "role": "string"
  }
  ```
### 6. Create Work Report (User)
**Endpoint:** `POST /laporan`  
**Description:** This endpoint allows a user to create a new work report.

- **Headers:**
  - `Authorization: Bearer <token>`

- **Request Body:**
  ```json
  {
    "tanggal": "string (date format)",
    "nama": "string",
    "jenisPekerjaan": "string",
    "deskripsi": ["string"],
    "hasil": "string",
    "satuan": "string"
  }
  ```

- **Response:**
  ```json
  {
    "success": true,
    "message": "Data berhasil ditambahkan",
    "laporan": {
      "id": "number",
      "tanggal": "string",
      "nama": "string",
      "jenisPekerjaan": "string",
      "deskripsi": "string",
      "hasil": "string",
      "satuan": "string"
    }
  }
  ```

### 7. Get All Work Reports
**Endpoint:** `GET /laporan`  
**Description:** This endpoint allows a user to retrieve all work reports.

- **Headers:**
  - `Authorization: Bearer <token>`

- **Response:**
  ```json
  [
    {
      "id": "number",
      "tanggal": "string",
      "nama": "string",
      "jenisPekerjaan": "string",
      "deskripsi": "string",
      "hasil": "string",
      "satuan": "string"
    }
  ]
  ```

### 8. Get Work Report by ID
**Endpoint:** `GET /laporan/:id`  
**Description:** This endpoint allows a user to retrieve a specific work report by its ID.

- **Headers:**
  - `Authorization: Bearer <token>`

- **Response:**
  ```json
  {
    "id": "number",
    "tanggal": "string",
    "nama": "string",
    "jenisPekerjaan": "string",
    "deskripsi": "string",
    "hasil": "string",
    "satuan": "string"
  }
  ```

### 9. Update Work Report
**Endpoint:** `PUT /laporan/:id`  
**Description:** This endpoint allows a user to update a specific work report by its ID.

- **Headers:**
  - `Authorization: Bearer <token>`

- **Request Body:**
  ```json
  {
    "tanggal": "string (date format)",
    "nama": "string",
    "jenisPekerjaan": "string",
    "deskripsi": ["string"],
    "hasil": "string",
    "satuan": ["string"]
  }
  ```

- **Response:**
  ```json
  {
    "id": "number",
    "tanggal": "string",
    "nama": "string",
    "jenisPekerjaan": "string",
    "deskripsi": "string",
    "hasil": "string",
    "satuan": "string"
  }
  ```

## Tech stack :
 - Vite ReactJS
 - TailwindCSS
 - Prisma
 - ExpressJS
 - MySQL
   
### Frontend
- clone repo
- cd lapordaily
- cd frontend
- npm install
- npm run dev

### Backend
- clone repo
- cd lapordaily
- cd backend
- npm install
- npx prisma migrate dev --name init
- node index.js

### DB
- run apache & mysql xampp control panel or any other web server

