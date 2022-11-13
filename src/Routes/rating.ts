import express from 'express';
import controller from '../Controllers/rating';
import Playercontroller from '../Controllers/basketballPlayer';
import authVerify from '../Controllers/auth';

const router = express.Router();

router.get('', controller.getTeamsRatingList);
router.get('/team/:teamID', authVerify.authVerify, controller.getTeamRatingByTeamID);
router.post('', authVerify.authVerify, controller.insertNewTeamToRating);
router.delete('/:teamID', authVerify.authVerify, controller.deleteTeamFromRating);
router.delete('/reset', authVerify.authVerify, controller.resetRating);

router.get('/:ratingID/team/:teamID/basketballPlayer/:basketballPlayerID', Playercontroller.getBasketballPlayerByID);
export = router;