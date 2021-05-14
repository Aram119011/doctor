const mongoose = require('mongoose');
const config = require('./keys');

mongoose.connect(
    config.mongoURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
)

    .then(() => console.log('DB Connection SuccessFull'))
    .catch((err) => {
        console.error(err)
    });
