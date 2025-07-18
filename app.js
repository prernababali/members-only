const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();
require("./passport-config")(passport);

const app = express();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride((req) => {
  if (req.body && typeof req.body === "object" && "_method" in req.body) {
    return req.body._method;
  }
  if (req.query && req.query._method) {
    return req.query._method;
  }
}));


// Session and flash setup
app.use(
  session({
    store: new pgSession({ pool: db }),
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// ✅ flash BEFORE passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Set user and flash messages globally
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.messages = req.flash();
  next();
});

// Routes
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");

app.use("/", indexRoutes);
app.use("/", authRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

