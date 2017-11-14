var notifcationTypes = {
    NEW_COMMENT: 'NEW_COMMENT',
    NEW_REPLY: 'NEW_REPLY',
    // TODO other notification types here...
}


function sendEmail(to, message){
    
}

function addNotifcation(to, message){

}

function sendNotification(to, notification){
    switch(notification.type){
        case notifcationTypes.NEW_COMMENT:
            //TODO build notification and send to email
            break

        case notifcationTypes.NEW_REPLY:
            //TODO build notification and send to email
            break
    }
}

module.exports = [sendEmail, addNotifcation, notificationTypes]