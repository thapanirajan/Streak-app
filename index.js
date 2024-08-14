const express = require("express");

const app = express();

const model = require("./model/model.js");

const path = require("path");

const methodOverride = require("method-override");
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const data = await model.find();
  res.render("index", { data });
});

app.post("/create", async (req, res) => {
  const { title } = req.body;
  await model.create({
    title,
    counter: 0,
  });
  res.redirect("/");
});

app.get("/add/:id", async (req, res) => {
  const { id } = req.params;
  await model.findByIdAndUpdate(id, {
    $inc: { counter: 1 },
  });
  res.redirect("/");
});

app.get("/reset/:id", async (req, res) => {
  const { id } = req.params;
  await model.findByIdAndUpdate(id, {
    $set: { counter: 0 },
  });
  res.redirect("/");
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await model.findByIdAndDelete(id);
  res.redirect("/");
});
app.listen(3000);
