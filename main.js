const app = require('./app');
const config = require('./config/keys');
require('./config/database');


app.listen(process.env.PORT || config.port, ()=>{
    console.log(`Server i running on port: ${config.port}`)
});
