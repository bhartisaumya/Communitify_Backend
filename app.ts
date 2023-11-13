import express from "express";
import authHandler from "./routes/authHandler";
import "./Helper/connectingMongdb";
import jwtModule from "./Helper/jwtHelper";
import Community from "./routes/communityHandler";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended : true}));


app.get('/', jwtModule.verifyAccessToken, (req, res, next) => {
    res.send('This is the home page');
})

app.use('/auth', authHandler);
app.use('/community', Community);

// Error Handling
app.use((err: any, req: any, res: any, next: any) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status,
            message: err.message
        }
    })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})
