const authServices = require('../services/AuthServices');

exports.registerUser = (req,res) => {
    try {
        authServices.registerUser(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.registerAuthor = (req,res) => {
    try {
        authServices.registerAuthor(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.login = (req,res) => {
    try {
        authServices.login(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.checkUserAuthorization = (req,res,next) => {
    try {
        authServices.checkUserAuthorization(req,res,next);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.checkAuthorAuthorization = (req,res,next) => {
    try {
        authServices.checkAuthorAuthorization(req,res,next);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}