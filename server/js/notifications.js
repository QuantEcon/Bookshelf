const mustache = require('mustache')
const notificationTypes = {
    NEW_COMMENT: 'NEW_COMMENT',
    NEW_REPLY: 'NEW_REPLY',
    SUBMISSION: 'SUBMISSION',
    INVITE_SENT : 'INVITE_SENT',
    CONTENT_FLAGGED: 'CONTENT_FLAGGED'
    // TODO other notification types here...
}
const config = require("../_config")

const mailgun = require("mailgun-js")({
    apiKey: config.mailgun.apiKey,
    domain: config.mailgun.domain
})

const fs = require("fs")
var template = fs.readFileSync(__dirname + "/../assets/email-template.html").toString();
var inviteBody = fs.readFileSync(__dirname + "/../assets/invite-template.html").toString();

function sendEmail(to, from, message) {

}

function sendInvite(to, from) {
    console.log("[Notifications] - sending invite to ", to)

    const hostName = "https://" + config.hostName + "/signin/"

    data = {
        from: "QuantEcon Notes <postmaster@mg.quantecon.org>",
        to: to,
        subject: from + " Invited you to Join Notes",
        // TODO: Include and HTML rendering of the comment here
        text: from + " sent you an invite to join Notes, \n\n" +
            "To join Notes click [here](" + config.hostName + "/signin/" +
            ")\n\nThank you!",

        html: from + " sent you an invite to join Notes, <br />" +
            "<b>To join Notes click </b>" + "<a href=" + hostName + ">here</a>"
            + "<br />Thank you!",
    }


    mailgun.messages().send(data, (error, body) => {

        if (error) {
            console.error("[Mailgun] Error occured sending notification: ", error)
        } else {
            console.log("[Mailgun] Success sending invite: ", body, hostName)
        }
   })
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
            var output = mustache.render(template, {
                name: notification.recipient.name,
                subject: notification.comment.author.name + " has commented on your submission:",
                details: notification.comment.content,
                url: config.url + "/submission/" + notification.submissionID + '#comments'
            })

            data = {
                from: "QuantEcon Notes <postmaster@mg.quantecon.org>",
                to: notification.recipient.email,
                subject: "New Comment On Your Submission",
                html: output
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
                from: "QuantEcon Notes <postmaster@mg.quantecon.org>",
                to: notification.recipient.email,
                subject: "New Reply To Your Comment",
                // TODO: Include and HTML rendering of the comment here
                html: mustache.render(template, {
                    name: notification.recipient.name,
                    subject: notification.reply.author.name + " replied to your comment: ",
                    details: notification.reply.content,
                    url: config.url + "/submission/" + notification.submissionID + "#comments"
                })
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
                from: "QuantEcon Notes <postmaster@mg.quantecon.org>",
                to: notification.recipient.email,
                subject: "Successfuly Submitted new Notebook",
                html: mustache.render(template, {
                    name: notification.recipient.name,
                    subject: "Your notebook submission was successful!",
                    url: config.url + "/submission/" + notification.submissionID
                })
            }
            mailgun.messages().send(data, (error, body) => {
                if (error) {
                    console.error("[Mailgun] Error occured sending notification: ", error)
                } else {
                    console.log("[Mailgun] Success sending notification: ", body)
                }
            })
            break

        case notificationTypes.INVITE_SENT:
                  data = {
                  from: "QuantEcon Notes <postmaster@mg.quantecon.org>",
                  to: notification.recipient.email,
                  subject: notification.sender + " Invited you to Join Notes",
                  // TODO: Include and HTML rendering of the comment here
                  text: notification.sender + " sent you an invite to join Notes, \n\n" +
                      "To join Notes click [here](" + config.hostName + "/signin/" +
                      ")\n\nThank you!"
              }
              mailgun.messages().send(data, (error, body) => {
                  if (error) {
                      console.error("[Mailgun] Error occured sending notification: ", error)
                  } else {
                      console.log("[Mailgun] Success sending notification: ", body)
                  }
             })
             break
        case notificationTypes.CONTENT_FLAGGED:
             data = {
                 from: "QuantEcon Notes <postmaster@mg.quantecon.org>",
                 to: notification.recipient.email,
                 subject: "Content Flagged on QuantEcon Notes",
                 html: "A " + notification.contentType + " has been flagged as \"" + notification.flaggedReason +
                 "\". Please review this content on the admin page: notes.quantecon.org/admin"
             }

            mailgun.messages().send(data, (error, body) => {
                if (error) {
                    console.error("[Mailgun] Error occured sending notification: ", error)
                } else {
                    console.log("[Mailgun] Success sending notification: ", body)
                }
           })
    }
}

module.exports = {
    sendEmail,
    sendInvite,
    addNotifcation,
    notificationTypes,
    sendNotification
}
