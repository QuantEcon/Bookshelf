import sys
from server import write_server_config
from db import write_db_config
from auth import write_auth_config
from client import write_client_config

## Default values
hostname = "localhost"
server_port = 8080
client_port = 3000
secret = "secret"

admins = '5'
mailgun_key = 'YOUR-MAILGUN-API-KEY-HERE'
mailgun_domain = 'YOUR-MAILGUN-DOMAIN-HERE'

db_url = 'mongodb://127.0.0.1/Bookshelf'

github_clientID= 'YOUR-ID-HERE'
github_secret = 'YOUR-SECRET-HERE'

consumerKey = 'YOUR-KEY-HERE'
consumerSecret = 'YOUR-SECRET-HERE'

google_clientID = 'YOUR-ID-HERE'
google_clientSecret = 'YOUR-SECRET-HERE'

print("Caution! This will overwite the following files:")
print("\t./server/_config.js")
print("\t./server/js/auth/_config.js")
print("\t./server/js/db/_config.js")
print("\t./client/_config.js")
cont = raw_input("(Y/n) Would you like to continue? [n]: ")

write_server_config(hostname, server_port, client_port, secret, admins, mailgun_key, mailgun_domain)
write_db_config(db_url)
write_auth_config(github_clientID, github_secret, consumerKey, consumerSecret, google_clientID, google_clientSecret)
write_client_config(hostname, client_port, server_port, admins)