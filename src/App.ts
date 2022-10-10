import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import teamRoutes from './Routes/team'

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    return res.send("VEIKIAM");
})

app.use('/api/team', teamRoutes);

app.listen(1337, () => {
    console.log(`Working on server...`)
})



console.log("Veikiams");