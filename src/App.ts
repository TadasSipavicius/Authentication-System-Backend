import express from 'express';

const app = express();

app.get("/", (req, res) => {
    return res.send("VEIKIAM");
})

app.listen(3000, () => {
    console.log(`Working on server...`)
})
console.log("Veikiams");