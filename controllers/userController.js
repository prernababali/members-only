const bcrypt = require("bcryptjs");
const {
  createUser,
  updateMembershipStatus,
  updateAdminStatus,
} = require("../models/user");

// GET: Sign-up form
const getSignUp = (req, res) => {
  res.render("sign-up");
};

// POST: Handle sign-up form submission
const postSignUp = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    password,
    confirmPassword,
    isAdmin,
  } = req.body;

  if (password !== confirmPassword) {
    req.flash("error", "Passwords do not match");
    return res.redirect("/sign-up");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({
      firstName,
      lastName,
      username,
      hashedPassword,
    });

    // If admin checkbox is selected
    if (isAdmin === "on") {
      await updateAdminStatus(newUser.id);
    }

    res.redirect("/log-in");
  } catch (err) {
    console.error("Error creating user:", err);
    res.redirect("/sign-up");
  }
};

// GET: Login form
const getLogin = (req, res) => {
  res.render("log-in", { messages: req.flash("error") });
};

// POST: Logout
const logout = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect("/");
  });
};

// GET: Join club form
const getJoinPage = (req, res) => {
  res.render("join");
};

// POST: Join club logic
const postJoin = async (req, res) => {
  const { passcode } = req.body;

  if (passcode === process.env.MEMBER_PASSCODE) {
    try {
      await updateMembershipStatus(req.user.id);
    } catch (err) {
      console.error("Failed to update membership:", err);
    }
  }

  res.redirect("/");
};

// Export all handlers
module.exports = {
  signupForm: getSignUp,
  signup: postSignUp,
  loginForm: getLogin,
  logout,
  joinForm: getJoinPage,
  joinClub: postJoin,
};
