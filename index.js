const express = require("express");
require("dotenv").config();
let app = express();
app.use(express.json());
let arr = [];
let id = 0;
let isdeleted = false;

app.get("/Hello", (req, res) => {
    res.redirect("/check");
})
app.get("/check", (req, res) => {
    res.send({ msg: "hello world" })
})

app.post("/createProduct", (req, res) => {
    try {
        obj = req.body;
        obj.isdeleted = false;
        id++;
        obj.id = id;
        if (obj.name && obj.cost && obj.category) {

            let you = arr.find((val) => {
                return val.name == obj.name
            })
            if (you == null) {
                arr.push(obj);
                res.status(201).send({ issuccessful: true, product: obj });
            }
            else {
                res.send({ issuccessful: false, msg: "Procuct already exists" });
            }

        }
        else {
            res.send({ issuccessful: false, msg: "Not a valid detail" })
        }
    }
    catch (err) {
        res.status(500).send({ issuccessful: false, msg: err });
    }

})

// app.put("/updateProduct",(req,res)=>
// {   
//     let id=req.query.id;
//     let idx=arr.findIndex((val)=>(val.id==id));
//     if(idx>=0)
//     {
//         let obj=arr[idx];
//         obj={
//             ...obj,
//             ...req.body
//         }
//         arr[idx]=obj;
//         res.send({issuccessful:true,updatedProduct:obj})
//     }
//     else
//     {
//         res.send({issuccessful:false,msg:"product not find"})
//     }


// })


app.put("/updateProduct", (req, res) => {
    try {
        let vivek = req.body;
        let id = req.query.id;
        let check = arr.findIndex((val) => {
            return val.id == id
        })
        if (check == null) {
            res.status(404).send({ issuccessful: false, msg: "Product not find" })
        }
        else {
            obj = arr[check];//old data of arr transfered into obj
            obj =
            {
                ...obj,//overwriting both old obj and 
                ...vivek//new data present in postman
            }
            arr[check] = obj;//trasnfering the updated data back into the arr
            res.status(200).send({ issuccessful: true, UpdatedProduct: obj })
        }
    }
    catch (err) {
        res.status(500).send({ issuccessful: false, msg: err })
    }
})

app.delete("/delete", (req, res) => {
    try {
        let id = req.query.id;
        let idx = arr.findIndex((val) => (val.id == id));
        if (idx >= 0) {
            let removeItem = arr.splice(idx, 1);
            console.log(removeItem);
            res.status(200).send({ issuccessful: true, UpdatedProduct: arr })
        }
        else {
            res.status(404).send({ issuccessful: false, msg: "Product not find" })
        }

    }
    catch (err) {
        res.status(500).send({ issuccessful: false, msg: err })
    }


})


app.delete("/deleteSoft", (req, res) => {

    try {
        let id = req.query.id;
        let idx = arr.find((val) => (val.id == id));
        console.log(idx);
        if (idx && idx.isdeleted == false) {
            idx.isdeleted = true;
            res.status(200).send({ issuccessful: true, UpdatedProduct: arr })

        }
        else {
            res.status(404).send({ issuccessful: false, msg: "Product not find" })
        }
    }
    catch (err) {
        res.status(500).send({ issuccessful: false, msg: err })
    }

})


app.get("/all", (req, res) => {
    try {
        let viraj = arr.filter((val) => {
            return val.isdeleted == false;
        })


        if (viraj) {
            res.status(200).send({ products: viraj });
        }
    }
    catch (err) {
        res.status(500).send({ issuccessful: false, msg: err })
    }

})

// app.get("/filter", (req, res) => {
//     try {
//         let viraj = arr.filter((val) => {
//             return val.cost < 10000 && val.cost > 5000;
//         })
//         if (viraj) {
//             res.status(200).send({ product: viraj })
//         }

//     } catch (err) {
//         res.status(500).send({ issuccessful: false, msg: err })
//     }
// })

app.get("/filter1", (req, res) => {
    try {
        let mincost1 = req.query.mincost;
        let maxcost1 = req.query.maxcost;
        let idx = arr.filter((val) => {
            return val.cost < maxcost1 && val.cost > mincost1
        })
        if (idx) {
            res.status(200).send({ product: idx })
        }
    }
    catch (err) {
        res.status(500).send({ issuccessful: false, msg: err })
    }
})

app.get("/sort", (req, res) => {
    try {
        let sort1 = req.query.sort;
        if (sort1 == "asc") {
            let arr1 = arr.sort((a, b) => {
                return a.cost - b.cost;
            })
            res.status(200).send({ product: arr1 })

        }
        else if (sort1 == "desc") {
            let arr2 = arr.sort((a, b) => {
                return b.cost - a.cost;
            })
            res.status(200).send({ product: arr2 })
        }
        else {
            res.status(404).send({ issuccessful: false, msg: "Product not find" })
        }


    }
    catch (err) {
        res.status(500).send({ issuccessful: false, msg: err })
    }
})



app.listen(process.env.PORT, () => {
    console.log("port started on 8000");
})