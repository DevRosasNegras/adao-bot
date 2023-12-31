const mongoose = require('mongoose');
const config = require('../../config.json');

class DataBase {
    constructor() {
        this.connection = null;
    }
    connect() {
        const mongo_url = config.mongodb_URL;
        console.log('Tentando conexão com banco de dados...');
        mongoose.connect(mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() =>{
            console.log('Conectado com o banco de dados.');
            this.connect = mongoose.connection;
        }).catch(err => {
            console.error(err);
        });
    }
}

module.exports = DataBase;