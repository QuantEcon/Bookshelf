var sm = require('sitemap')
var { urlAndPort } = require('./_config');
var Submission = require('./js/db/models/Submission');

module.exports = async function siteMap() {
    let submissionUrls = {};
    const submissionPromise = Submission.find({},(err, submissionsList) => {
        submissionUrls = submissionsList.map(function(submission) {
            return {
                url: '/submission/'+submission._id,
                changefreq: 'weekly',
                priority: 0.9
            }
        })
    })

    await submissionPromise;
    sitemap = sm.createSitemap({
        hostname: urlAndPort,
        cacheTime: 600000,        // 600 sec - cache purge period
        urls: [
            { url: '',  changefreq: 'daily' },
            { url: '/about/',  changefreq: 'monthly'},
            { url: '/contact/'},
            ...submissionUrls
        ]
    });
    return sitemap;
}()
