# Lapor Daily
 ## Tech stack :
 - Vite ReactJS
 - TailwindCSS
 - Prisma
 - ExpressJS
 - MySQL
   
### Frontend
- cd frontend
- npm install
- npm run dev

### Frontend (run with Docker)
- cd frontend
- docker build -t nama-image:tag .
- docker run -p 3000:3000 nama-image:tag



### Backend
- cd backend
- npm install
- npx prisma migrate dev --name init
- node index.js

### DB
- run apache & mysql xampp control panel or any other web server
