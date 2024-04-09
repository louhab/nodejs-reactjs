const express = require('express');
const app = express();
const port = 10;


const cors = require("cors");
const db = require("./models");

// establish the connection using with Mysql use sequilize Orm ;
db.sequelize.sync().then(()=>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });    
})
app.use(express.json());
app.use(cors())

// postes Routes
const postRoute = require("./routes/postes");
app.use("/posts", postRoute);

// Comments Routes 
const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);


// users Routes ;
const userRouter = require("./routes/users");
app.use("/users", userRouter);


// likes Routes :
const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);





// nodejsreact is the name of data base to connecte 
// check the config file 
