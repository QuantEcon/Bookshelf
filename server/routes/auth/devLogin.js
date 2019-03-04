const passport = require('../../js/auth/dev');

app.post('/', passport.authenticate('dev', {
    session: 'true'
}), (req, res) => {
    console.log('authenticated')
})