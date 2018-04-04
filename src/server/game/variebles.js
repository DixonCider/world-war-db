// import { countryInfo } from "../api/controllers/country_controller";

const Countries = ['DPRK', 'USA', 'Korea', 'Russia', 'PRC', 'Japan', 'Mexico', 'India', 'Phillipines', 'Vietnam'];

const TechTree = {
  atk: [
    {
      name: 'carbines',
      effect: 2,
      developed: false,
      cost: {
        a: 100, b: 100, c: 0, d: 0, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'grenades',
      effect: 2.875,
      developed: false,
      cost: {
        a: 200, b: 150, c: 50, d: 0, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'recoilless rifles',
      effect: 3.605,
      developed: false,
      cost: {
        a: 0, b: 300, c: 0, d: 200, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'cannons',
      effect: 4.25,
      developed: false,
      cost: {
        a: 300, b: 400, c: 200, d: 200, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'tanks',
      effect: 4.75,
      developed: false,
      cost: {
        a: 0, b: 0, c: 300, d: 300, x: 100, y: 0, z: 0,
      },
    },
    {
      name: 'artillery',
      effect: 5.125,
      developed: false,
      cost: {
        a: 0, b: 500, c: 0, d: 400, x: 150, y: 100, z: 0,
      },
    },
    {
      name: 'missiles',
      effect: 5.375,
      developed: false,
      cost: {
        a: 0, b: 0, c: 0, d: 0, x: 200, y: 200, z: 200,
      },
    },
  ],
  hp: [
    {
      name: 'level1',
      effect: 2,
      developed: false,
      cost: {
        a: 0, b: 50, c: 0, d: 50, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'level2',
      effect: 2.875,
      developed: false,
      cost: {
        a: 50, b: 0, c: 150, d: 0, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'level3',
      effect: 3.605,
      developed: false,
      cost: {
        a: 100, b: 0, c: 150, d: 50, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'level4',
      effect: 4.25,
      developed: false,
      cost: {
        a: 200, b: 100, c: 150, d: 150, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'level5',
      effect: 4.75,
      developed: false,
      cost: {
        a: 0, b: 150, c: 0, d: 150, x: 0, y: 0, z: 50,
      },
    },
    {
      name: 'level6',
      effect: 5.125,
      developed: false,
      cost: {
        a: 200, b: 0, c: 250, d: 0, x: 0, y: 50, z: 100,
      },
    },
    {
      name: 'level7',
      effect: 5.375,
      developed: false,
      cost: {
        a: 0, b: 0, c: 0, d: 0, x: 100, y: 100, z: 100,
      },
    },
  ],
  money: [
    {
      name: 'silver',
      effect: 1.875,
      developed: false,
      cost: {
        a: 100, b: 0, c: 0, d: 50, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'gold',
      effect: 2.625,
      developed: false,
      cost: {
        a: 100, b: 0, c: 150, d: 0, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'platnum',
      effect: 3.25,
      developed: false,
      cost: {
        a: 0, b: 150, c: 150, d: 100, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'plutonium',
      effect: 3.75,
      developed: false,
      cost: {
        a: 350, b: 150, c: 200, d: 150, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'taafeite',
      effect: 4.25,
      developed: false,
      cost: {
        a: 0, b: 0, c: 200, d: 250, x: 0, y: 100, z: 0,
      },
    },
    {
      name: 'diamond',
      effect: 4.375,
      developed: false,
      cost: {
        a: 200, b: 50, c: 200, d: 0, x: 100, y: 0, z: 100,
      },
    },
    {
      name: 'californium',
      effect: 4.5,
      developed: false,
      cost: {
        a: 0, b: 0, c: 0, d: 0, x: 150, y: 150, z: 150,
      },
    },
  ],
  nuclear: {
    name: 'nuclear',
    developed: false,
    cost: {
      a: 1000, b: 1000, c: 1000, d: 1000, x: 1000, y: 1000, z: 1000,
    },
  },
};

const countrySetting = {
  DPRK: {
    capital: [39.2, 125.45],
  },
  USA: {
    capital: [38.53, 77.01],
  },
  Korea: {
    capital: [37.33, 126.58],
  },
  Russia: {
    capital: [55.45, 37.37],
  },
  Japan: {
    capital: [35.41, 139.46],
  },
  Mexico: {
    capital: [19.26, 99.08],
  },
  India: {
    capital: [28.368, 77.125],
  },
};

export { Countries, TechTree, countrySetting };
