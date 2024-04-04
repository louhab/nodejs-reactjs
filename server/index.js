const express = require('express');
const app = express();
const port = 10;
const db = require("./models");
db.sequelize.sync().then(()=>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });    
})
app.use(express.json());
const postRoute = require("./routes/postes");
app.use("/posts",postRoute);


// nodejsreact is the name of data base to connecte 
