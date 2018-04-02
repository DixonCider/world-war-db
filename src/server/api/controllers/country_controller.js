import { Country, Block } from 'models';
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
    const country = {
      name: element,
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

export { init, addBlock, getReasource, getTechtree, developeTech, getCountryList };
