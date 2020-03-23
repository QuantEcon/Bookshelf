# Overwrite ./server/js/db/_config.js

def write_db_config(default_db_url): 
  overwrite_db = raw_input("(Y/n) Overwrite ./server/js/db/_config.js? [n]: ")
  if overwrite_db == 'Y' or overwrite_db == 'y':
    url = raw_input("Enter MongoDB url [mongodb://localhost/Bookshelf]: ")

    if url == 'localhost':
        url = "127.0.0.1"
    elif not url:
        url = default_db_url

    db_file = open("../server/js/db/_config.js", 'w')

    db_output = """
    module.exports = {
        url: '%s'
    };

    """ % url

    try: 
      db_file.write(db_output)
      print("Writing ./server/js/db/_config.js...\n")
    except: 
      print("Something went wrong when writing to the file")
    finally:
      db_file.close()
