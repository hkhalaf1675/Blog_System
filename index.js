const app = require('express')();
require('dotenv').config();

//
app.use(require('express').json());

// database connection
const db = require('./models/main');
db.sequelize.sync()
    .then(() => {
        console.log("Connect to Database Successfully");
    })
    .catch((error) => {
        console.log(error.message);
    });

// include auth router
const authRouter = require('./routes/AuthRouter');
app.use(authRouter);

const authorRouter = require('./routes/AuthorRouter');
app.use(authorRouter);

const userRouter = require('./routes/UserRouter');
app.use(userRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is running");
})