const express = require("express");
const fs = require("fs");
const app = express();

app.set("view engine", "hbs");
app.get("/", (req, res) => {
	const content = fs.readFileSync("data.txt", "utf-8");
    const array = content.split("\n")
    const name = array[0];
    const lop = array[1]
	res.render("home", { name : name, lop : lop });
});

app.get("/sub", (req, res) => {
	let list = [];
	list.push({ name: "Minh", age: 13 });
	list.push({ name: "Hieu", age: 29 });
	res.render("subpage",{Danhsach: list});
});


app.listen(5000);
console.log("<<<<<<< Server is running at 5000 >>>>>>");
