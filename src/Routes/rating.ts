import express from 'express';
import controller from '../Controllers/rating';
const router = express.Router();

router.get('', controller.getTeamsRatingList);
router.get('/:teamID', controller.getTeamRatingByTeamID);
router.post('/create', controller.insertNewTeamToRating);
router.delete('/delete/:teamID', controller.deleteTeamFromRating);
router.delete('/reset', controller.resetRating);

export = router;