import { Country, Block } from 'models';
import { Countries, TechTree } from 'game';

const init = async (req, res) => {
  console.log(TechTree);
  await Countries.forEach((element) => {
    const country = {
      name: element,
      resource: {
        a: 1000,
        b: 1000,
        c: 1000,
        x: 1000,
        y: 1000,
        z: 1000,
      },
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
  console.log(country);
  const reasource = await Country.countryModel.findOne({ name: country }, 'resource', (err, result) => {
    if (err) console.error(result);
    return reasource;
  });
  res.send(reasource);
};

export { init, addBlock, getReasource };
