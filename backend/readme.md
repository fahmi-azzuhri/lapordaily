# Lapor Daily API Documentation

## 📋 Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Usage Examples](#usage-examples)

## 🔍 Overview

Lapor Daily is a daily reporting API built with Node.js, Express, and Prisma. It allows users to create, manage, and export daily work reports with role-based access control.

### Features

- User authentication with JWT
- Role-based access (Admin/User)
- Daily report management
- Excel export functionality
- Pagination support
- Date filtering

### Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **Export**: ExcelJS for Excel file generation

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Database (PostgreSQL, MySQL, SQLite, etc.)

### Clone and Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd lapordaily
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment configuration**
   Create a `.env` file in the root directory:

   ```env
   # Database URL - adjust according to your database
   mysql://root@localhost:3306/laporan_harian

   # JWT Secret - use a strong random string
   JWT_SECRET="3dedfd40dc0c264ceb120366188e29fab4993523b67ab7d4e70b52200796fd584654aa628d8b90e97cd7e2489e6c7419005d173bd3ec0f42774e23f90178169cfb5e821c212da4afbefa3d45eb029900a76deaa54344d3392a9a9bcf34064a925a44fed7c97d2f1c57cb9d92e73e76ad0dcb880bcce7ab42655d76e284bec20fcfb23792a84a7bad99693f6c74d7cb0ca614f1483cdaed13bb9250efc2aef4c357be13b728eefd8943554c21e713dc753429e47e3ba61b5485c6bcade29eddff7307bebec54ce600447d1024593f97fdc1400c70fdb00682ffa17785ba0522c4e554a56aff8d6fd2aa60bdfeb4d15ae44ac21939f103a6b689389b817bb47ab7"

   # Server Port (optional, defaults to 3000)
   PORT=3000
   ```

4. **Database setup**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma db push

   # (Optional) Seed the database if you have seed file
   npx prisma db seed
   ```

5. **Start the server**

   ```bash
   # Development mode
   npm start

   # Or using nodemon directly
   npx nodemon src/index.js
   ```

The server will start on `http://localhost:3000`

## 🔧 Environment Setup

### Required Environment Variables

| Variable       | Description                      | Example                                    |
| -------------- | -------------------------------- | ------------------------------------------ |
| `DATABASE_URL` | Database connection string       | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET`   | Secret key for JWT token signing | `your-secret-key`                          |
| `PORT`         | Server port (optional)           | `3000`                                     |

### Database Configuration

The project uses Prisma ORM. Make sure to:

1. Configure your `DATABASE_URL` in `.env`
2. Run `npx prisma generate` to generate the Prisma client
3. Run `npx prisma db push` to sync your database schema
4. Check `prisma/schema.prisma` for the database schema

## 🗄️ Database Setup

### Schema Overview

The application uses the following main models:

- **User**: Stores user accounts with roles (ADMIN/USER)
- **Report**: Stores daily work reports linked to users

### Initial Admin Setup

After starting the server, create an admin account:

```bash
POST /setup/setup-admin
Content-Type: application/json

{
  "username": "admin",
  "password": "your-admin-password"
}
```

## 🔐 Authentication

### JWT Token Structure

The API uses JWT tokens for authentication. Tokens contain:

```json
{
  "id": "user_id",
  "role": "USER|ADMIN",
  "username": "username"
}
```

### Authorization Header

Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📡 API Endpoints

### Base URL

```
http://localhost:3000
```

### 🏠 Root Endpoint

#### GET /

Returns API welcome message.

**Response:**

```
Lapor Daily API 🚀
```

---

### 🔐 Authentication Endpoints

#### POST /auth/login

Authenticate user and get JWT token.

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "token": "jwt_token_here",
  "username": "username",
  "role": "USER|ADMIN",
  "id": 1
}
```

**Error Responses:**

- `401` - Username salah / Password salah

---

### ⚙️ Setup Endpoints

#### POST /setup/setup-admin

Create the first admin user (only works if no admin exists).

**Request Body:**

```json
{
  "username": "admin",
  "password": "admin_password"
}
```

**Response:**

```json
{
  "message": "Admin dibuat",
  "admin": {
    "id": 1,
    "username": "admin"
  }
}
```

