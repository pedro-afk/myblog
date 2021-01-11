const { Model, DataTypes } = require('sequelize');

class Post extends Model {
    static init(sequelize){
        super.init({
            content: DataTypes.STRING,
            thumbnail: DataTypes.STRING,
            thumbnail_url: {
                type: DataTypes.VIRTUAL,
                get: function(){
                    return `https://myblog-apps.herokuapp.com/files/${this.thumbnail}`
                }
            },
            description: DataTypes.STRING,
        }, {
            sequelize
        });
    }
    static associate(models){
        this.belongsTo(models.User, { 
            foreignKey: 'user_id', 
            as: 'user'
        });
    }
}


module.exports = Post;
