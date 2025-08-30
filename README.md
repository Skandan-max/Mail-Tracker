# Email Tracker

A minimalist email tracking system built. This project enables sending tracked emails with embedded invisible pixels to record email opens, plus viewing logs and reports for engagement analytics.

---

## Features

- **Email Sending with Tracking**  
  Sends emails containing a unique tracking pixel that records when recipients open the email.

- **Open Event Logging**  
  Captures metadata on email opens including timestamp, client IP, and user-agent, stored in a robust SQLite database.

- **Detailed Reports & Logs**  
  Provides REST API endpoints and a sleek React frontend for visualizing sent emails, open events, and engagement statistics in real-time.

- **Stable Domain Usage**  
  Designed to operate reliably with configurable custom domain (e.g., `ecell.iitm.ac.in`) for persistent and professional tracking pixel URLs.

- **Lightweight & Extendable**  
  Uses SQLite for a simple, file-based database and clean modular code architecture to facilitate future enhancements such as click tracking or dashboarding.

---

## Getting Started

### Prerequisites

- Node.js v16+ and npm  
- Gmail SMTP credentials (email & app password) for sending emails  
- (Optional) Configure a public domain with HTTPS for production usage  

### Setup

1. Clone the repository:
2. Install backend dependencies:
3. Setup frontend dependencies:
4. Create a `.env` file in `src/` with:
5. Run the frontend and the backend


Open `http://localhost:3000` to access the frontend UI.

---

## How It Works

- **Sending Emails:**  
Frontend form collects recipient email, subject, and body. Backend generates a unique tracking ID and embeds a 1x1 transparent tracking pixel image URL into the HTML email. The email is sent via Gmail SMTP.

- **Tracking Opens:**  
When the recipient opens the email, their client loads the tracking pixel from your backend server. This triggers a pixel request with the unique ID, logging the event’s IP, user-agent, and timestamp into the SQLite database.

- **Viewing Logs & Reports:**  
Logged data can be retrieved via backend API endpoints (`/api/logs` and `/api/report`) or viewed in the React frontend for a summary of email engagement.

---

## Project Structure

- `src/`  
Backend code with Express routing, email sending, tracking pixel handling, and SQLite database logic.

- `src/client/`  
React frontend with a clean and minimalist UI utilizing AntD components for ease of use.

- `src/events.db`  
SQLite database file storing all email and tracking event data.






