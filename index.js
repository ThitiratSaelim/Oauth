const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
var cookieSession = require('cookie-session')
const passport = require('passport')
require('./passport-setup');
app.use(cors())


app.use(bodyParser.urlencoded({ extended : false}))

app.use(bodyParser.json())
app.use(cookieSession({
    name: 'Oauth-session',
    keys: ['key1', 'key2']
  }))

const isLoggedIn = (req,res,next) => {
    if(req.user) {
        next();
    }
    else {
        res.sendStatus(401);
    }
  }

app.use(passport.initialize());
  app.use(passport.session());

app.get('/home' , (req ,res) => { res.send(`Logout Success! <html><body><span class='text-container'>
<button onclick="location.href='http://127.0.0.1:8000/'">OK</button>
</span></html>`)

})

app.get('/failed' , (req ,res) => res.send('Failed to login'))
app.get('/good' , (req ,res) => res.send(`welcome ${req.user.name.givenName } <br /> ID : ${req.user.id}
<br /> FirstName :  ${req.user.name.givenName} <br /> LastName :  ${req.user.name.familyName}  <br /> Email : ${req.user.emails[0].value}  <br /> Sign-in With : ${req.user.provider}!<br />
<html><body><span class='text-container'>
<button onclick="location.href='http://localhost:8000/logout'">logout</button>
</span></html>`))
app.get('/google', passport.authenticate('google', { scope: ['profile' ,'email'] }));

app.get('/google/callback',  passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  });

app.get('/logout' ,(req,res) => {
    req.session = null ;
    req.logout() ;
    res.redirect('/home');
})
app.listen(8000)