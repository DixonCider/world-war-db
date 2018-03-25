import geolib from 'geolib';
import { Troop } from 'models';

const addExperimentalData = (req, res) => {
  const troop1 = {
    country: 'USSR',
    id: 6237,
    loc: [120, 23.5],
    dest: [120, 24.5],
    size: 100,
    unitAD: 1,
    unitHP: 500,
    fogR: 10,
  };
  Troop.troopModel.create(troop1, (err, result) => {
    if (err) console.error(err);
    else {
      console.log(`successful, id: ${result.troopID}`);
      res.send(`successful, id: ${result.troopID}`);
    }
  });
};

const refresh = async (req, res) => {
  Troop.troopModel.remove({}, (err) => {
    if (err) {
      console.error(err);
    }
  });

  const countries = ['DPRK', 'USA', 'Korea', 'Russia', 'PRC', 'Japan', 'Mexico', 'India', 'Phillipines', 'Vietnam'];

  const promises = [];

  for (let i = 0; i < 50; ++i) {
    const loc = [360 * Math.random() - 180, 180 * Math.random() - 90];
    const troop = {
      country: countries[Math.floor((countries.length) * Math.random())],
      id: i,
      loc,
      dest: loc,
      size: 100,
      unitAD: 10,
      unitHP: 100,
      fogR: 10,
      surroundingTroops: 0,
      attackR: 10,
    };
    promises.push(Troop.troopModel.create(troop, (err, result) => {
      if (err) console.error(err);
      else {
        console.log(`successful, id: ${result.id}`);
      }
    }));
  }
  Promise.all(promises)
    .then(() => res.send('inserted data'))
    .catch((e) => {
      console.error(e);
      res.send('error at inserting data');
    });
};

const showAllTroops = async (req, res) => {
  const data = await Troop.troopModel.find((err, result) => result);
  res.json(data);
};

const moveTroops = async (req, res) => {
  const troops = await Troop.troopModel.find((err, result) => result);
  console.log(troops);
  const movedTroops = troops.map((troop) => {
    const movedTroop = troop;
    console.log(troop.loc);
    const bearing = geolib.getBearing({ longitude: movedTroop.loc[0], latitude: movedTroop.loc[1] }, { longitude: movedTroop.dest[0], latitude: movedTroop.dest[1] });
    const dest = geolib.computeDestinationPoint(movedTroop.loc, 100000, bearing);
    Troop.troopModel.findOneAndUpdate({ _id: troop._id }, { $set: { loc: [dest.longitude, dest.latitude] } }, (err, data) => {
      if (err) console.error(err);
      console.log(data.loc);
    });
    return movedTroop;
  });

  res.json(movedTroops);
};

const enemyList = {
  DPRK: ['USA', 'Korea', 'Russia', 'PRC', 'Japan', 'Mexico', 'India', 'Phillipines'],
  USA: [],
  Korea: [],
  Russia: [],
  ROC: [],
  Japan: [],
  Mexico: [],
  India: [],
  Phillipines: [],
  Vietnam: [],
};


const fight = async () => {
  const troops = await Troop.troopModel.find({ size: { $gte: 0 } }, (err, result) => result);

  await Promise.all(troops.map(async (troop) => {
    const enemys = Object.keys(enemyList).filter(country => enemyList[country].includes(troop.country));
    const proximityTroops = await Troop.troopModel.aggregate([
      {
        $geoNear: {
          near: troop.loc,
          distanceField: 'distance',
          includeLocs: 'loc',
          spherical: true,
        },
      },
      { $addFields: { isIn: { $subtract: ['$distance', { $multiply: ['$attackR', 0.0174532925] }] } } },
      { $match: { isIn: { $lte: 0 } } },
      { $match: { country: { $ne: troop.country } } },
      { $match: { size: { $gt: 0 } } },
      { $match: { country: { $in: enemys } } },
    ]);
    const damage = proximityTroops.reduce((totalATK, enemy) => Math.floor(totalATK + enemy.unitAD * enemy.size), 0);
    await Troop.troopModel.findOneAndUpdate({ _id: troop._id, size: { $gte: 0 } }, { $inc: { size: -damage / troop.unitHP } });
    return proximityTroops;
  }));
};

const move = async () => {
  const troops = await Troop.troopModel.find((err, result) => result);
  await Promise.all(troops.map((troop) => {
    const movedTroop = troop;
    const bearing = geolib.getBearing({ longitude: movedTroop.loc[0], latitude: movedTroop.loc[1] }, { longitude: movedTroop.dest[0], latitude: movedTroop.dest[1] });
    const dest = geolib.computeDestinationPoint(movedTroop.loc, 100000, bearing);
    Troop.troopModel.findOneAndUpdate({ _id: troop._id }, { $set: { loc: [dest.longitude, dest.latitude] } }, (err) => {
      if (err) console.error(err);
    });
    return movedTroop;
  }));
};

const gameLoop = () => {
  move();
  fight();
  setTimeout(gameLoop, 1000);
};
setTimeout(gameLoop, 1000);
const getMyTroops = async (req, res) => {
  const countryData = {};
  countryData.Nation = req.query.country;
  console.log(countryData.Nation);
  countryData.Troops = await Troop.troopModel.find({ country: req.query.country }, (err, result) => result);
  const otherData = {};
  otherData.Troops = await Troop.troopModel.find({ country: { $ne: req.query.country } }, (err, result) => result);
  res.send({ countryData, otherData });
};

const update = async (req, res) => {
  const countryData = {};
  countryData.Nation = req.body.country;
  countryData.Troops = await Troop.troopModel.find({ country: req.body.country, size: { $gte: 0 } }, (err, result) => result);
  const otherData = {};
  const enemy = (await Troop.troopModel.find({ country: { $ne: req.body.country }, size: { $gte: 0 } }, (err, result) => result));
  otherData.Troops = enemy.map((troop) => {
    const result = {};
    Object.assign(result, troop._doc);
    result.AD = troop.unitAD * troop.size;
    result.HP = troop.unitHP * troop.size;
    return result;
  });
  res.send({ countryData, otherData });
};

const updateDest = async (req, res) => {
  const modifiedTroop = req.body;
  Troop.troopModel.findOneAndUpdate({ _id: modifiedTroop._id }, { $set: { dest: modifiedTroop.dest } }, (err, data) => {
    if (err) return Promise.reject(err);
    else return data;
  });
  res.send('yup');
};

const updateEnemy = async (req, res) => {
  enemyList[req.body.country] = req.body.enemy || [];
  console.log(enemyList);
  res.send('ok');
};


export { addExperimentalData, showAllTroops, moveTroops, refresh, getMyTroops, update, updateDest, updateEnemy };
