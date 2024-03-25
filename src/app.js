const express = require("express")
const cors = require ("cors")
const bodyParser =require("body-parser");
const database =require("./config/database.js")
const router =require("./routes/user.js");
const path =require("path")



const app = express();

const PORT = 3000 || process.env.PORT;



app.use(express.json())
app.use(cors())

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", router);

app.get("/", (req, res) => {
    res.render("home");
})
app.get("/", (req, res) => {
    res.render("404")
})
app.listen(PORT, async() => {
    await database.connect()
    console.log(`Server is running on port ${PORT}`)
});

