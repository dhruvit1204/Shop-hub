# ShopHub Authentication Server

This is the backend server for ShopHub's authentication system with email OTP verification.

## Features

- User registration with email verification
- Login with email OTP verification
- JWT-based authentication
- MongoDB data storage
- Email notification service

## Setup Instructions

1. Install dependencies:

```bash
cd server
npm install
```

2. Create a `.env` file in the server directory with the following variables (copy from `.env.example`):

```
# Server Configuration
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/shop-hub

# JWT Configuration
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-email-app-password
```

3. Configure your email provider:
   - For Gmail, you need to create an "App Password" in your Google Account security settings
   - For other providers, consult their documentation for SMTP settings

4. Start the server:

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/send-otp`: Send OTP for login/signup
  - Body: `{ email, action, name }`
  - `action` can be either "login" or "signup"
  - `name` is required only for signup

- `POST /api/auth/verify-otp`: Verify OTP for login/signup
  - Body: `{ email, otp, action, name }`
  - Returns a JWT token on successful verification

- `GET /api/auth/me`: Get the current user profile (protected route)
  - Requires Authorization header with JWT token
