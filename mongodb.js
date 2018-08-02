db.troops.aggregate([
  {
    $geoNear: {
      near: [112.62, 49.515],
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
      multipliers: '$countryInfo.multipliers',
    },
  },
  { $addFields: { isIn: { $subtract: ['$distance', { $multiply: ['$attackR', 0.0174532925] }] } } },
  { $match: { isIn: { $lte: 0 } } },
  { $match: { country: { $ne: 'DPRK' } } },
  { $match: { size: { $gt: 0 } } },
  { $match: { country: { $in: ['Korea'] } } }
]).pretty()

db.troops.aggregate([
  {
    $match: { country: 'USA' },
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
    }
  }
]).pretty()