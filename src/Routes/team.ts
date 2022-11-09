import express from 'express';
import controller from '../Controllers/team';
const router = express.Router();

router.get('', controller.getTeamList);
router.get('/:teamID', controller.getTeamListByTeamID);
router.post('', controller.insertNewTeam);
router.delete('/:teamID', controller.deleteTeam);
router.put('/:teamID', controller.updateTeam);

export = router;