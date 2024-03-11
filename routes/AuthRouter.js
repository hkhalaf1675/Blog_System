const router = require('express').Router();

const {registerUser, registerAuthor, login, checkAuthorAuthorization, checkUserAuthorization} = require('../controllers/AuthController');

router.post('/api/auth/register-user', registerUser);
router.post('/api/auth/register-author', registerAuthor);
router.post('/api/auth/login', login);

router.get('/api/user-authorize-test',checkUserAuthorization,(req,res) => {
    res.status(200).send('done from user authorization');
});
router.get('/api/author-authorize-test',checkAuthorAuthorization,(req,res) => {
    res.status(200).send('done from author authorization ');
});

module.exports = router;