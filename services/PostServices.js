const db = require('../models/main');

exports.createDraftPost = async(req,res) => {
    try {
        const {title,content,summary,coverImageUrl,categories} = req.body;
        if(!title || !content || !summary || !categories){
            res.status(400).send({message: 'post title, content, categories, and summary are required'});
        }
        else{
            const authorId = req.authorId;
            if(!authorId){
                res.status(401).send({message: 'unauthorized author'});
            }
            else{
                const postStatus = 'draft';
                const newPost = await db.Post.create({title,content,summary,coverImageUrl,postStatus,UserId: authorId});
                
                // newPost.addCategories(categories);

                if(categories && categories.length > 0){
                    for(const category of categories){
                        let categoryId;
                        
                        const existingCategory = await db.Category.findOne({
                            where: {
                                categName: category
                            }
                        });

                        if(existingCategory){
                            categoryId = existingCategory.id;
                        }
                        else{
                            const newCategory = await db.Category.create({categName: category});
                            categoryId = newCategory.id;
                        }

                        newPost.addCategory(categoryId);
                    }
                }

                res.status(201).json(newPost);
            }
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.publishNewPost = async(req,res) => {
    try {
        const {title,content,summary,coverImageUrl, categories} = req.body;
        if(!title || !content || !summary || !categories){
            res.status(400).send({message: 'post title, content, categories, and summary are required'});
        }
        else{
            const authorId = req.authorId;
            if(!authorId){
                res.status(401).send({message: 'unauthorized author'});
            }
            else{
                const postStatus = 'published';
                const newPost = await db.Post.create({title,content,summary,coverImageUrl,postStatus,UserId: authorId});

                if(categories && categories.length > 0){
                    for(const category of categories){
                        let categoryId;
                        
                        const existingCategory = await db.Category.findOne({
                            where: {
                                categName: category
                            }
                        });

                        if(existingCategory){
                            categoryId = existingCategory.id;
                        }
                        else{
                            const newCategory = await db.Category.create({categName: category});
                            categoryId = newCategory.id;
                        }

                        newPost.addCategory(categoryId);
                    }
                }

                res.status(201).json(newPost);
            }
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.publishDraftPost = async(req,res) => {
    try {
        const {postId} = req.body;
        if(!postId){
            res.status(400).send({message: 'post id is required'});
        }
        else{
            const authorId = req.authorId;
            if(!authorId){
                res.status(401).send({message: 'unauthorized author'});
            }
            else{
                const post = await db.Post.findByPk(postId);
                if(!post){
                    res.status(400).send({message: 'there is no posts with that id'});
                }
                else{
                    const authorId = req.authorId;
                    if(post.UserId == authorId){
                        await db.Post.update({postStatus: 'published'},{
                            where: {
                                id:postId
                            }
                        });
    
                        res.status(200).send({message: 'post published successfully'});
                    }
                    else{
                        res.status(401).send({message: 'unauthorized author'});
                    }
                }
            }
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.unpublishPost = async(req,res) => {
    try {
        const {postId} = req.body;
        if(!postId){
            res.status(400).send({message: 'post id is required'});
        }
        else{
            const authorId = req.authorId;
            if(!authorId){
                res.status(401).send({message: 'unauthorized author'});
            }
            else{
                const post = await db.Post.findByPk(postId);
                if(!post){
                    res.status(400).send({message: 'there is no posts with that id'});
                }
                else{
                    if(post.postStatus === 'published'){
                        
                        const authorId = req.authorId;
                        if(post.UserId == authorId){
                            await db.Post.update({postStatus: 'unpublished'},{
                                where: {
                                    id:postId
                                }
                            });
        
                            res.status(200).send({message: 'post unpublished successfully'});
                        }
                        else{
                            res.status(401).send({message: 'unauthorized author'});
                        }
                    }
                    else{
                        res.status(400).send({message: 'That Post is not published'})
                    }
                }
            }
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.deletePost = async(req,res) => {
    try {
        const {postId} = req.body;
        if(!postId){
            res.status(400).send({message: 'post id is required'});
        }
        else{
            const post = await db.Post.findByPk(postId);
            if(!post){
                res.status(400).send({message: 'there is no post with that id'});
            }
            else{
                const authorId = req.authorId;
                if(post.UserId == authorId){
                    await db.Post.destroy({
                        where: {
                            id: postId
                        }
                    });

                    res.status(200).send({message: 'post deleted successfully'});
                }
                else{
                    res.status(401).send({message: 'unauthorized author'});
                }
            }
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.editPost = async(req,res) => {
    try {
        const {postId, title, content, summary, coverImageUrl} = req.body;
        if(!postId){
            res.status(400).send({message: 'post id is required'});
        }
        else{
            const oldPost = await db.Post.findByPk(postId);
            if(!oldPost){
                res.status(404).send({message: 'there is no post with that id'});
            }
            else{
                const authorId = req.authorId;
                if(!authorId){
                    res.status(401).send({message: 'Unauthorized User'});
                }
                else{
                    if(oldPost.UserId == authorId){
                        const newTitle = (!title) ? oldPost.title : title;
                        const newContent = (!content) ? oldPost.content : content;
                        const newSummary = (!summary) ? oldPost.summary : summary;
                        const newCoverImageUrl = (!coverImageUrl) ? oldPost.coverImageUrl : coverImageUrl;

                        await db.Post.update({
                            title: newTitle,
                            summary: newSummary,
                            content: newContent,
                            coverImageUrl: newCoverImageUrl
                        }, {
                            where: {
                                id: postId
                            }
                        });

                        res.status(200).send({message: 'post updated successfully'});
                    }
                    else{
                        res.status(401).send({message: 'unauthorized author'});
                    }
                }
            }
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.getAuthorPosts = async(req,res) => {
    try {
        const {pageNumber} = req.body;
        if(!pageNumber){
            res.status(400).send({message: 'page number is required'});
        }
        else{
            const authorId = req.authorId;
            if(!authorId){
                res.status(401).send({message: 'UnAuthorized Author !'});
            }
            else{
                const offset = 5 * (pageNumber - 1);
                const posts = await db.Post.findAll({
                    where: {
                        UserId: authorId
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    offset: offset,
                    limit: 5
                });

                res.status(200).json(posts);
            }
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.getPublishedPosts = async(req,res) => {
    try {
        const {pageNumber} = req.body;
        if(!pageNumber){
            res.status(400).send({message: 'page number is required'});
        }
        else{
            const offset = 5 * (pageNumber - 1);
            const posts = await db.Post.findAll({
                where: {
                    postStatus: 'published'
                },
                order: [
                    ['createdAt', 'DESC']
                ],
                offset: offset,
                limit: 5
            });

            res.status(200).json(posts);
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}