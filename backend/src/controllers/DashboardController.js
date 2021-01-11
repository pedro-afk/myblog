const Post = require('../models/Post');

module.exports = {
    async index(req,res,next){
        try {
            const post = await Post.findAll({
                include: { 
                    association: 'user',
                    attributes: ['first_name'],
                }
            });
            return res.status(201).json(post);
        } catch (error) {
            return res.status(400).json({ error: 'Posts não encontrados' });
            next();
        }
    }
}