"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../Controllers/auth"));
const router = express_1.default.Router();
router.post('/register', auth_1.default.UserRegister);
router.post('/login', auth_1.default.UserLogin);
router.post('/token', auth_1.default.RefreshToken);
router.delete('/logout', auth_1.default.LogoutUser);
module.exports = router;
