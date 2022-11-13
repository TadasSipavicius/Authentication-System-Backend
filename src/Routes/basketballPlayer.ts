import express from 'express';
import controller from '../Controllers/basketballPlayer';
import authVerify from '../Controllers/auth';

const router = express.Router();

router.get('', controller.getBasketballPlayersList);
router.post('', authVerify.authVerify, controller.insertNewBasketballPlayer);
router.delete('/:basketballPlayerID', authVerify.authVerify, controller.deleteBasketballPlayer);
router.put('/:basketballPlayerID', authVerify.authVerify, controller.updateBasketballPlayer);

export = router;