import express from 'express';
import controller from '../Controllers/basketballPlayer';
const router = express.Router();

router.get('', controller.getBasketballPlayersList);
router.post('', controller.insertNewBasketballPlayer);
router.delete('/:basketballPlayerID', controller.deleteBasketballPlayer);
router.put('/:basketballPlayerID', controller.updateBasketballPlayer);

export = router;