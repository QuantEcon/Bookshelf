var express = require('express');

module.exports = function(app, passport) {
    console.log('this is the first one')
    app.use(function (req, res, next) {
        console.log('[DevLogin] - req.url:', req.url)
        console.log('[DevLogin] - req.method:', req.url)
        console.log('[DevLogin] - req.body:', req.body);
        console.log('[DevLogin] - authorization: ', req.headers['authorization']);
        next();
    })

    app.post('/', passport.authenticate('local',{
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : false // allow flash messages
	}), (req, res) => {
        console.log('authenticated')
        res.status(200)
    })
    return app;
}