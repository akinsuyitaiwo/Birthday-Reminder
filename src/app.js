import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import database from "./config/database.js"
const app = express();

const PORT = 3000 || process.env.PORT;

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.status(200).send({
        message: "Welcome to the birthday scheduler app"
    })
})
app.get("/", (req, res) => {
    res.status(404).send({
        message: "Page not found"
    })
})
app.listen(PORT, async() => {
    await database.connect()
    console.log(`Server is running on port ${PORT}`)
});