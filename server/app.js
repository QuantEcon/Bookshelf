/**
 * Created by tlyon on 5/18/17.
 * Entry point for server.
 */

// modules
// ==============================================================================
const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const series = require('async/series');
const waterfall = require('async/waterfall');
const path = require('path');
const cors = require('cors');
const compression = require('compression')

// routes
// ==============================================================================
// auth
const fbAuthRoutes = require('./routes/auth/fb');
const githubAuthRoutes = require('./routes/auth/github');
const twitterAuthRoutes = require('./routes/auth/twitter');
const googleAuthRoutes = require('./routes/auth/google');
const editProfileRoutes = require('./routes/edit-profile/edit-profile');
const searchRoutes = require('./routes/search/search');
const submitRoutes = require('./routes/submit/submit');
const upvoteRoutes = require('./routes/vote/upvote');
const downvoteRoutes = require('./routes/vote/downvote');
const validationRoutes = require('./routes/auth/validation');
const signOutRoutes = require('./routes/auth/signOut');
const deleteRoutes = require('./routes/delete');
const inviteRoutes = require('./routes/invite');
const adminRoutes = require("./routes/admin");
const flagRoutes = require("./routes/flag/flag");
const restoreUser = require("./routes/restore/restore");

// =============================================================================
const isAuthenticated = require('./routes/auth/isAuthenticated').isAuthenticated;

// passport modules
const passport = require('passport');
const passportInit = require('./js/auth/init');
const session = require('express-session');

//file uploads
const multiparty = require('connect-multiparty');

//db
const mongoose = require('./js/db/mongoose');
const User = require('./js/db/models/User');
const Submission = require('./js/db/models/Submission');
const Comment = require('./js/db/models/Comment');
const EmailList = require('./js/db/models/EmailList');
const AdminList = require("./js/db/models/AdminList")
const Announcement = require('./js/db/models/Announcement')

// sitemap
const { sitemapPath, sitemapFunction } = require('./js/sitemap')


// config
// ==============================================================================
const port = require('./_config').port;
const secret = require('./_config').secret

const app = express();
app.enable('trust proxy');
app.use(compression())

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '50mb', parameterLimit: 50000}));


/**
 * Enable reverse proxy support in Express. This causes the
 * the "X-Forwarded-Proto" header field to be trusted so its
 * value can be used to determine the protocol. See 
 * http://expressjs.com/api#app-settings for more details.
 * 
 */ 
app.enable('trust proxy');

/**
 *  Add a handler to inspect the req.secure flag This allows us 
 *  to know whether the request was via http or https.
 */ 
 
app.use (function (req, res, next) {
    if (process.env.NODE_ENV === 'production') {
        if (req.secure) {
                // request was via https, so do no special handling
                next();
        } else {
                // request was via http, so redirect to https
                res.redirect('https://' + req.headers.host + req.url);
        }
    } else {
        next();
    }
});


// set location of assets
app.use(express.static(path.join(__dirname, "..", 'client/build')));
app.use(express.static(__dirname + "/public"));

/**
 * @api {get} /api/about Get About Page
 * @apiGroup Information
 * @apiName GetAboutPage
 *
 * @apiDescription Returns the text to display on the About page
 *
 * @apiSuccess (200) {Object} data
 * @apiSuccess (200) {String} data.content Contents of the About page
 *
 * @apiError (500) InternalServerError An occurred reading the About page file
 */
app.get('/api/about', (req, res) => {
    //read file and send

    fs.readFile('./assets/aboutPage.md', 'utf8', (err, aboutContent) => {
        if (err) {
            res.status(500);
            res.send({error: err});
        } else {
            res.send({content: aboutContent})
        }
    });
})

// writing the sitemap generated to an xml file
sitemapFunction().then((resp) => {
    console.log(sitemapPath, "sitemapPath")
    fs.writeFileSync(sitemapPath, resp.toString());
})


app.post('/add-notify-email', (req, res) => {
    EmailList.findOne({
        name: 'emailList'
    }, (err, list) => {
        if (err) {
            res.status(500);
            res.send({error: err});
        } else if (list) {
            list
                .emails
                .push(req.body.email);
            list.save((err) => {
                if (err) {
                    res.status(500);
                    res.send({error: err});
                } else {
                    res.sendStatus(200);
                }
            })
        } else {
            var emailList = new EmailList();
            emailList.name = 'emailList'
            emailList.emails = [req.body.email];
            emailList.save((err) => {
                if (err) {
                    res.status(500);
                    res.send({error: err});
                } else {
                    res.sendStatus(200);
                }
            })
        }
    })
})

