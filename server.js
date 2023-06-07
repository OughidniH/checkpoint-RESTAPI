const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/connectDB");
const Users = require("./Model/User");
const router = express.Router();
connectDB();

const app = express();
app.use("/Home", router);
router.use(express.json());
//GET
router.get("/user", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({ msg: "users found:", data: users });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
});
//POST
router.post("/user", async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new Users({ email, password });
    const user = await newUser.save();
    res.status(201).json({ msg: "user created:", data: user });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
});
//PUT
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.bady;

  try {
    await Users.findByIdAndUpdate(
      { _id: id },
      { $set: { email: email, password: password } }
    );
    res.status(200).send({ msg: "user updated" });
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
});
//DELETE
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Users.findByIdAndDelete(id);
    res.status(200).send({ msg: "user removed" });
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
});
const port = process.env.PORT;

app.listen(port, (error) => {
  error
    ? console.log(error)
    : console.log(`serveur s'exécutant sur le port ${port}`);
});
