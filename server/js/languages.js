const Submission = require('../js/db/models/Submission');

/**
 * Find all the currently available meta languages in all submissions
 * @return {Promise} returns promise of meta language and total length of submissions
 */
const metaLanguages = () => {
  const availableLanguages = [];
  return new Promise((resolve, reject) => {
      Submission.find({'deleted': false}, (err, submissions) => { // find submissions that have not been archived.
          if(err) {
            console.log('Error occurred finding deleted submissions', err);
            reject(err);
          } 
          return submissions;
        }).then((submissions) => {
            // save currently available languages from unarchived notebooks
            submissions.map((submission) => {
            if(!availableLanguages.includes(submission.lang)) {
              availableLanguages.push(submission.lang);
            }
          })      
          return {availableLanguages: availableLanguages, totalSubmissions: submissions.length};
        }).then((result) => {
            resolve(result);
        });
    })
};

/**
 * Returns promise from metaLanguage 
 * 
 * @param  {Object} submissions all submissions that have not been archieved from database
 * 
 * @return {Promise} returns promise of meta languages and total length of submissions
 */
const resolveLanguagePromise = async (submissions) => {
  const result = await metaLanguages(submissions);
  return result;
};

module.exports = {
  metaLanguages,
  resolveLanguagePromise
};