# Demo Mode Configuration

This application is currently configured to run in demo mode, which bypasses the login requirement.

## Changes Made:

1. **ProtectedRoute Component** (`src/components/ProtectedRoute/index.js`)
   - Authentication check is bypassed
   - All routes are accessible without login

2. **App.js** (`src/App.js`)
   - `/login` route redirects to `/dashboard`
   - No login page is displayed

3. **Auth Slice** (`src/store/slices/authSlice.js`)
   - Default demo user is set automatically
   - `isAuthenticated` is always true
   - Demo user info:
     - Username: demo
     - Email: demo@catlink.com
     - Role: user

4. **Header Component** (`src/components/Layout/Header.js`)
   - Logout functionality is disabled
   - Shows message "Logout is disabled in demo mode"

## To Re-enable Login:

1. Uncomment the authentication logic in `ProtectedRoute/index.js`
2. Change `/login` route back to `<Login />` in `App.js`
3. Remove the default user and set `isAuthenticated: !!token` in `authSlice.js`
4. Uncomment the logout functionality in `Header.js`

## Access the Application:

Simply navigate to http://localhost:3000 and you will be automatically redirected to the dashboard (overview) page.