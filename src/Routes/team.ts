import express from 'express';
import controller from '../Controllers/team';
import authVerify from '../Controllers/auth';

const router = express.Router();

router.get('', authVerify.authVerify, controller.getTeamList);
router.get('/:teamID', authVerify.authVerify, controller.getTeamListByTeamID);
router.post('', authVerify.authVerify, controller.insertNewTeam);
router.delete('/:teamID', authVerify.authVerify, controller.deleteTeam);
router.put('/:teamID', authVerify.authVerify, controller.updateTeam);

export = router;