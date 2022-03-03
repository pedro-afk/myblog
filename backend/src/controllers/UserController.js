const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authConfig = require('../config/authConfig.json');

module.exports = {
    async index(req,res){
        try {
            const {email,password} = req.body;
            const user = await User.findOne({
                where: {
                    email:email,
                }
            });
        
            if(!user){
                return res.status(401).json({error:'Usuário não existe!'});
            }
        
            if(!await bcrypt.compareSync(password, user.password)){
                return res.status(401).json({error:'Senha inválida!'});
            }
            user.password=undefined;
            
            const token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: 86400,
            });
    
            const user_id = user.id;
    
            return res.send({user,token,user_id});
        } catch (error) {
            return res.status(401).json({error:'Erro ao tentar fazer o login'});
        }
    },
    
    async store(req,res){
        try {
            const { first_name, last_name, email, password } = req.body;

            const hash = await bcrypt.hashSync(password, 10);
            
            const user = await User.create({
                first_name,
                last_name,
                email,
                password:hash
            });
    
            user.password = undefined;
    
            return res.status(200).send(user);
        } catch (error) {
            return res.status(401).json({error:'Erro ao tentar cadastrar usuário'});
        }
    }
}