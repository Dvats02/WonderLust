const router = require('express').Router();
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', failureFlash: true }),
  (req, res) => {
    const redirectTo = req.session.returnTo || '/listings';
    delete req.session.returnTo;
    res.redirect(redirectTo);
  }
);

router.post('/logout', (req, res, next) => {
  req.logout(err => err ? next(err) : res.redirect('/'));
});

module.exports = router;
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; 