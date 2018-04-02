import geolib from 'geolib';
import { Troop } from 'models';

const enemyList = {
  DPRK: [],
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
      {
        $lookup: {
          from: 'countries',
          localField: 'country',
          foreignField: 'name',
          as: 'attackR',
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
      { $addFields: { isIn: { $subtract: ['$distance', { $multiply: ['$attackR', 0.0174532925] }] } } },
      // { $addFields: { isIn: { $subtract: ['$distance', { $multiply: ['$attackR', 0.0174532925] }] } } },
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
    const dest = geolib.computeDestinationPoint(movedTroop.loc, 1000000, bearing);
    Troop.troopModel.findOneAndUpdate({ _id: troop._id }, { $set: { loc: [dest.longitude, dest.latitude] } }, (err) => {
      if (err) console.error(err);
    });
    return movedTroop;
  }));
};

export { fight, move, enemyList };
