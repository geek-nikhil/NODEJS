// const express = require("express")
// const app = express()
// const PORT = 8000;
// const users = require("./MOCK_DATA.json")


// app.use(express.urlencoded({extended:false}));
// app.use((req,res,next)=>{
//     console.log("Hello from middleware");
//     req.myUserName = "Nikhil";
//     next();
//  })
//  app.use((req,res,next)=>{
//     console.log("Hello from middleware");
//     console.log(req.myUserName);
//     next();
  
//  })
// app.get("/users",(req,res)=>{
//     const html = `
//     <ul>
//     ${users.map((user) => `<li>${user.first_name}</li> `).join("")}
//     </ul>`
//     console.log(req.myUserName);
//     res.send(html);
//  })

//  app.get("/api/users",(req,res)=>{
//    res.setHeader("X-myName","Piyush Garg");
//     console.log(req.headers);
//     //Always add X to custom headers
//    return res.json(users);
//  })


// app
// .route("/api/users/:id")
// .get((req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=>user.id === id);
//        return res.json(user);
//    })
//    .put((req,res)=>{
//    res.json({status:"pending"})
//    })
//    .post((req,res)=>{
//       const body = req.body;
//       users.push({...body, id:users.length+1});
//       Fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>
//       return res.status(201).json({status:"succes"})})
//     .delete((req,res)=>{
//         res.json({status:"pending"})
//         })
// // app.post("/api/users",(req,res)=>{
// //     return res.json({status:"pending"})
// // })
// // app.patch("/api/users/:id",(req,res)=>{
// //     return res.json({status:"pending"})
// // })
// // app.delete("/api/users/:id",(req,res)=>{
// //     return res.json({status:"pending"})
// // })
// app.listen(PORT , ()=>console.log(`Server Started at ${PORT}`))
const express = require("express");
const app = express();
const PORT = 8000;
// const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
.then (()=>console.log("mongodb connected"))
.catch(err=>console.log("Mongo Error" ,err))
//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
    },
    lastName: {
        type : String,
    },
    email: {
        type:String,
        required : true,
        unique:true,
    },
    jobTitle:{
        type:String,
    },
    gender : {
        type:String
    }
})

const User = mongoose.model("user",userSchema);
// Middleware to set custom username
app.use((req, res, next) => {
    console.log("Hello from middleware");
    req.myUserName = "Nikhil";
    next();
});

app.use(express.urlencoded({ extended: false }));

// Route to handle GET requests for users
app.get("/users", async (req, res) => {
    const allDbUsers  = await User.find ({});
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName}-${user.email}</li>`).join("")}
    </ul>`;
    console.log(req.myUserName);
    res.send(html);
});

// Route to handle GET requests for API users
app.get("/api/users",async (req, res) => {
    const allDbUsers  = await User.find ({});
    res.setHeader("X-myName", "Piyush Garg");
    console.log(req.head-3ers);
    return res.json(J   );
});

// Route to handle GET, PUT, POST, DELETE requests for individual user

    app.post("/api/users",async (req, res) => { // Remove the route path here
        const body = req.body;
        console.log("fcks");
        if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
            return res.status(400).json({ msg: "All fields are required" });
        }
           const result = await User.create({
                firstName: body.first_name,
                lastName: body.last_name,
                email: body.email,
                gender: body.gender,
                jobTitle: body.job_title,
            });
            console.log(result)
            return res.status(201).json({ msg: "Success" });
    });


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(PORT, () => console.log(`Server Started at ${PORT}`));