app.use(function (req, res, next) {
    console.log('----------------------------------------------------------------\n')
    console.log("Looking for URL : " + req.url);
    console.log('\tmethod: ', req.method);
    console.log('\tbody: ', req.body);
    console.log('\tauthorization: ', req.headers['authorization']);
    console.log('\n');

    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization Access-Control-All" +
            "ow-Credentials, Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Request-Headers', 'access-token,authorization,if-modified-since,uid');
    next();
});

app.use(session({secret: secret, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
passportInit();

// ROUTES
// ==============================================================================
app.use('/api/admin', adminRoutes);
app.use("/api/search", searchRoutes);
app.use('/api/delete', deleteRoutes);
app.use('/api/invite', inviteRoutes);

// login
// app.use('/api/auth/fb', fbAuthRoutes);
app.use('/api/auth/github', githubAuthRoutes);
app.use('/api/auth/google', googleAuthRoutes);
app.use('/api/auth/twitter', twitterAuthRoutes);
app.use('/api/auth/validate-token', validationRoutes);
app.use('/api/edit-profile', editProfileRoutes)
app.use('/api/auth/sign-out', signOutRoutes)
app.get('/api/auth/popup/:provider', (req, res) => {
    res.sendFile('./views/partials/popup.html', {
        root: __dirname
    }, (err) => {
        if (err) {
            console.log('React app not found');
            res.status(500);
            res.send('React app not found')
        } else {
            console.log('Sent');
        }
    });
});
//submit
app.use('/api/submit', submitRoutes);

// restore 
app.use('/api/restore', restoreUser)

//vote
app.use('/api/upvote', upvoteRoutes);
app.use('/api/downvote', downvoteRoutes);
app.use('/api/flag', flagRoutes)

app.get('/api/announcements', (req, res) => {
    Announcement.find({}, (err, announcements) => {
        if(err){
            console.log('[GETAnncouncements] - error occurred fetching announcements - ', err)
            res.send(500)
        } else {
            res.send(announcements)
        }
    })
})

app.post('/api/announcements/delete', (req, res) => {
    Announcement.deleteOne({recent: true}, (err) => {
        if(err){
            console.log('[GETAnncouncements] - error occurred deleting recent - ', err)
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
})

app.get('/api/announcements/recent' , (req, res) => {
    Announcement.findOne({recent: true}, (err, announcement) => {
        if(err){
            console.error("[Announcement-Add] - error finding recent announcement: ", err)
            res.sendStatus(500)
        } else if(announcement) {
            console.log("announcement: ", announcement)
            res.send(announcement)
        } else {
            res.sendStatus(404)
        }
    })
})

app.post('/api/announcements/add', passport.authenticate('adminjwt', {
    session: 'false'
}), (req, res) => {
    var newAnnouncement = Announcement()

    newAnnouncement.content = req.body.content
    newAnnouncement.date = Date.now()
    newAnnouncement.postedBy = req.user._id

    newAnnouncement.save((err, savedAnnouncement) => {
        if(err){
            console.error("[Announcement-Add] - error saving new announcement: ", err)
        } else {
            res.send(savedAnnouncement)
        }
    })
})

app.post('/api/announcements/change', passport.authenticate('adminjwt', {
    session: false
}), (req, res) => {
    Announcement.findOne({recent: true}, (err, announcement) => {
        if(err){
            console.error("[Announcement-Add] - error finding recent announcement: ", err)
        } else {
            if(announcement){
                announcement.content = req.body.content
                announcement.date = Date.now()
                announcement.postedBy = req.user._id

                announcement.save((err, savedAnnouncement) => {
                    if(err){
                        console.error("[Announcement-Add] - error saving recent announcement: ", err)
                    } else {
                        res.send(savedAnnouncement)
                    }
                })
            } else {
                var newAnnouncement = Announcement()

                newAnnouncement.content = req.body.content
                newAnnouncement.date = Date.now()
                newAnnouncement.postedBy = req.user._id
                newAnnouncement.recent = true
                newAnnouncement.save((err, savedAnnouncement) => {
                    if(err){
                        console.error("[Announcement-Add] - error saving recent announcement: ", err)
                    } else {
                        res.send(savedAnnouncement)
                    }
                })
            }
        }
    })
})

app.get("/temp", (req, res) => {
    res.send("Loading...")
})

app.get('*', (req, res) => {
    console.log('Sending react app' + req.url)
    try {
       res.sendFile(path.join(__dirname, '/../client/build/index.html'))
    } catch (ex) {
        //TODO send back html page with this info
        res.send("Server is down for maintenance")
    }
});
// =============================================================================
// start server
app.listen(port, function () {
    console.log("Server listening on port %d", port);
});
