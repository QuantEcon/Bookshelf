var sm = require('sitemap')
const path = require('path');
var { urlAndPort } = require('./_config');
var Submission = require('./js/db/models/Submission');
var User = require('./js/db/models/User');
// sitemap
const sitemapPath = path.join(__dirname, '/../client/public/sitemap.xml')

let sitemapPromise = async function siteMap() {
    let submissionsUrlObj = [];
    let userUrls = {};
    const submissionPromise = Submission.find({},(err, submissionsList) => {
        if (err) {
            console.log("error getting submission urls for sitemap")
        } else {
            submissionsList.map(function(submission) {
                submissionsUrlObj.push({
                    url: '/submission/'+submission._id,
                    changefreq: 'weekly',
                    priority: 0.9
                })
                submissionsUrlObj.push({
                    url: '/submission/'+submission._id + '/comments',
                    changefreq: 'weekly',
                    priority: 0.8
                })
            })
        }
    })
    const userPromise = User.find({},(err, usersList) => {
        if (err) {
            console.log("error getting user urls for sitemap")
        } else {
            userUrls = usersList.map(function(user) {
                return {
                    url: '/user/'+user._id,
                    changefreq: 'weekly',
                    priority: 0.8
                }
            })
        }
    })

    await submissionPromise;
    await userPromise;
    
    sitemap = sm.createSitemap({
        hostname: urlAndPort,
        cacheTime: 600000,        // 600 sec - cache purge period
        urls: [
            { url: '', priority: 0.9,  changefreq: 'daily' },
            { url: '/about/',  priority: 0.6, changefreq: 'monthly'},
            { url: '/contact/', priority: 0.6, changefreq: 'monthly'},
            ...submissionsUrlObj,
            ...userUrls
        ]
    });
    console.log("sitemap created")
    return sitemap;
}()

module.exports = {
    sitemapPromise,
    sitemapPath 
}
