import mongoose from "mongoose";

const MONGO_URL: string = process.env.MONGO_URL || 'a'


// mongoose.connect("mongodb+srv://surya:vSiMXGiddMXKC03l@cluster0.u0iusxy.mongodb.net/?retryWrites=true")
mongoose.connect(MONGO_URL)
.then(() => {
    console.log("MongoDB Connected")
})
.catch((err: Error) => {
    console.log(err.message);
})

process.on("beforeExit", () => {
    mongoose.disconnect();
    process.exit(0);
});