"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const team_1 = __importDefault(require("../Controllers/team"));
const auth_1 = __importDefault(require("../Controllers/auth"));
const router = express_1.default.Router();
router.get('', auth_1.default.authVerify, team_1.default.getTeamList);
router.get('/:teamID', auth_1.default.authVerify, team_1.default.getTeamListByTeamID);
router.post('', auth_1.default.authVerify, team_1.default.insertNewTeam);
router.delete('/:teamID', auth_1.default.authVerify, team_1.default.deleteTeam);
router.put('/:teamID', auth_1.default.authVerify, team_1.default.updateTeam);
module.exports = router;
