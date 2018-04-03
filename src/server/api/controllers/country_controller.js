import { Country, Block, resourcePoint, Troop } from 'models';
import { Countries, TechTree } from 'game';

const getCountryList = (req, res) => {
  res.send(Countries);
};

const init = async (req, res) => {
  Country.countryModel.remove({}, (err) => {
    if (err) {
      console.error(err);
    }
  });
  await Countries.forEach(async (element) => {
    console.log(element);
    const loc = [360 * Math.random() - 180, 180 * Math.random() - 90];
    const country = {
      name: element,
      capital: loc,
      troop: {
        fogR: 10,
        attackR: 10,
      },
      resource: {
        a: 100,
        b: 100,
        c: 100,
        d: 100,
        x: 100,
        y: 100,
        z: 100,
      },
      money: 1000,
      enemyList: [],
      techTree: TechTree,
      multipliers: {
        atk: 1,
        hp: 1,
        money: 1,
      },
    };
    await Country.countryModel.update({ name: element }, country, { upsert: true }, (err, result) => {
      if (err) console.error(err);
      else {
        console.log(`successful, id: ${element}`);
      }
      return result;
    });
  });
  res.send('successful');
};

const addBlock = (req, res) => {
  console.log(req.body);
  const blockInfo = req.body;
  Block.blockModel.update({ name: blockInfo.name }, blockInfo, { upsert: true }, (err, result) => {
    if (err) console.error(err);
    else {
      console.log(`successful, id: ${result.name}`);
    }
  });
  res.send(`gotya ${blockInfo.name}`);
};

// const trade = (req, res) => {
// };

const getReasource = async (req, res) => {
  const { country } = req.query;
  const reasource = await Country.countryModel.findOne({ name: country }, 'resource', (err, result) => {
    if (err) console.error(result);
    return reasource;
  });
  if (!reasource) {
    res.send('country not found');
  } else {
    res.send(reasource);
  }
};

const getTechtree = async (req, res) => {
  const { country } = req.query;
  const techTree = await Country.countryModel.findOne({ name: country }, 'techTree', (err, result) => {
    if (err) console.error(err);
    return result;
  });
  console.log(techTree);
  if (!techTree) {
    res.send('country not found');
  } else {
    res.send(techTree);
  }
};

const developeTech = async (req, res) => {
  const { country, tech, type = 'atk' } = req.query;
  console.log(country);
  const { techTree } = await Country.countryModel.findOne({ name: country }, 'techTree', (err, result) => {
    if (err) console.err(err);
    return result;
  });
  const techIndex = techTree[type].findIndex(x => x.name === tech);
  if (!techIndex || techTree[type][techIndex - 1].developed) {
    const { resource } = await Country.countryModel.findOne({ name: country }, 'resource', (err, result) => {
      if (err) console.error(err);
      return result;
    });
    const isWealthy = Object.keys(resource).reduce((acc, cur) => ((resource[cur] >= techTree[type][techIndex].cost[cur]) ? acc : acc - 1), 0);
    if (isWealthy >= 0) {
      console.log(techTree[type][techIndex].cost);
      await Country.countryModel.updateOne(
        { name: country, [`techTree.${type}.name`]: tech },
        {
          $set: {
            [`techTree.${type}.$.developed`]: true,
          },
        }, (err, result) => {
          console.log(result);
          if (err) console.error(err);
          return result;
        },
      );
      await Country.countryModel.update(
        { name: country },
        {
          $inc: {
            'resource.a': -techTree[type][techIndex].cost.a / 2,
            'resource.b': -techTree[type][techIndex].cost.b / 2,
            'resource.c': -techTree[type][techIndex].cost.c / 2,
            'resource.d': -techTree[type][techIndex].cost.d / 2,
            'resource.x': -techTree[type][techIndex].cost.x / 2,
            'resource.y': -techTree[type][techIndex].cost.y / 2,
            'resource.z': -techTree[type][techIndex].cost.z / 2,
          },
        }, (err, result) => {
          console.log(result);
          if (err) console.error(err);
          return result;
        },
      );
      console.log(techTree[type][techIndex].cost);
      res.send('ok');
    } else {
      res.send('not enough reasources');
    }
  } else {
    res.send('prev undeveloped');
  }
};

const makeResourcePoints = async (req, res) => {
  resourcePoint.resourcePointModel.remove({}, (err) => {
    if (err) {
      console.error(err);
    }
  });
  const promises = [];
  for (let i = 0; i < 50; ++i) {
    const loc = [360 * Math.random() - 180, 180 * Math.random() - 90];
    const troop = {
      id: i,
      loc,
      cost: {
        a: 100,
        b: 100,
        c: 100,
        d: 100,
        x: 100,
        y: 100,
        z: 100,
      },
      range: 100,
    };
    promises.push(resourcePoint.resourcePointModel.create(troop, (err, result) => {
      if (err) console.error(err);
      else {
        console.log(`successful, id: ${result.id}`);
      }
    }));
  }
  Promise.all(promises)
    .then(() => res.send('randomed resource'))
    .catch((e) => {
      console.error(e);
      res.send('error at inserting data');
    });
};

const getResourcePoints = async (req, res) => {
  const resourcePoints = await resourcePoint.resourcePointModel.find({}, (err, result) => {
    if (err) console.error(err);
    return result;
  });
  console.log(resourcePoints);
  res.send(resourcePoints);
};

const mineResource = async (req, res) => {
  const { country, troopID, resourceID } = req.body;
  const { loc, cost, range } = await resourcePoint.resourcePointModel.findOne({ id: resourceID });
  const nearTroops = await Troop.troopModel.aggregate([
    {
      $geoNear: {
        near: loc,
        distanceField: 'distance',
        includeLocs: 'loc',
        spherical: true,
      },
    },
    { $addFields: { isIn: { $subtract: ['$distance', range * 0.0174532925] } } },
    // { $match: { isIn: { $lte: 0 } } },
    // { $match: { country } },
  ]);
  console.log(nearTroops);
  const isin = nearTroops.filter(troop => troop.id === troopID);
  if (isin) {
    const { resource } = await Country.countryModel.findOne({ name: country }, 'resource', (err, result) => {
      if (err) console.error(err);
      return result;
    });
    console.log(cost);
    console.log(resource);
    const isWealthy = Object.keys(resource).reduce((acc, cur) => ((resource[cur] >= cost[cur]) ? acc : acc - 1), 0);
    if (isWealthy >= 0) {
      await Country.countryModel.update(
        { name: country },
        {
          $inc: {
            'resource.a': -cost.a / 2,
            'resource.b': -cost.b / 2,
            'resource.c': -cost.c / 2,
            'resource.d': -cost.d / 2,
            'resource.x': -cost.x / 2,
            'resource.y': -cost.y / 2,
            'resource.z': -cost.z / 2,
          },
        }, (err, result) => {
          console.log(result);
          if (err) console.error(err);
          return result;
        },
      );
      res.send('traded');
    } else {
      res.send('too poor');
    }
  } else {
    res.send('not in range');
  }
};

export { init, addBlock, getReasource, getTechtree, developeTech, getCountryList, makeResourcePoints, getResourcePoints, mineResource };
