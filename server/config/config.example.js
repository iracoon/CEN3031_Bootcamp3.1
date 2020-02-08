//This file holds any configuration variables we may need 
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there


//I am just checking with this statement that git is working as it should!
export default {
  db: {
    uri: ''//place the URI of your mongo database here.
  }, 
  openCage: {
    key: '' //place your openCage public key here - Sign-up for a free key https://opencagedata.com/
  },
  port: 5000
};