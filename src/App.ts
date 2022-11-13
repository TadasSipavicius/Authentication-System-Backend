import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import teamRoutes from './Routes/team'
import ratingRoutes from './Routes/rating';
import basketballPlayersRoutes from './Routes/basketballPlayer';
import authRoutes from './Routes/auth';

const PORT = 3006;
const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    return res.send("VEIKIAM");
})

app.use('/api', authRoutes);
app.use('/api/rating', ratingRoutes)
app.use('/api/team', teamRoutes);
app.use('/api/basketballPlayer', basketballPlayersRoutes);

app.listen(process.env.PORT || PORT, () => {
    console.log(`Running on port ${process.env.PORT || PORT}`);
})
