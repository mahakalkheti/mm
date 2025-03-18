const express = require("express");
const fs = require("fs");
require('dotenv').config()
const path = require("path");
const app = express();
app.use(express.static("public")); // Serve Static Files
app.set("view engine", "ejs");

// JSON File Path
const filePath = "C:/Users/DELL/Desktop/data.json";

// 🟢 **Homepage Route**
app.get("/", (req, res) => {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    res.render("index", { title: data.title, description: data.description });
});

// 🟢 **Update JSON Data**
app.get("/update", (req, res) => {
    const newData = { title: "Updated Title!", description: "This is the new description." };
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
    res.redirect("/"); // Reload Page with Updated Data
});

const port = process.env.PORT || '3000'
app.listen(port, () => {
    console.log('Server is running on port : ');
});
