# RSIIT - Rising Star Institute of Information and Technology LMS

A modern, professional University-style Learning Management System.

## 🚀 Tech Stack
- **Frontend:** React.js + Tailwind CSS + Vite
- **Backend:** Node.js + Express.js
- **Database:** NeonDB (PostgreSQL Serverless)
- **Auth:** JWT-based RBAC (Admin, Teacher, Student)
- **Deployment:** Vercel (Frontend), Hugging Face Spaces (Backend)

## 📁 Project Structure
- `/frontend`: React application (Vite)
- `/backend`: Node.js Express API
- `/backend/src/models/schema.sql`: Database schema

## 🛠️ Local Setup

### 1. Database
- Run the SQL in `/backend/src/models/schema.sql` on your NeonDB instance.
- Or use the utility: `cd backend && node src/utils/setupDb.js`

### 2. Environment Variables
Create `.env` files in both directories based on `.env.example`.

### 3. Run Development Servers
**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 🔐 Credentials (Initial)
- **Admin:** `admin@rsiit.edu.pk` / `admin123`

## 🚢 Deployment & CI/CD
GitHub Actions are configured in `.github/workflows`:
1. **Frontend:** Deploys to Vercel. Set `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` in GitHub Secrets.
2. **Backend:** Deploys to Hugging Face Spaces. Set `HF_TOKEN` in GitHub Secrets and update the repo name in `backend.yml`.

## ✨ Features
- **Realtime Clock:** Precision tracking for assignments.
- **Course Registration:** Modular approval workflow.
- **Mobile Responsive:** Drawer-style menu for small screens.
- **RBAC:** Secure access for different user roles.
