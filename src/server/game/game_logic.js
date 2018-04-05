import geolib from 'geolib';
import { Troop, Country } from 'models';

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

const regen = async () => {
  const countries = await Country.countryModel.find();
  countries.forEach(async (country) => {
    await Country.countryModel.update(
      { name: country.name },
      {
        $inc: {
          money: country.income,
        },
      },
    );
  });
};

const fight = async () => {
  const troops = await Troop.troopModel.find({ size: { $gte: 0 } }, (err, result) => result);

  await Promise.all(troops.map(async (troop) => {
    const enemys = Object.keys(enemyList).filter(country => enemyList[country].includes(troop.country));
    // console.log(enemys);
    try {
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
        { $addFields: { isIn: { $subtract: ['$distance', { $multiply: ['$attackR', 0.0174532925] }] } } },
        { $match: { isIn: { $lte: 0 } } },
        { $match: { country: { $ne: troop.country } } },
        { $match: { size: { $gt: 0 } } },
        { $match: { country: { $in: enemys } } },
      ]);
      const damage = proximityTroops.reduce((totalATK, enemy) => Math.floor(totalATK + enemy.unitAD * enemy.size), 0);
      await Troop.troopModel.findOneAndUpdate({ _id: troop._id, size: { $gte: 0 } }, { $inc: { size: -damage / troop.unitHP } });
    } catch (e) {
      console.error(e);
    };
  }))
    .catch((e) => {
      console.error(e);
    });
};

const move = async () => {
  const speed = 60000;
  const troops = await Troop.troopModel.find((err, result) => result);
  await Promise.all(troops.map((troop) => {
    const movedTroop = troop;
    const distance = geolib.getDistance({ longitude: movedTroop.loc[0], latitude: movedTroop.loc[1] }, { longitude: movedTroop.dest[0], latitude: movedTroop.dest[1] });
    if (distance < speed) {
      Troop.troopModel.findOneAndUpdate({ _id: troop._id }, { $set: { loc: movedTroop.dest } }, (err) => {
        if (err) console.error(err);
      });
    } else {
      const bearing = geolib.getBearing({ longitude: movedTroop.loc[0], latitude: movedTroop.loc[1] }, { longitude: movedTroop.dest[0], latitude: movedTroop.dest[1] });
      const dest = geolib.computeDestinationPoint(movedTroop.loc, speed, bearing);
      Troop.troopModel.findOneAndUpdate({ _id: troop._id }, { $set: { loc: [dest.longitude, dest.latitude] } }, (err) => {
        if (err) console.error(err);
      });
    }
    return movedTroop;
  }));
};

export { fight, move, enemyList, regen };
