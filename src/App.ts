import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import teamRoutes from './Routes/team'
import ratingRoutes from './Routes/rating';
import basketballPlayersRoutes from './Routes/basketballPlayer';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    return res.send("VEIKIAM");
})

app.use('/api/rating', ratingRoutes)
app.use('/api/rating/team', teamRoutes);
app.use('/api/rating/team/', basketballPlayersRoutes);

app.listen(1337, () => {
    console.log(`Working on server...`)
})



console.log("Veikiams");