import express from 'express';
import controller from '../Controllers/team';
const router = express.Router();

router.get('', controller.getTeamList);
router.get('/:teamID', controller.getTeamListByTeamID);
router.post('/create', controller.insertNewTeam);

export = router;