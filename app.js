const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MongoURL = "mongodb://127.0.0.1:27017/wonderlust";
const Listing = require("./Models/listing.js");
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressErrors.js");
const methodOverride = require("method-override");
const listingRouter = require("./Routes/listing.js");
const reviewRouter = require("./Routes/review.js");
const User = require("./Models/user.js");
const userRouter = require("./Routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const crypto = require("crypto"); // 🔹 Added for token generation

// Middleware
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Database connection
main()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MongoURL);
}

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// Session & Flash Middleware
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Hi, I am the root directory");
});

app.use("/Listings", listingRouter);
app.use("/Listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// 🔹 Forgot Password Route
app.get("/forgot-password", (req, res) => {
  res.render("auth/forgot-password.ejs");
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    req.flash("error", "No account found with that email.");
    return res.redirect("/forgot-password");
  }

  const token = crypto.randomBytes(20).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
  await user.save();

  console.log(`🔗 Reset link: http://localhost:8080/reset-password/${token}`);
  req.flash("success", "Reset link sent! Check your email (console here).");
  res.redirect("/login");
});

// 🔹 Reset Password Routes
app.get("/reset-password/:token", async (req, res) => {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) {
    req.flash("error", "Reset token is invalid or expired.");
    return res.redirect("/forgot-password");
  }

  res.render("auth/reset-password.ejs", { token: req.params.token });
});

app.post("/reset-password/:token", async (req, res) => {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) {
    req.flash("error", "Token is invalid or has expired.");
    return res.redirect("/forgot-password");
  }

  await user.setPassword(req.body.password); // Passport-local-mongoose method
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  req.flash("success", "Password has been reset. Please log in.");
  res.redirect("/login");
});

// Error Handling Middleware
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong" } = err;
  res.status(statusCode).render("listings/Error.ejs", { message, statusCode, body: "" });
});

// Start Server
app.listen(8080, () => console.log("Server listening on port 8080"));
