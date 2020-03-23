# Overwrite ./server/js/auth/_config.js

def write_auth_config(default_github_clientID, default_github_secret, default_consumerKey, default_consumerSecret, default_google_clientID, default_google_clientSecret):
  overwrite_auth = raw_input("(Y/n) Overwrite ./server/js/auth/_config.js? [n]: ")
  if overwrite_auth == 'y' or overwrite_auth == 'Y':
    # Setup github
    github_clientID = raw_input("Enter Github OAuth clientID: ")
    github_secret = raw_input("Enter Github OAuth secret: ")
    
    # Setup twitter
    twitter_key = raw_input("Enter Twitter OAuth consumer key: ")
    twitter_secret = raw_input("Enter Twitter OAuth consumer secret: ")

    # Setup Google
    google_id = raw_input("Enter Google OAuth client ID: ")
    google_secret = raw_input("Enter Google OAuth client secret: ")

    if not github_clientID:
      github_clientID = default_github_clientID
    if not github_secret:
      github_secret = default_github_secret
    if not twitter_key:
      twitter_key = default_consumerKey
    if not twitter_secret:
      twitter_secret = default_consumerSecret
    if not google_id:
      google_id = default_google_clientID
    if not google_secret:
      google_secret = default_google_clientSecret

    auth_output = """
    var appConfig = require('../../_config');

    var ids = {
        github: {
            clientID: '%s',
            clientSecret: '%s',
            callbackURL: "https://notes.quantecon.org:443" + '/api/auth/github/callback',
            addCallbackURL: appConfig.urlAndPort + '/api/auth/github/callback/add'
        },
        twitter: {
            consumerKey: '%s',
            consumerSecret: '%s',
            callbackURL: appConfig.urlAndPort + '/api/auth/twitter/callback',
            addCallbackURL: appConfig.urlAndPort + '/api/auth/twitter/callback/add'

        },
        google: {
            clientID: '%s',
            clientSecret: '%s',
            callbackURL: appConfig.urlAndPort + '/api/auth/google/callback',
            addCallbackURL: appConfig.urlAndPort + '/api/auth/google/callback/add'
        },
    };

    module.exports = ids;

    """ % (github_clientID, github_secret, twitter_key, twitter_secret, google_id, google_secret)

    try:
      auth_file = open ("../server/js/auth/_config.js", 'w')
      auth_file.write(auth_output)
      print("Writing ./server/js/auth/_config.js...\n")
    except:
        print("Something went wrong when writing to the file")
    finally:
        auth_file.close()