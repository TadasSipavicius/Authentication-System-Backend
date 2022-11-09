import express from 'express';
import controller from '../Controllers/rating';
import Playercontroller from '../Controllers/basketballPlayer';
const router = express.Router();

router.get('', controller.getTeamsRatingList);
router.get('/team/:teamID', controller.getTeamRatingByTeamID);
router.post('', controller.insertNewTeamToRating);
router.delete('/:teamID', controller.deleteTeamFromRating);
router.delete('/reset', controller.resetRating);
router.get('/:ratingID/team/:teamID/basketballPlayer/:basketballPlayerID', Playercontroller.getBasketballPlayerByID);
export = router;