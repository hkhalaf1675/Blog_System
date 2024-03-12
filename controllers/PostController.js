const postServices = require('../services/PostServices');

exports.createDraftPost = (req,res) => {
    try {
        postServices.createDraftPost(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.publishNewPost = (req,res) => {
    try {
        postServices.publishNewPost(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.publishDraftPost = (req,res) => {
    try {
        postServices.publishDraftPost(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.unpublishPost = (req,res) => {
    try {
        postServices.unpublishPost(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.deletePost = (req,res) => {
    try {
        postServices.deletePost(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.editPost = (req,res) => {
    try {
        postServices.editPost(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.getAuthorPosts = (req,res) => {
    try {
        postServices.getAuthorPosts(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.getPublishedPosts = (req,res) => {
    try {
        postServices.getPublishedPosts(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}
