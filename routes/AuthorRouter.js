const router = require('express').Router();
const {} = require('./AuthRouter');

const { createDraftPost, publishNewPost, publishDraftPost, unpublishPost, deletePost, editPost, getAuthorPosts } = require('../controllers/PostController');
const { checkAuthorAuthorization } = require('../controllers/AuthController');

router.post('/api/posts/create-draft',checkAuthorAuthorization,createDraftPost);
router.post('/api/posts/publish',checkAuthorAuthorization,publishNewPost);
router.put('/api/posts/publish',checkAuthorAuthorization,publishDraftPost);
router.put('/api/posts/unpublish',checkAuthorAuthorization,unpublishPost);
router.put('/api/posts/edit',checkAuthorAuthorization,editPost);
router.delete('/api/posts/delete',checkAuthorAuthorization,deletePost);
router.get('/api/posts/get-posts',checkAuthorAuthorization,getAuthorPosts);

module.exports = router;