import { test } from 'models';

const getTestA = async (req, res) => {
  const data = await test.testA.find((err, result) => result);
  console.log('[test_controller:getTestA] successful');
  res.json(data);
};

const saveTestA = (req, res) => {
  const data = {
    id: new Date().getTime(),
    name: req.body.name,
  };
  console.log(data);
  test.testA.create(data, (err, result) => {
    if (err) console.error(err);
    else {
      console.log(`[test_controller:saveTestA] successful, id: ${result.id}`);
    }
  });
  res.send('saved');
};

export {
  getTestA,
  saveTestA,
};
