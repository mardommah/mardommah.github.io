# Makassar Coding Website

A responsive website for Makassar Coding with user authentication system using Bootstrap and localStorage.

## Features

- Responsive design using Bootstrap 5
- User login and registration system
- Admin account (username: `admin`, password: `admin`)
- User data stored in browser's localStorage
- Interactive dashboard for logged-in users
- Course catalog with progress tracking
- Form validation and user feedback

## Project Structure

```
.
├── index.html          # Main landing page
├── login.html          # Login and registration page
├── dashboard.html      # User dashboard
├── courses.html        # Course catalog
├── course-content.html # Sample course content
├── script.js           # Main JavaScript file
├── README.md           # This file
├── logo.png            # Website logo
├── img.jpg             # Sample course images
└── contoh.png          # Sample image
```

## Authentication System

### Login
- Users can log in with their username and password
- Admin account is pre-configured (username: `admin`, password: `admin`)
- After successful login, users are redirected to the dashboard

### Registration
- New users can create an account by providing:
  - Full name
  - Username
  - Email
  - Password (with confirmation)
- System checks for duplicate usernames
- Passwords are stored in plain text (for demonstration purposes only)

### Data Storage
- User data is stored in the browser's localStorage
- Data persists between sessions but is specific to each browser
- No server-side storage is implemented

## Pages

### index.html
The main landing page that shows different content based on login status:
- If logged in: "Dashboard" button in navigation
- If not logged in: "Login" button in navigation
- Course cards that link to the courses page

### login.html
Contains both login and registration forms:
- Toggle between login and registration
- Form validation
- User feedback messages
- Automatic redirect after successful login

### dashboard.html
User dashboard with:
- Welcome message
- Stats cards
- Recent activity
- Learning progress
- Logout functionality

### courses.html
Course catalog with:
- Grid of available courses
- Progress indicators
- Locked/unlocked content
- Search and filter options

### course-content.html
Sample course content page with:
- Video lessons
- Progress tracking
- Lesson completion
- Downloadable resources

### script.js
Handles:
- Admin user initialization
- Login status checking
- User authentication

## Dummy Courses

The project includes several dummy courses to demonstrate the system:

1. **HTML Fundamentals** - Free, beginner course (100% complete for demo)
2. **CSS Styling** - Free, beginner course (65% complete for demo)
3. **JavaScript Essentials** - Premium, intermediate course (0% complete)
4. **Bootstrap Framework** - Free, intermediate course (0% complete)
5. **React Development** - Premium, advanced course (locked)
6. **Node.js Backend** - Premium, advanced course (locked)

## Security Notes

⚠️ **This is a demonstration project only. For production use, you should implement:**
- Server-side authentication
- Password hashing (bcrypt, etc.)
- Secure session management
- Input sanitization
- CSRF protection
- HTTPS encryption

## Browser Support

This project uses modern web technologies:
- localStorage API
- Bootstrap 5
- ES6 JavaScript features

## Setup

1. Clone or download the repository
2. Open `index.html` in a web browser
3. Click "Login" to access the authentication system
4. Use the admin account (username: `admin`, password: `admin`) or create a new account

## Development

To run a local server for development:
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000 in your browser.

## Customization

You can customize:
- Colors: Modify the CSS variables in the `<style>` sections
- Content: Edit the HTML directly
- Functionality: Modify the JavaScript in the `<script>` sections

## License

This project is for educational purposes. Feel free to use and modify it for your own learning.