const mongoose = require('mongoose');
const config = require('config');
const database = config.get('mongoURI');

const connectToDB = async () => {
    try {
        await mongoose.connect(database, {
            useCreateIndex:true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        });
        console.log('MongoDB ПОДКЛЮЧЕНА');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectToDB;