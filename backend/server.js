import express from "express";
import mysql from "mysql";
import cors from 'cors';
import dotenv from 'dotenv';
import postgres from "postgres";

dotenv.config();
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const app=express();

const db=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})

db.connect(function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('Connected to MySQL Server!');
    }
})

// const sql = postgres({
//     host: PGHOST,
//     database: PGDATABASE,
//     username: PGUSER,
//     password: PGPASSWORD,
//     port: 5432,
//     ssl: 'require',
//     connection: {
//       options: `project=${ENDPOINT_ID}`,
//     },
//   });
  
//   async function getPgVersion() {
//     const result = await sql`select version()`;
//     console.log(result);
//   }

//   getPgVersion();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.json("Hello, this is the backend")
})

app.get("/tasks/:uid",(req,res)=>{
    const user_uid=req.params.uid;
    const q="SELECT * FROM tasks WHERE user_uid= ?"

    db.query(q,[user_uid],(err,data)=>{
        if(err){
            return res.json(err);
        }
        else{
            return res.json(data);
        }
    })
})

app.get("/tasks/:uid/:id",(req,res)=>{
    const user_id=req.params.uid;
    const taskId=req.params.id;
    const q="SELECT * FROM tasks WHERE id=?"

    db.query(q,[taskId],(err,data)=>{
        if(err){
            return res.json(err);
        }
        else{
            return res.json(data);
        }
    })
})

app.post("/tasks",(req,res)=>{
    const q="INSERT INTO tasks (`text`,`priority`,`dueDate`,`user_uid`)VALUES (?)"

    const values=[
        req.body.text,
        req.body.priority,
        req.body.dueDate,
        req.body.user_uid
    ]

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Task has been added successfully!");
    })
})

app.delete("/tasks/:id",(req,res)=>{
    const taskId=req.params.id;
    const q="DELETE FROM tasks WHERE id=?";

    db.query(q,[taskId],(err,data)=>{
        if(err){
            res.json(err);
        }
        else{
            res.json("Task Deleted Successfully!")
        }
    })
})

app.put("/tasks/:id",(req,res)=>{
    const taskId=req.params.id;
    const q="UPDATE tasks SET `text`=?, `priority`=?, `dueDate`=? WHERE id=?";

    const values=[
        req.body.text,
        req.body.priority,
        req.body.dueDate,
    ]

    db.query(q,[...values,taskId],(err,data)=>{
        if(err){
            res.json(err);
        }
        else{
            res.json("Task updated Successfully!")
        }
    })
})

app.listen(8800,()=>{
    console.log('Connected to backend! Listening on port 8800!')
})