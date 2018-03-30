import { Country } from 'models';
import { Countries } from 'game';

const init = async (req, res) => {
  console.log(Countries);
  await Countries.forEach((element) => {
    const country = {
      name: element,
      money: 1000,
      enemyList: [],
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

export { init };
