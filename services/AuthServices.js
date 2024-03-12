require('dotenv').config();
const { Op } = require('sequelize');
const db = require('../models/main');
const jwt = require('jsonwebtoken');

const createJwtToken = (userId,role) => {
    return jwt.sign(
            {
                userId: userId,
                role: role
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn: process.env.JWT_EXPIRATION_TIME}
        );
}

// check author authorization
exports.checkAuthorAuthorization = async(req,res,next) => {
    try {
        if(req.headers.authorization){
            if(req.headers.authorization.startsWith('Bearer')){
                const token = req.headers.authorization.split(' ')[1];
                if(token){
                    // check if the token is valid or not
                    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

                    // get the user by userId
                    const user = await db.User.findByPk(decoded.userId);
                    
                    if(user === null){
                        res.status(401).send({message: '1 - Authentication credentials are missing or invalid'});
                    }
                    else{
                        if(user.isAuthor == true){
                            req.authorId = user.id;
                            console.log(req.authorId);
                            next();
                        }
                        else{
                            res.status(401).send({message: 'Unauthorized User'})
                        }
                    }
                }
                else{
                    res.status(401).send({message: '2 - Authentication credentials are missing or invalid'});
                }
            }
            else{
                res.status(401).send({message: '3 - Authentication credentials are missing or invalid'});
            }
        }
        else{
            res.status(401).send({message: '4 - Authentication credentials are missing or invalid'});
        }
    } catch (error) {
        res.status(401).send({message: '5 - Authentication credentials are missing or invalid'});
    }
}

// check user authorization
exports.checkUserAuthorization = async(req,res,next) => {
    try {
        if(req.headers.authorization){
            if(req.headers.authorization.startsWith('Bearer')){
                const token = req.headers.authorization.split(' ')[1];
                if(token){
                    // check if the token is valid or not
                    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

                    // get the user by userId
                    const user = await db.User.findByPk(decoded.userId);
                    
                    if(user === null){
                        res.status(401).send({message: '1 - Authentication credentials are missing or invalid'});
                    }
                    else{
                        req.userId = user.id;
                        next();
                    }
                }
                else{
                    res.status(401).send({message: '2 - Authentication credentials are missing or invalid'});
                }
            }
            else{
                res.status(401).send({message: '3 - Authentication credentials are missing or invalid'});
            }
        }
        else{
            res.status(401).send({message: '4 - Authentication credentials are missing or invalid'});
        }
    } catch (error) {
        res.status(401).send({message: '5 - Authentication credentials are missing or invalid'});
    }
}

// create new user
exports.registerUser = async(req,res) => {
    try {
        const {userName, email, password} = req.body;
        if(!userName || !email || !password){
            res.status(400).send({message: 'username, email, and password are required data'});
        }
        else{
            const oldUsers = await db.User.findAll({
                where: {
                    [Op.or]: [
                        {userName: userName},
                        {email: email}
                    ]
                }
            });

            if(oldUsers.length > 0){
                res.status(400).send({message: 'the username or email is already exists'});
            }
            else{
                const {userName,email,password} = req.body;
                isAuthor = 0;
                const newUser = await db.User.create({userName,email,password,isAuthor});

                const token = createJwtToken(newUser.id,'User');

                res.status(201).json({token: token});
            }
        }
        
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

// create new author
exports.registerAuthor = async(req,res) => {
    try {
        const {userName, email, password} = req.body;
        if(!userName || !email || !password){
            res.status(400).send({message: 'username, email, and password are required data'});
        }
        else{
            const oldUsers = await db.User.findAll({
                where: {
                    [Op.or]: [
                        {userName: userName},
                        {email: email}
                    ]
                }
            });

            if(oldUsers.length > 0){
                res.status(400).send({message: 'the username or email is already exists'});
            }
            else{
                const {userName,email,password} = req.body;
                isAuthor = 1;
                const newUser = await db.User.create({userName,email,password,isAuthor});

                const token = createJwtToken(newUser.id,'Author');

                res.status(201).json({token: token});
            }
        }
        
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

// login for both user and author
exports.login = async(req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).send({message: 'enter the email and password'});
        }
        else{
            const user = await db.User.findOne({where: {
                [Op.and]: [
                    {email: email},
                    {password: password}
                ]
            }});

            if(!user){
                res.status(404).send({message: 'the email or password is not correct'});
            }
            else{
                const role = (user.isAuthor == true)?'Author':'User';
                const token = createJwtToken(user.id,role);

                res.status(200).json({token: token});
            }
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}