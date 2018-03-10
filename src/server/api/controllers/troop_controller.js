import geolib from 'geolib';
import { Troop } from 'models';

const addExperimentalData = (req, res) => {
  const troop1 = {
    country: 'USSR',
    id: 6237,
    loc: [120, 23.5],
    dest: [120, 24.5],
    size: 100,
    unitAD: 10,
    unitHP: 10,
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

  const countries = ['USSR', 'USA', 'DPRK', 'China', 'ROK', 'Japan'];
  const promises = [];
  for (let i = 0; i < 100; ++i) {
    const troop = {
      country: countries[Math.floor(countries.length * Math.random())],
      id: i,
      loc: [360 * Math.random() - 180, 180 * Math.random() - 90],
      dest: [360 * Math.random() - 180, 180 * Math.random() - 90],
      size: 100 * Math.random() + 100,
      unitAD: 10 * Math.random() + 10,
      unitHP: 100 * Math.random() + 100,
      fogR: 10,
      surroundingTroops: 0,
      attackR: 10 * Math.random() + 10,
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
    const dest = geolib.computeDestinationPoint(movedTroop.loc, 10000, bearing);
    Troop.troopModel.findOneAndUpdate({ _id: troop._id }, { $set: { loc: [dest.longitude, dest.latitude] } }, (err, data) => {
      if (err) console.error(err);
      console.log(data.loc);
    });
    return movedTroop;
  });

  res.json(movedTroops);
};

const fight = async (req, res) => {
  const troops = await Troop.troopModel.find((err, result) => result);
  await Promise.all(troops.map(async (troop) => {
    const proximityTroops = await Troop.troopModel.find({ loc: { $geoWithin: { $centerSphere: [troop.loc, 1000 / 6378.1] } }, country: { $ne: troop.country } }, (err, result) => result);
    await Troop.troopModel.findOneAndUpdate({ _id: troop._id }, { $set: { surroundingTroops: proximityTroops.length } }, (err) => {
      if (err) console.error(err);
    });
    return proximityTroops;
  }));

  const foughtTroops = await Promise.all(troops.map(async (troop) => {
    const proximityTroops = await Troop.troopModel.find({ loc: { $geoWithin: { $centerSphere: [troop.loc, 1000 / 6378.1] } }, country: { $ne: troop.country } }, (err, result) => result);
    const damage = proximityTroops.reduce((totalATK, enemy) => (totalATK + enemy.unitAD), 0);
    await Troop.troopModel.findOneAndUpdate({ _id: troop._id }, { $inc: { unitHP: -damage } }, (err) => {
      if (err) console.error(err);
    });
    return proximityTroops;
  }));

  res.send(foughtTroops);
};

const move = async () => {
  const troops = await Troop.troopModel.find((err, result) => result);
  await Promise.all(troops.map((troop) => {
    const movedTroop = troop;
    const bearing = geolib.getBearing({ longitude: movedTroop.loc[0], latitude: movedTroop.loc[1] }, { longitude: movedTroop.dest[0], latitude: movedTroop.dest[1] });
    const dest = geolib.computeDestinationPoint(movedTroop.loc, 10000, bearing);
    Troop.troopModel.findOneAndUpdate({ _id: troop._id }, { $set: { loc: [dest.longitude, dest.latitude] } }, (err) => {
      if (err) console.error(err);
    });
    return movedTroop;
  }));
};

const gameLoop = () => {
  move();
  setTimeout(gameLoop, 100);
};

const getMyTroops = async (req, res) => {
  console.log(req.query.country);
  const countryData = {};
  countryData.Troops = await Troop.troopModel.find({ country: req.query.country }, (err, result) => result);
  const otherData = {};
  otherData.Troops = await Troop.troopModel.find({ country: { $ne: req.query.country } }, (err, result) => result);
  setTimeout(gameLoop, 1000);
  res.send({ countryData, otherData });
};

const update = async (req, res) => {
  console.log(req.body.country);
  const data = JSON.parse(req.body.data);
  // await Promise.all(data.countryData.Troops.map((troop) => {
  //   return Troop.troopModel.findOneAndUpdate({ _id: troop._id }, { $set: { dest: troop.dest } }, (err, result) => {
  //     // console.log(data);
  //     if (err) return Promise.reject(err);
  //     else return result;
  //   });
  // }));
  const countryData = {};
  countryData.Troops = await Troop.troopModel.find({ country: req.body.country }, (err, result) => result);
  const otherData = {};
  const enemy = (await Troop.troopModel.find({ country: { $ne: req.body.country } }, (err, result) => result));
  otherData.Troops = enemy.map((troop) => {
    const result = {};
    Object.assign(result, troop._doc);
    result.AD = troop.unitAD * troop.size;
    result.HP = troop.unitHP * troop.size;
    return result;
  });
  res.send({ countryData, otherData });
  // res.send('hi');
};

const updateDest = async (req, res) => {
  const modifiedTroop = req.body;
  Troop.troopModel.findOneAndUpdate({ _id: modifiedTroop._id }, { $set: { dest: modifiedTroop.dest } }, (err, data) => {
    // console.log(data);
    if (err) return Promise.reject(err);
    else return data;
  });
  res.send('yup');
};


export { addExperimentalData, showAllTroops, moveTroops, fight, refresh, getMyTroops, update, updateDest };