**Error Responses:**

- `403` - Admin sudah ada

---

### 👥 User Management Endpoints

_Requires Admin role_

#### POST /users

Create a new user.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Request Body:**

```json
{
  "username": "new_user",
  "password": "user_password"
}
```

**Response:**

```json
{
  "id": 2,
  "username": "new_user",
  "role": "USER"
}
```

#### GET /users

Get all users (excluding admins).

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response:**

```json
[
  {
    "id": 2,
    "username": "user1",
    "role": "USER"
  }
]
```

#### DELETE /users/:id

Delete a user by ID.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response:**

```json
{
  "message": "User dihapus"
}
```

#### GET /users/count

Get total number of users.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response:**

```json
{
  "totalUser": 5
}
```

---

### 📊 Report Endpoints

#### POST /reports

Create a new daily report.

**Headers:**

```
Authorization: Bearer <user_token>
```

**Request Body:**

```json
{
  "tanggal": "2025-06-11",
  "nama": "User Name",
  "pekerjaan": [
    {
      "kategori": "Development",
      "deskripsi": "Building API endpoints",
      "hasil": 3,
      "satuan": "endpoints"
    },
    {
      "kategori": "Testing",
      "deskripsi": "Unit testing",
      "hasil": 5,
      "satuan": "tests"
    }
  ]
}
```

**Response:**

```json
{
  "message": "Laporan berhasil disimpan",
  "data": [
    {
      "id": 1,
      "date": "2025-06-11T00:00:00.000Z",
      "name": "User Name",
      "workType": "Development",
      "description": "Building API endpoints",
      "result": 3,
      "unit": "endpoints",
      "userId": 1
    }
  ],
  "count": 2
}
```

#### GET /reports

Get user's reports with pagination and filtering.

**Headers:**

```
Authorization: Bearer <user_token>
```

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `startDate` (optional): Filter from date (YYYY-MM-DD)
- `endDate` (optional): Filter to date (YYYY-MM-DD)

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "date": "2025-06-11T00:00:00.000Z",
      "name": "User Name",
      "workType": "Development",
      "description": "Building API endpoints",
      "result": 3,
      "unit": "endpoints",
      "userId": 1,
      "createdAt": "2025-06-11T10:30:00.000Z",
      "updatedAt": "2025-06-11T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

#### GET /reports/grouped

Get user's reports grouped by date.

**Headers:**

```
Authorization: Bearer <user_token>
```

**Response:**

```json
{
  "data": [
    {
      "date": "2025-06-11",
      "name": "User Name",
      "pekerjaan": [
        {
          "id": 1,
          "kategori": "Development",
          "deskripsi": "Building API endpoints",
          "hasil": 3,
          "createdAt": "2025-06-11T10:30:00.000Z",
          "updatedAt": "2025-06-11T10:30:00.000Z"
        }
      ]
    }
  ],
  "count": 1
}
```

#### GET /reports/:id

Get a specific report by ID.

**Headers:**

```
Authorization: Bearer <user_token>
```

**Response:**

```json
{
  "id": 1,
  "date": "2025-06-11T00:00:00.000Z",
  "name": "User Name",
  "workType": "Development",
  "description": "Building API endpoints",
  "result": 3,
  "unit": "endpoints",
  "userId": 1,
  "createdAt": "2025-06-11T10:30:00.000Z",
  "updatedAt": "2025-06-11T10:30:00.000Z"
}
```

#### PUT /reports/:id

Update a specific report.

**Headers:**

```
Authorization: Bearer <user_token>
```

**Request Body:**

```json
{
  "workType": "Development",
  "description": "Updated description",
  "result": 5
}
```

**Response:**

```json
{
  "message": "Laporan berhasil diperbarui",
  "data": {
    "id": 1,
    "date": "2025-06-11T00:00:00.000Z",
    "name": "User Name",
    "workType": "Development",
    "description": "Updated description",
    "result": 5,
    "unit": "endpoints",
    "userId": 1,
    "createdAt": "2025-06-11T10:30:00.000Z",
    "updatedAt": "2025-06-11T12:00:00.000Z"
  }
}
```

#### DELETE /reports/:id

Delete a specific report.

**Headers:**

```
Authorization: Bearer <user_token>
```

