# Rewrite ./server/_config/js

def write_server_config(default_hostname, default_server_port, default_client_port, default_secret, default_admins, default_mailgun_key, default_mailgun_domain):
	# Rewrite ./server/_config/js
    overwite_server = raw_input("(Y/n) Overwrite ./server/_config.js? [n]: ")
    if overwite_server == 'Y' or overwite_server == 'y':
      hostname = raw_input("Enter the server hostname [localhost]: ")
      server_port = raw_input("Enter the server port [8080]: ")
      client_port = raw_input("Enter the client port [3000]: ")
      secret = raw_input("Enter the session secret: [secret]: ")
      debug = raw_input("(Y/n) Run in debug mode? [n]: ")
      mailgun_key = raw_input("Enter the mailgun api key: ")
      mailgun_domain = raw_input("Enter the mailgun domain: ")
      max_num_admins = raw_input("Enter the maximum number of admins [5]: ")

      if not hostname:
         hostname = default_hostname
      if not server_port:
         server_port = default_server_port
      if not client_port:
         client_port = default_client_port
      if not secret:
         secret = default_secret
      if not max_num_admins:
         max_num_admins = default_admins
      if not mailgun_key:
         mailgun_key = default_mailgun_key
      if not mailgun_domain:
         mailgun_domain = default_mailgun_domain
      if debug == 'y' or debug == 'Y':
         debug = "true"
      else:
         debug = "false"

      server_output = """
      const hostname = '%s';
      const port = '%s';
      const clientPort = '%s';
      const secret = '%s'
      const debug = %s;
      var clientHostNameAndPort
      var clientHostName
      var redirectURL
      const mailgun = {
         apiKey: '%s',
         domain: '%s'
      }
      if(debug){
         clientHostName = "http://localhost"
         clientHostNameAndPort = clientHostName + clientPort
         redirectURL = "http://localhost:" + clientPort + "/temp"            
      } else {
         clientHostName = hostname
         clientHostNameAndPort = clientHostName + clientPort
         if(hostname == 'localhost'){
               redirectURL = "http://localhost:" + port + "/temp"
         } else {
               redirectURL = "http://" + hostname + "/temp"            
         }
      }
      module.exports = {
         debug: debug,
         port: port,
         hostName: hostname,
         url: 'http://' + hostname,
         urlAndPort: 'http://' + hostname + ':' + port,
         clientPort: clientPort,
         clientHostNameAndPort: clientHostNameAndPort,
         redirectURL: redirectURL,
         preRender: false,
         filesDirectory: "/files",
         rootDirectory: __dirname,
         secret: secret,
         mailgun: mailgun
      };
         """ % (hostname, server_port, client_port, secret, debug, mailgun_key, mailgun_domain)
      try:
         server_config_file = open('../server/_config.js', 'w')
         server_config_file.write(server_output)
         print("Writing ./server/_config.js...\n")
      except:
		   print("Something went wrong when writing to the file")
      finally:
         server_config_file.close()