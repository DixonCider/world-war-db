import geolib from 'geolib';
import { Troop, Country } from 'models';
import * as game from 'game';

const addExperimentalData = (req, res) => {
  const troop1 = {
    country: 'USSR',
    id: 6237,
    loc: [120, 23.5],
    dest: [120, 24.5],
    size: 100,
    unitAD: 100,
    unitHP: 1000,
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
      surroundingTroops: 0,
      // fogR: 10,
      // attackR: 10,
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

game.startGame();

const getMyTroops = async (req, res) => {
  const countryData = {};
  countryData.Nation = req.query.country;
  console.log(countryData.Nation);
  // countryData.Troops = await Troop.troopModel.find({ country: req.query.country }, (err, result) => result);
  countryData.Troops = await Troop.troopModel.aggregate([
    {
      $match: { country: req.query.country },
    },
    {
      $lookup: {
        from: 'countries',
        localField: 'country',
        foreignField: 'name',
        as: 'countryInfo',
      },
    },
    {
      $unwind: '$countryInfo',
    },
    {
      $addFields: {
        attackR: '$countryInfo.troop.attackR',
        fogR: '$countryInfo.troop.fogR',
      },
    },
    {
      $project: {
        countryInfo: 0,
      },
    },
  ], (err, result) => result);
  const otherData = {};
  // otherData.Troops = await Troop.troopModel.find({ country: { $ne: req.query.country } }, (err, result) => result);
  otherData.Troops = await Troop.troopModel.aggregate([
    {
      $match: {
        country: { $ne: req.query.country },
      },
    },
    {
      $lookup: {
        from: 'countries',
        localField: 'country',
        foreignField: 'name',
        as: 'countryInfo',
      },
    },
    {
      $unwind: '$countryInfo',
    },
    {
      $addFields: {
        attackR: '$countryInfo.troop.attackR',
        fogR: '$countryInfo.troop.fogR',
      },
    },
    {
      $project: {
        countryInfo: 0,
      },
    },
  ], (err, result) => result);
  res.send({ countryData, otherData });
};

const getEnemyList = async (req, res) => {
  const { country } = req.query;
  res.send(game.enemyList[country]);
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
  game.enemyList[req.body.country] = req.body.enemy || [];
  console.log(game.enemyList);
  res.send('ok');
};

const addTroop = async (req, res) => {
  const { country } = req.body;
  const countryData = await Country.countryModel.findOne({ name: country });
  const number = await Troop.troopModel.find({}, (err, result) => {
    if (err) console.error(err);
    return result;
  }).count();
  const troop = {
    country,
    id: number + 1,
    loc: countryData.capital,
    dest: countryData.capital,
    size: 100,
    unitAD: 100,
    unitHP: 1000,
    fogR: 10,
  };
  await Troop.troopModel.create(troop, (err) => {
    if (err) {
      console.error(err);
      res.send(err);
    } else {
      res.send(`successful, id: ${number + 1}`);
    }
  });
};

export { addExperimentalData, showAllTroops, moveTroops, refresh, getMyTroops, getEnemyList, update, updateDest, updateEnemy, addTroop };
