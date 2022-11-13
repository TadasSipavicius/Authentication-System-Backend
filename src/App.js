"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const team_1 = __importDefault(require("./Routes/team"));
const rating_1 = __importDefault(require("./Routes/rating"));
const basketballPlayer_1 = __importDefault(require("./Routes/basketballPlayer"));
const auth_1 = __importDefault(require("./Routes/auth"));
const PORT = 3006;
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    return res.send("VEIKIAM");
});
app.use('/api', auth_1.default);
app.use('/api/rating', rating_1.default);
app.use('/api/team', team_1.default);
app.use('/api/basketballPlayer', basketballPlayer_1.default);
app.listen(process.env.PORT || PORT, () => {
    console.log(`Running on port ${process.env.PORT || PORT}`);
});
