"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const basketballPlayer_1 = __importDefault(require("../Controllers/basketballPlayer"));
const auth_1 = __importDefault(require("../Controllers/auth"));
const router = express_1.default.Router();
router.get('', basketballPlayer_1.default.getBasketballPlayersList);
router.post('', auth_1.default.authVerify, basketballPlayer_1.default.insertNewBasketballPlayer);
router.delete('/:basketballPlayerID', auth_1.default.authVerify, basketballPlayer_1.default.deleteBasketballPlayer);
router.put('/:basketballPlayerID', auth_1.default.authVerify, basketballPlayer_1.default.updateBasketballPlayer);
module.exports = router;
