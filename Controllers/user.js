const User=require("../Models/user.js");

module.exports.signup=(req, res) => {
    res.render("users/signup.ejs");
}

module.exports.Post_signup=async (req, res, next) => {
    try {
        let { username, email, password } = req.body.user;
        let newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to WonderLust! Your account has been created successfully.");
            return res.redirect("/Listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/signup");
    }
}

module.exports.Login=(req, res) => {
    res.render("users/login.ejs");
}

module.exports.Post_Login=(req, res) => {
    const redirectUrl = req.session.redirectUrl || "/Listings";
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
}

module.exports.Get_Logout=(req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You have been logged out!");
        res.redirect("/Listings");
    });
}