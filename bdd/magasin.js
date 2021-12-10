const { Sequelize,DataTypes } = require("sequelize");

const sequelize = new Sequelize('', '', '', {
    host: '',
    port: 2222,
    dialect: 'sql'
});

try{
    sequelize.authenticate();
    console.log("Vous etes Connecté");
}catch(error){
    console.log(error)
}

sequelize.define('magasin', {

    idMagasin:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false

    },
    ville: {
        type: DataTypes.STRING,
        allowNull: false
    },

    reparation:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    email:{
        type: DataTypes.STRING,

    },

    telephone:{
      type: DataTypes.STRING,
    },
},

    {
    tableName: 'magasin',
    timestamps: false,
    synchronize: true,
});