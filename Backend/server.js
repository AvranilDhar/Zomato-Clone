import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import dotenv from "dotenv";

const port = process.env.PORT || 5000;

connectDB()
.then(()=> {
    app.listen(port, ()=> {
        console.log(`SERVER is RUNNING @ http://localhost:${port}`);
    })
})
.catch((error)=>{
    console.log(`MONGODB CONNECTION ERROR : ${error}`);
})