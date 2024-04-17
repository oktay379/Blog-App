import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import "./db.js";
import { User } from "./models/UserModel.js";
import { Post } from "./models/PostModel.js";


// express libs.
const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true 
}));
app.use(cookieParser());
app.use(express.static("public")) // img map etmek icin kullanildi, (chat sorulacak).


const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json("No Token")
    }
    else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json("Token wrong")
            }
            else {
                req.email = decoded.email;
                req.username = decoded.username;
                next();
            }
        })
    }
}


app.get("/", verifyUser, (req, res) => {
    return res.json({email: req.email, username: req.username})
});


app.post("/register", (req, res) => {
    const {username, email, password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        User.create({username, email, password: hash}) 
        .then(user => res.json(user))
        .catch(err => res.json(err))
    }).catch(err => console.log(err)) 
});


app.post("/login", (req, res) => {
    const {email, password} = req.body;
    User.findOne({email: email})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                    const token = jwt.sign({email: user.email, username: user.username},
                    "jwt-secret-key", {expiresIn: "1d"})
                    res.cookie("token", token);
                    return res.json("Success")
                }
                else {
                    return res.json("Password is incorrect")
                }
            })
        }
        else {
            res.json("User not Exist")
        }
    })
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Public/Images")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({
    storage: storage
})
app.post("/create", verifyUser, upload.single('file'), (req, res) => {
    Post.create({
        title: req.body.title, 
        desc: req.body.desc,
        file: req.file.filename,
        email: req.body.email
    })
    .then(result => res.json("Success"))
    .catch(err => res.json(err))
});


app.get("/getposts", (req, res) => {
    Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.json(err))
});


app.get("/getpostbyid/:id", (req, res) => {
    const id = req.params.id
    Post.findById({_id: id})
    .then(post => res.json(post))
    .catch(err => res.json(err))
});


app.put("/editpost/:id", (req, res) => {
    const id = req.params.id
    Post.findByIdAndUpdate(
        {_id: id}, {title: req.body.title, desc: req.body.desc}
    )
    .then(result => res.json("Success"))
    .catch(err => res.json(err))
});


app.delete("/deletepost/:id", (req, res) => {
    const id = req.params.id
    Post.findByIdAndDelete({_id: id})
    .then(result => res.json("Success"))
    .catch(err => res.json(err))
});


app.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json("Success");
});


// for env
dotenv.config();

// server
app.listen(process.env.PORT, () => {
    console.log("Server is Running");
})