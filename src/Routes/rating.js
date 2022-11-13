"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const rating_1 = __importDefault(require("../Controllers/rating"));
const basketballPlayer_1 = __importDefault(require("../Controllers/basketballPlayer"));
const auth_1 = __importDefault(require("../Controllers/auth"));
const router = express_1.default.Router();
router.get('', rating_1.default.getTeamsRatingList);
router.get('/team/:teamID', auth_1.default.authVerify, rating_1.default.getTeamRatingByTeamID);
router.post('', auth_1.default.authVerify, rating_1.default.insertNewTeamToRating);
router.delete('/:teamID', auth_1.default.authVerify, rating_1.default.deleteTeamFromRating);
router.delete('/reset/rating', auth_1.default.authVerify, rating_1.default.resetRating);
router.get('/:ratingID/team/:teamID/basketballPlayer/:basketballPlayerID', basketballPlayer_1.default.getBasketballPlayerByID);
module.exports = router;
