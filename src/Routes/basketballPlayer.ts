import express from 'express';
import controller from '../Controllers/basketballPlayer';
const router = express.Router();

router.get('', controller.getBasketballPlayersList);
router.get('/:basketballPlayerID', controller.getBasketballPlayerByID);
router.post('/create', controller.insertNewBasketballPlayer);
router.delete('/delete/:basketballPlayerID', controller.deleteBasketballPlayer);
router.put('/update/:basketballPlayerID', controller.updateBasketballPlayer);

export = router;