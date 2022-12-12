const express = require("express");
const { TodoModel } = require("../models/todo.model");
const { todoMiddleWare } = require("../middlewre/TodoValidator");

const todoRouters = express.Router();

todoRouters.get("/", todoMiddleWare, async (req, res) => {
    const user = req.body;
    const { status, tag } = req.query;
   
    try {
        if (status && tag) {
            const todos = await TodoModel.find({ user:user.user, status, tag });
            res.send({ Todos: todos });
        } else if (status) {
          const todos = await TodoModel.find({ user: user.user, status });
          res.send({ Todos: todos });
        } else {
          const todos = await TodoModel.find(user);
          res.send({ Todos: todos });
        }
          
    } catch (err) {
        
    }
})

todoRouters.get("/:todoID", todoMiddleWare, async (req, res) => {
  const payload = req.body;
  const todoID = req.params.todoID;
  try {
    let Todo = await TodoModel.findOne({ user: payload.user, _id: todoID });
    res.send({ Todo: Todo });
  } catch (err) {
    res.status(404).send({ msg: "Something Wrong" });
  }
});

//Todo Add

todoRouters.post("/addtodo", todoMiddleWare, async (req, res) => {
    const payload = req.body;
    try {
        await TodoModel.create(payload);
        res.send({msg:"Todo added Sucessfully"})
    } catch (err) {
        res.status(404).send({ msg: "Todo added Failed" });
  }
});



//Todo patch

todoRouters.patch("/:todoID", todoMiddleWare, async (req, res) => {
    const payload = req.body;
    const todoID = req.params.todoID;
    try {
        let Todo = await TodoModel.findOne({ user: payload.user, _id: todoID });
        if (Todo) {
            await TodoModel.findByIdAndUpdate({ _id: todoID }, payload);
            res.send({msg:"Todo updated Successfully"})
        } else {
            res.send({msg:"You are Not Authorize"})
        }
    } catch (err) {
        
        res.status(404).send({ msg: "Something Wrong" });
  }
});

//Todo Delete

todoRouters.delete("/delete/:todoID", todoMiddleWare, async (req, res) => {
 const todoID = req.params.todoID;
 try {
   let Todo = await TodoModel.findOne({ user: payload.user, _id: todoID });
   if (Todo) {
     await TodoModel.findByIdAndDelete({ _id: todoID });
     res.send({ msg: "Todo Deleted Successfully" });
   } else {
     res.send({ msg: "You are Not Authorize to Delete" });
   }
 } catch (err) {
   res.status(404).send({ msg: "Something Wrong" });
 }
});

module.exports = { todoRouters };