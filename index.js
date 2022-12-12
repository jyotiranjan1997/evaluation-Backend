require("dotenv").config();

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const { connect } = require("./src/config/db");
const { userRoutes } = require("./src/Routes/user.route");
const { todoRouters } = require("./src/Routes/todo.route");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/todos", todoRouters);

app.listen(PORT, async () => {
    await connect();
    console.log("listening at PORT 7000")
})
