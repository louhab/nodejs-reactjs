const express = require('express');
const app = express();
const port = 10;
const db = require("./models");
db.sequelize.sync().then(()=>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });    

})

// nodejsreact is the name of data base to connecte 
