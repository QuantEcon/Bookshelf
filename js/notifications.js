const notificationTypes = {
    NEW_COMMENT: 'NEW_COMMENT',
    NEW_REPLY: 'NEW_REPLY',
    SUBMISSION: 'SUBMISSION'
    // TODO other notification types here...
}
const config = require("../_config")

const mailgun = require("mailgun-js")({
    apiKey: config.mailgun.apiKey,
    domain: config.mailgun.domain
})


/*
var data = {
    from: 'QuantEcon Bookshelf <postmaster@mg.quantecon.org>',
    to: "trevor.lyon@icloud.com",
    subject: "Test Notification",
    text: "Hello world. This came from QuantEcon's mailgun"
}

mailgun.messages().send(data, (error, body) =>{
    console.log("Error: ", error)
    console.log("Body: " ,body)
    res.send({
        error, body
    })
})
*/

function sendEmail(to, message) {

}

// Queues up notifications to send in a batch email
function addNotifcation(to, notification) {

}

/**
 * 
 * @param {String} to - The email to send the notification
 * @param {Object} notification - Object containing the notification data
 */
function sendNotification(notification) {
    console.log("[SendNotification] - notification: ", notification)
    switch (notification.type) {
        case notificationTypes.NEW_COMMENT:
            data = {
                from: "QuantEcon Bookshelf <postmaster@mg.quantecon.org>",
                to: notification.recipient.email,
                subject: "New Comment On Your Submission",
                // TODO: Include and HTML rendering of the comment here
                text: "There is a new comment on your submission! To view this comment, click here: " +
                    config.hostName + "/submission/" + notification.submissionID + '#commentID=' + notification.comment._id
            }
            mailgun.messages().send(data, (error, body) => {
                if (error) {
                    console.error("[Mailgun] Error occured sending notification: ", error)
                } else {
                    console.log("[Mailgun] Sucess sending notification: ", body)
                }
            })

            break

        case notificationTypes.NEW_REPLY:
            data = {
                from: "QuantEcon Bookshelf <postmaster@mg.quantecon.org>",
                to: notification.recipient.email,
                subject: "New Reply To Your Comment",
                // TODO: Include and HTML rendering of the comment here
                text: "Someone replied to your comment! To view this reply, click here: " +
                    config.hostName + "/submission/" + notification.submissionID + '#commentID=' + notification.commentID
            }
            mailgun.messages().send(data, (error, body) => {
                if (error) {
                    console.error("[Mailgun] Error occured sending notification: ", error)
                } else {
                    console.log("[Mailgun] Success sending notification: ", body)
                }
            })
            break
        case notificationTypes.SUBMISSION:
            data = {
                from: "QuantEcon Bookshelf <postmaster@mg.quantecon.org>",
                to: notification.recipient.email,
                subject: "Successfuly Submitted new Notebook",
                text: "Your notebook submission was successful.\n\n" +
                    "To view your submission click [here](" + config.hostName + "/submission/" + notification.submissionID +
                    ")\n\nThank your for submitting!"

            }
            mailgun.messages().send(data, (error, body) => {
                if (error) {
                    console.error("[Mailgun] Error occured sending notification: ", error)
                } else {
                    console.log("[Mailgun] Success sending notification: ", body)
                }
            })
            break
    }
}

module.exports = {
    sendEmail,
    addNotifcation,
    notificationTypes,
    sendNotification
}