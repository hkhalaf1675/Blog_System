const savedListServices = require('../services/SavedListServices');

exports.createList = async(req,res) => {
    try {
        await savedListServices.createList(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.savePost = async(req,res) => {
    try {
        await savedListServices.savePost(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.removePost = async(req,res) => {
    try {
        await savedListServices.removePost(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.getListPosts = async(req,res) => {
    try {
        await savedListServices.getListPosts(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}