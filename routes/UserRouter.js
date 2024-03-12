const router = require('express').Router();

const { createList, savePost, removePost, getListPosts } = require('../controllers/SavedListController');
const { checkUserAuthorization } = require('../controllers/AuthController');
const { getPublishedPosts } = require('../controllers/PostController');

router.post('/api/savedLists/create',checkUserAuthorization,createList);
router.post('/api/savedLists/save-post',checkUserAuthorization,savePost);
router.delete('/api/savedLists/remove-post',checkUserAuthorization,removePost);
router.get('/api/savedLists/get-posts',checkUserAuthorization,getListPosts);
router.get('/api/posts/time-line',checkUserAuthorization,getPublishedPosts);

module.exports = router;