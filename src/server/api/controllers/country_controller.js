import { Country, Block } from 'models';
import { Countries, TechTree } from 'game';

const init = async (req, res) => {
  Country.countryModel.remove({}, (err) => {
    if (err) {
      console.error(err);
    }
  });
  await Countries.forEach((element) => {
    const country = {
      name: element,
      troop: {
        fogR: 10,
        attackR: 10,
      },
      resource: {
        a: 1000,
        b: 1000,
        c: 1000,
        x: 1000,
        y: 1000,
        z: 1000,
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
    Country.countryModel.update({ name: element }, country, { upsert: true }, (err, result) => {
      if (err) console.error(err);
      else {
        console.log(`successful, id: ${result.name}`);
      }
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
  console.log(country, tech, type);
  await Country.countryModel.update({ name: country, [`techTree.${type}.name`]: tech }, { $set: { [`techTree.${type}.$.developed`]: true } }, (err, result) => {
    console.log(result);
    if (err) console.error(err);
    return result;
  });
  res.send('ok');
};

export { init, addBlock, getReasource, getTechtree, developeTech };
