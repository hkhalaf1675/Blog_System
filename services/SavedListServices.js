const { Op } = require('sequelize');
const db = require('../models/main');
const SavedPostsList = require('../models/SavedPostsList');

exports.createList = async(req,res) => {
    try {
        const {name} = req.body;
        if(!name){
            res.status(400).send({message: 'list name is required'});
        }
        else{
            const userId = req.userId;
            if(!userId){
                res.status(401).send({message: 'Unauthorized User!'});
            }
            else{
                const oldList = await db.SavedPostsList.findOne({
                    where: {
                        name: name
                    }
                });

                if(!oldList){
                    const newList = await db.SavedPostsList.create({name: name,UserId: userId});
                    res.status(201).json(newList);
                }
                else{
                    if(oldList.UserId = userId){
                        res.status(400).send({message: `there is list with same name with ID: ${oldList.id}`});
                    }
                    else{
                        const newList = await db.SavedPostsList.create({name: name,UserId: userId});
                        res.status(201).json(newList);
                    }
                }
            }
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.savePost = async(req,res) => {
    try {
        const {postId, listId} = req.body;
        if(!postId || !listId){
            res.status(400).send({message: 'post id and list id are required'});
        }
        else{
            const userId = req.userId;
            if(!userId){
                res.status(401).send({message: 'Unauthorized user!'});
            }
            else{
                const list = await db.SavedPostsList.findByPk(listId);
                if(!list){
                    res.status(400).send({message: 'there is no lists with that id'});
                }
                else{
                    if(userId == list.UserId){
                        const post = await db.Post.findByPk(postId);
                        if(!post){
                            res.status(400).send({message: 'there is no post that id'});
                        }
                        else{
                            // check if the post already exists on that list or not
                            const listPost = await db.ListPosts.findOne({
                                where: {
                                    [Op.and]: [
                                        {PostId: postId},
                                        {SavedPostsListId: listId}
                                    ]
                                }
                            });

                            if(!listPost){
                                const newListPost = await db.ListPosts.create({
                                    PostId: postId,
                                    SavedPostsListId: listId
                                });

                                res.status(201).json(newListPost);
                            }
                            else{
                                res.status(400).send({message: 'that post already exists on this list'});
                            }
                        }
                    }
                    else{
                        res.status(401).send({message: 'Unauthorized user!!'});
                    }
                }
            }
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.removePost = async(req,res) => {
    try {
        const {postId, listId} = req.body;
        if(!postId || !listId){
            res.status(400).send({message: 'post id and list id are required'});
        }
        else{
            const userId = req.userId;
            if(!userId){
                res.status(401).send({message: 'Unauthorized user!'});
            }
            else{
                const list = await db.SavedPostsList.findByPk(listId);
                if(!list){
                    res.status(400).send({message: 'there is no lists with that id'});
                }
                else{
                    if(userId == list.UserId){
                        const post = await db.Post.findByPk(postId);
                        if(!post){
                            res.status(400).send({message: 'there is no post that id'});
                        }
                        else{
                            // check if the post already exists on that list or not
                            const listPost = await db.ListPosts.findOne({
                                where: {
                                    [Op.and]: [
                                        {PostId: postId},
                                        {SavedPostsListId: listId}
                                    ]
                                }
                            });

                            if(!listPost){
                                res.status(400).send({message: 'that post does not exists on this list'});
                            }
                            else{
                                await db.ListPosts.destroy({
                                    where: {
                                        id: listPost.id
                                    }
                                });

                                res.status(200).send({message: 'post removed from list successfully'});
                            }
                        }
                    }
                    else{
                        res.status(401).send({message: 'Unauthorized user!!'});
                    }
                }
            }
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.getListPosts = async(req,res) => {
    try {
        const { listId} = req.body;
        if(!listId){
            res.status(400).send({message: 'list id is required'});
        }
        else{
            const userId = req.userId;
            if(!userId){
                res.status(401).send({message: 'Unauthorized user!'});
            }
            else{
                const list = await db.SavedPostsList.findByPk(listId);
                if(!list){
                    res.status(400).send({message: 'there is no lists with that id'});
                }
                else{
                    if(userId == list.UserId){
                        const listPosts = await db.ListPosts.findAll({
                            where: {
                                SavedPostsListId: listId
                            },
                            include: db.Post
                        });

                        res.status(200).json(listPosts);
                    }
                    else{
                        res.status(401).send({message: 'Unauthorized user!!'});
                    }
                }
            }
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}