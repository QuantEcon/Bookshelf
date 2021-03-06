var sm = require('sitemap')
const path = require('path');
var { url } = require('../_config');
var Submission = require('./db/models/Submission');
var User = require('./db/models/User');
// sitemap
const sitemapPath = path.join(__dirname, '/../../client/build/sitemap.xml')

let sitemapFunction = async function siteMap() {
    let submissionsUrls = [];
    let userUrls = [];
    const submissionPromise = Submission.find({},(err, submissionsList) => {
        if (err) {
            console.log("error getting submission urls for sitemap")
        } else {
            submissionsList.map(function(submission) {
                if (!submission.deleted) {
                    submissionsUrls.push({
                        url: '/submission/'+submission._id,
                        changefreq: 'weekly',
                        priority: 0.9
                    })
                    submissionsUrls.push({
                        url: '/submission/'+submission._id + '/comments',
                        changefreq: 'weekly',
                        priority: 0.8
                    })
                }
            })
        }
    })
    const userPromise = User.find({},(err, usersList) => {
        if (err) {
            console.log("error getting user urls for sitemap")
        } else {
            usersList.map(function(user) {
                if (!user.deleted) {
                    userUrls.push({
                        url: '/user/'+user._id,
                        changefreq: 'weekly',
                        priority: 0.8
                    })
                }
            })
        }
    })
    await submissionPromise;
    await userPromise;
    sitemap = sm.createSitemap({
        hostname: url,
        cacheTime: 600000,        // 600 sec - cache purge period
        urls: [
            { url: '', priority: 0.9,  changefreq: 'daily' },
            { url: '/about/',  priority: 0.6, changefreq: 'monthly'},
            { url: '/contact/', priority: 0.6, changefreq: 'monthly'},
            ...submissionsUrls,
            ...userUrls
        ]
    });
    return sitemap;
}

module.exports = {
    sitemapFunction,
    sitemapPath 
}
