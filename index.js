const express = require("express");
const fs = require("fs");
const path = require("path");
require('dotenv').config()
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data

const filePath = path.join(__dirname, "data.json");

// 🟢 **Homepage Route**
app.get("/", (req, res) => {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    res.render("index", { title: data.title, description: data.description });
});

// 🟢 **Update JSON Data Route**
app.post("/update", (req, res) => {
    const newData = {
        title: req.body.title,
        description: req.body.description
    };
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
    res.redirect("/"); // Reload page with updated data
});

const port = process.env.PORT || '3000'
app.listen(port, () => {
    console.log('Server is running on port : ');
});
