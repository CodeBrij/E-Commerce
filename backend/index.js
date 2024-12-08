const express = require('express');
require('./db/config');
const User = require('./db/User');
const cors = require('cors');
const Product = require('./db/Product');
const jwt = require('jsonwebtoken');


const app = express();
const jwtKey = "e-comm";
app.use(express.json());
app.use(cors());
// const connectDB = async () => {
//     mongoose.connect('mongodb://localhost:27017/e-comm');
//     const productSchema = new mongoose.Schema({});
//     const product = mongoose.model('products', productSchema)
//     const data = await product.find();
//     console.warn(data);
// }

// connectDB();

// app.get("/", (req, res) => {
//     res.send("app is working...");
// });

app.post("/register",async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            return res.status(500).send({ result: "Something went wrong. Please try again later." });
        }
        res.send({ result, auth: token });
    });
    console.log(result);
})

app.post("/login", async (req,res) => {
    console.log(req.body);
    if(req.body.email && req.body.password){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    return res.status(500).send({ result: "Something went wrong. Please try again later." });
                }
                res.send({ user, auth: token });
            });
        }
        else{
            res.send("No User Found");
        }
    } else{
        res.send("No User Found");
    }
})

app.post('/add', verifyToken, async (req,res) => {
    let product = new Product(req.body);
    let result = await product.save();
    result = result.toObject();
    res.send(result);
    console.log(result);
})

app.get('/products', verifyToken, async (req,res) => {
    let products = await Product.find();
    if(products.length>0){
        res.send(products);
    } else {
        res.send(products + "No Products Found!!")
    }
})

app.delete('/products/:id', verifyToken, async (req,res) => {
    let result = await Product.deleteOne({_id:req.params.id})
    res.send(result);
})

app.get('/product/:id', verifyToken, async(req,res)=>{
    let product = await Product.findOne({_id:req.params.id});
    res.send(product);
})

app.put('/product/:id', verifyToken, async(req,res) => {
    let result = await Product.updateOne({
        _id: req.params.id
    },{
        $set: req.body
    })
    res.send(result);
})

app.get('/search/:key', verifyToken, async (req,res) => {
    let result = await Product.find({
        "$or":[
            {name : { $regex: req.params.key } },
            {company : { $regex: req.params.key } },
            {category : { $regex: req.params.key } },
        ]
    });
    res.send(result);
})

function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        console.warn("middleware called");
        jwt.verify(token, jwtKey, (err, valid) => {
            if(err){
                res.status(401).send({ result: "Please provide VALID token!"})
            } else {
                next();
            }
        })
    } else {
        res.status(403).send({ result: "Please provide TOKEN with Header" });
    }
}

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
