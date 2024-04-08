module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes", {
   userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
     postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  Likes.associate = (models) => {
    Likes.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false,
        field: 'userId' // This specifies the name of the foreign key column in the Likes table
      }
    });
    
    Likes.belongsTo(models.Posts, {
      foreignKey: {
        allowNull: false,
        field: 'postId' // This specifies the name of the foreign key column in the Likes table
      }
    });
  };

  return Likes;
};
