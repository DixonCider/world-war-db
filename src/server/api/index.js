import server from 'express';
import * as TestController from './controllers/test_controller';
import * as TroopController from './controllers/troop_controller';
import * as countryController from './controllers/country_controller';

const router = server.Router();

router.get('/testa', TestController.getTestA);
router.get('/addtroop', TroopController.addExperimentalData);
router.get('/showAllTroops', TroopController.showAllTroops);
router.get('/getMyTroops', TroopController.getMyTroops);
router.post('/update', TroopController.update);
router.post('/updateDest', TroopController.updateDest);
router.post('/updateEnemy', TroopController.updateEnemy);
router.get('/moveTroops', TroopController.moveTroops);
router.get('/refresh', TroopController.refresh);
router.get('/initCountry', countryController.init);

export default router;