**Response:**

```json
{
  "message": "Laporan berhasil dihapus"
}
```

---

### 📈 Admin Report Endpoints

_Requires Admin role_

#### GET /reports/admin/all

Get all reports from all users.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "date": "2025-06-11T00:00:00.000Z",
      "name": "User Name",
      "workType": "Development",
      "description": "Building API endpoints",
      "result": 3,
      "unit": "endpoints",
      "userId": 1,
      "createdAt": "2025-06-11T10:30:00.000Z",
      "updatedAt": "2025-06-11T10:30:00.000Z",
      "user": {
        "username": "user1"
      }
    }
  ]
}
```

#### GET /reports/admin/total

Get total count of all reports.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response:**

```json
{
  "total": 100
}
```

#### GET /reports/admin/export

Export reports to Excel file.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Query Parameters:**

- `bulan` (required): Month (1-12)
- `tahun` (required): Year (YYYY)
- `pekerjaan` (optional): Filter by work type

**Example:**

```
GET /reports/admin/export?bulan=6&tahun=2025&pekerjaan=Development
```

**Response:**
Excel file download with filename: `Laporan_{month}_{year}.xlsx`

---

## ❌ Error Handling

### Common Error Responses

#### 400 Bad Request

```json
{
  "error": "Data tidak lengkap. Tanggal dan minimal satu pekerjaan diperlukan."
}
```

#### 401 Unauthorized

```json
{
  "message": "Token tidak ada"
}
```

#### 403 Forbidden

```json
{
  "error": "Akses ditolak"
}
```

#### 404 Not Found

```json
{
  "error": "Laporan tidak ditemukan"
}
```

#### 500 Internal Server Error

```json
{
  "error": "Terjadi kesalahan saat menyimpan laporan"
}
```

---

## 💡 Usage Examples

### Complete Workflow Example

1. **Setup Admin**

   ```javascript
   // POST /setup/setup-admin
   const adminResponse = await fetch(
     "http://localhost:3000/setup/setup-admin",
     {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         username: "admin",
         password: "admin123",
       }),
     }
   );
   ```

2. **Admin Login**

   ```javascript
   // POST /auth/login
   const loginResponse = await fetch("http://localhost:3000/auth/login", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       username: "admin",
       password: "admin123",
     }),
   });
   const { token } = await loginResponse.json();
   ```

3. **Create User**

   ```javascript
   // POST /users
   const userResponse = await fetch("http://localhost:3000/users", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
     body: JSON.stringify({
       username: "employee1",
       password: "password123",
     }),
   });
   ```

4. **User Login and Create Report**

   ```javascript
   // User login
   const userLogin = await fetch("http://localhost:3000/auth/login", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       username: "employee1",
       password: "password123",
     }),
   });
   const { token: userToken } = await userLogin.json();

   // Create report
   const reportResponse = await fetch("http://localhost:3000/reports", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${userToken}`,
     },
     body: JSON.stringify({
       tanggal: "2025-06-11",
       nama: "Employee One",
       pekerjaan: [
         {
           kategori: "Development",
           deskripsi: "Built user authentication",
           hasil: 1,
           satuan: "feature",
         },
       ],
     }),
   });
   ```

### cURL Examples

```bash
# Setup admin
curl -X POST http://localhost:3000/setup/setup-admin \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'

# Create report (replace TOKEN with actual JWT)
curl -X POST http://localhost:3000/reports \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "tanggal": "2025-06-11",
    "nama": "John Doe",
    "pekerjaan": [
      {
        "kategori": "Development",
        "deskripsi": "API development",
        "hasil": 3,
        "satuan": "endpoints"
      }
    ]
  }'

# Get reports with pagination
curl -X GET "http://localhost:3000/reports?page=1&limit=5" \
  -H "Authorization: Bearer TOKEN"

# Export reports (admin only)
curl -X GET "http://localhost:3000/reports/admin/export?bulan=6&tahun=2025" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -o laporan.xlsx
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- Passwords are hashed using bcrypt
- JWT tokens expire in 1 day
- The API supports CORS for `http://localhost:5173` (frontend)
- File exports are in Excel format (.xlsx)
- Database schema can be found in `prisma/schema.prisma`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.
