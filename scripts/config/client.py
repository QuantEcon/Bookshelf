# Overwrite ./client/src/_config.js

def write_client_config(default_hostname, default_client_port, default_server_port, default_admins):
    overwrite_client = raw_input("(Y/n) Overwrite ./client/_config.js? [n]: ")
    if overwrite_client == 'Y' or overwrite_client == 'y':
        hostname = raw_input("Enter server hostname [localhost]: ")
        client_port = raw_input ("Enter the client port [3000]: ")
        debug = raw_input("(Y/n) Run in debug mode? [Y]: ")
        server_port = raw_input("Enter server port [8080]: ")
        num_admins = raw_input("Enter the maximum number of admins [5]: ")

        if not hostname:
            hostname = default_hostname
        if not client_port:
            client_port = default_client_port
        if not debug:
            debug = 'true'
        else:
            debug = 'false'
        if not server_port:
            server_port = default_server_port
        if not num_admins:
            num_admins = default_admins

        client_output = """
        const hostname = '%s';
        const port = '%s';
        const debug = %s;
        const serverPort = '%s';
        const max_num_admins = %s;
        module.exports = {
            debug: debug,
            url: 'http://' + hostname,
            urlPlusPort: 'http://' + hostname + ':' + serverPort,
            serverPort,
            max_num_admins,
            port
        };
        """ % (hostname, client_port, debug, server_port, num_admins)
        
        try:
            client_file = open("../client/src/_config.js", 'w')
            client_file.write(client_output)
            print("Writing ./client/src/_config.js..\n")
        except:
            print("Something went wrong when writing to the file")
        finally:
            client_file.close()
