const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {

    async index(req,res){
        try {
            const { user_id } = req.headers;
            const user = await Post.findAll({
                where:{
                    user_id: user_id
                }
            });
            return res.send(user);
        } catch (error) {
            return res.status(401).json({ error: 'Erro ao encontrar seus posts!' });
        }
    },

    async store(req,res){
        try {
            const { user_id } = req.headers;
            const { token } = req.headers.authorization;
            const { content, description } = req.body;
            const { filename } = req.file;

            const user = await User.findByPk(user_id);

            if(!user){
                return res.status(401).json({error: "Usuário não encontrado!"});
            }
        
            const post = await Post.create({
                user_id,
                content,
                thumbnail: filename,
                description
            });

            return res.status(200).json(post);
        } catch (error) {
            return res.status(401).json({ error: 'Erro ao postar' });
        }
    },

    async delete(req,res){
        try {
            const { user_id } = req.headers;
            const { token } = req.headers.authorization;

            const user = await User.findByPk(user_id);
            
            if (!user) {
                return res.status(401).json({error: 'Usuário não encontrado'})
            }

            const post  = await Post.destroy({
                where: { id: req.params.id }
            });

            await user.removePost(post);

            return res.status(200).json({message: 'Post Deletado'});
        } catch (error) {
            return res.status(401).json({ error: 'Erro ao deletar' });
        }
    }
}