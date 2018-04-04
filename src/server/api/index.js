import server from 'express';
import * as TroopController from './controllers/troop_controller';
import * as countryController from './controllers/country_controller';

const router = server.Router();

router.get('/showAllTroops', TroopController.showAllTroops);
router.get('/allCountries', countryController.getAllCountries);
router.get('/countryInfo', countryController.countryInfo);
router.post('/modCountry', countryController.modCountry);

router.post('/addTroop', TroopController.addTroop);
router.get('/getMyTroops', TroopController.getMyTroops);
router.post('/update', TroopController.update);
router.post('/updateDest', TroopController.updateDest);
router.get('/enemyList', TroopController.getEnemyList);
router.post('/updateEnemy', TroopController.updateEnemy);
router.get('/moveTroops', TroopController.moveTroops);
router.get('/refresh', TroopController.refresh);

router.get('/initCountry', countryController.init);
router.post('/addBlock', countryController.addBlock);
router.get('/resource', countryController.getReasource);

router.get('/techTree', countryController.getTechtree);
router.get('/developeTech', countryController.developeTech);

router.get('/countryList', countryController.getCountryList);

router.post('/addResourcePoint', countryController.addResourcePoint);
router.get('/CreateResourcePoint', countryController.makeResourcePoints);
router.get('/resourcePoint', countryController.getResourcePoints);
router.post('/mineResource', countryController.mineResource);

router.post('/developeNuke', countryController.developeNuke);
router.post('/NUKE', countryController.nuke);

export default router;
