#  Members Only - Node.js Project

This is a full-stack web application built using **Node.js**, **Express**, **PostgreSQL**, and **EJS** where only signed-in users can view and create messages, and only **admins** can delete them. It's inspired by a classic club/community app — like a secret society for messages.


##  Project Structure
members-only/
│

├── controllers/

│ └── messageController.js # Handles logic for home, new message, delete

│
├── models/

│ └── message.js # PostgreSQL queries for messages

│
├── routes/

│ └── index.js # All app routes (GET, POST, DELETE)

│
├── views/

│ ├── index.ejs # Main page (message feed)

│ ├── layout.ejs # Optional: master layout

│ ├── new_message.ejs # Form to post new message

│ ├── sign_up.ejs, log_in.ejs # Auth views

│
├── db.js # PostgreSQL connection setup

├── passport-config.js # Passport local strategy config

├── app.js # Main server file

├── .env # Environment variables

└── README.md # This file



##  Tech Stack

- **Backend**: Node.js, Express
- **Auth**: Passport.js (local strategy)
- **Database**: PostgreSQL
- **Views**: EJS templates
- **Session Store**: connect-pg-simple
- **Others**: method-override, express-session, connect-flash, dotenv



##  Features

- ✅ User Registration & Login
- ✅ Role-Based Access:
  - Members can post messages
  - Admins can delete any message
- ✅ Flash messages for errors/success
- ✅ CSRF-safe DELETE via method-override
- ✅ Responsive message feed with user info & timestamps

---

##  How to Run Locally

1. **Clone the repo**

   
   ```bash-->  git clone <your-repo-url>
               cd members-only
               Install dependencies
               npm install
               Set up PostgreSQL DB



**SQL Queries for users and message table**


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  username TEXT UNIQUE,
  password TEXT,
  is_member BOOLEAN DEFAULT false,
  is_admin BOOLEAN DEFAULT false
);


CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id)
);

npm start
Visit: http://localhost:3000


2. **Admin Test Account**
    
To test admin delete functionality, insert a user like this in the DB:

--> INSERT INTO users (first_name, last_name, username, password, is_member, is_admin)

VALUES ('Admin', 'User', 'admin', '<hashed_password>', true, true);

(Use bcrypt to hash your password, or register normally and update the DB manually.)


3. **Key Learnings**
    
* Handling method="POST" forms for DELETE with method-override
  

* Role-based conditional rendering in EJS
  

* Full auth flow using Passport
  

* Clean MVC structure for Express
  

* Flash messages for UX
  

4. **Future Improvements**
   
* Add editing messages


* Pagination or infinite scroll


* Password reset flow
* 

* Admin dashboard


**Credits**

Built as part of a Node.js course project – completed after deep debugging and solving real-world issues like routing errors, method override misconfigurations, and view/controller separation.



**Preview***

Only members can post messages.
Only admins can delete them.



