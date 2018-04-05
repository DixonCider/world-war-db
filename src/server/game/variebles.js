// import { countryInfo } from "../api/controllers/country_controller";

const Countries = ['DPRK', 'USA', 'Korea', 'Russia', 'PRC', 'Japan', 'India', 'Philippines', 'Vietnam'];

const TechTree = {
  atk: [
    {
      name: 'carbines',
      effect: 5,
      developed: false,
      cost: {
        a: 100, b: 100, c: 0, d: 0, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'grenades',
      effect: 4.5,
      developed: false,
      cost: {
        a: 200, b: 150, c: 50, d: 0, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'recoilless rifles',
      effect: 4,
      developed: false,
      cost: {
        a: 0, b: 300, c: 0, d: 200, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'cannons',
      effect: 3.5,
      developed: false,
      cost: {
        a: 300, b: 400, c: 200, d: 200, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'tanks',
      effect: 3,
      developed: false,
      cost: {
        a: 0, b: 0, c: 300, d: 300, x: 100, y: 0, z: 0,
      },
    },
    {
      name: 'artillery',
      effect: 2.5,
      developed: false,
      cost: {
        a: 0, b: 500, c: 0, d: 400, x: 150, y: 50, z: 0,
      },
    },
    {
      name: 'missiles',
      effect: 2,
      developed: false,
      cost: {
        a: 0, b: 0, c: 0, d: 0, x: 150, y: 0, z: 0,
      },
    },
  ],
  hp: [
    {
      name: 'level1',
      effect: 5,
      developed: false,
      cost: {
        a: 0, b: 50, c: 0, d: 50, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'level2',
      effect: 4.5,
      developed: false,
      cost: {
        a: 50, b: 0, c: 150, d: 0, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'level3',
      effect: 4,
      developed: false,
      cost: {
        a: 100, b: 0, c: 150, d: 50, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'level4',
      effect: 3.5,
      developed: false,
      cost: {
        a: 200, b: 100, c: 150, d: 150, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'level5',
      effect: 3,
      developed: false,
      cost: {
        a: 0, b: 150, c: 0, d: 150, x: 0, y: 0, z: 50,
      },
    },
    {
      name: 'level6',
      effect: 2.5,
      developed: false,
      cost: {
        a: 200, b: 0, c: 250, d: 0, x: 0, y: 50, z: 100,
      },
    },
    {
      name: 'level7',
      effect: 2,
      developed: false,
      cost: {
        a: 0, b: 0, c: 0, d: 0, x: 0, y: 150, z: 0,
      },
    },
  ],
  money: [
    {
      name: 'silver',
      effect: 1.5,
      developed: false,
      cost: {
        a: 100, b: 0, c: 0, d: 50, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'gold',
      effect: 2,
      developed: false,
      cost: {
        a: 100, b: 0, c: 150, d: 0, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'platnum',
      effect: 2.5,
      developed: false,
      cost: {
        a: 0, b: 150, c: 150, d: 100, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'plutonium',
      effect: 3,
      developed: false,
      cost: {
        a: 350, b: 150, c: 200, d: 150, x: 0, y: 0, z: 0,
      },
    },
    {
      name: 'taafeite',
      effect: 3.5,
      developed: false,
      cost: {
        a: 0, b: 0, c: 200, d: 250, x: 0, y: 100, z: 0,
      },
    },
    {
      name: 'diamond',
      effect: 4,
      developed: false,
      cost: {
        a: 400, b: 50, c: 200, d: 0, x: 50, y: 0, z: 50,
      },
    },
    {
      name: 'californium',
      effect: 4.5,
      developed: false,
      cost: {
        a: 0, b: 0, c: 0, d: 0, x: 0, y: 0, z: 150,
      },
    },
  ],
  nuclear: {
    name: 'nuclear',
    developed: false,
    cost: {
      a: 0, b: 0, c: 0, d: 0, x: 200, y: 200, z: 200,
    },
  },
};

const countrySetting = {
  DPRK: {
    capital: [125.45, 39.2],
  },
  USA: {
    capital: [77.01, 38.53],
  },
  Korea: {
    capital: [126.58, 37.33],
  },
  Russia: {
    capital: [37.37, 55.45],
  },
  PRC: {
    capital: [116.4074, 39.9042],
  },
  Japan: {
    capital: [139.46, 35.41],
  },
  Mexico: {
    capital: [99.08, 19.26],
  },
  India: {
    capital: [77.125, 28.368],
  },
  Philippines: {
    capital: [120.9842, 14.5995],
  },
  Vietnam: {
    capital: [105.8342, 21.0278],
  },
};

const resourcePoints = [
  //japan
  { loc: [ 129.877142, 32.742328], award: { a: 100, b: 0, c: 0, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [ 139.616563, 35.712897], award: { a: 0, b: 0, c: 100, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [ 142.547220, 43.235613], award: { a: 0, b: 0, c: 0, d: 100, x: 0, y: 0, z: 0 } },

  //India
  { loc: [  79.871791,  6.889443], award: { a: 100, b: 0, c: 0, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [  79.515289, 28.431459], award: { a: 100, b: 0, c: 0, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [  75.224081, 31.885813], award: { a: 0, b: 0, c: 100, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [  85.070526, 23.271745], award: { a: 0, b: 0, c: 100, d: 0, x: 0, y: 0, z: 0 } },

  //Philippines
  { loc: [ 121.266152, 16.559306], award: { a: 100, b: 0, c: 0, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [ 118.624756,  9.757966], award: { a: 0, b: 0, c: 100, d: 0, x: 0, y: 0, z: 0 } },

  //ROK
  { loc: [ 127.055286, 37.588093], award: { a: 0, b: 100, c: 0, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [ 128.958744, 35.204669], award: { a: 0, b: 0, c: 0, d: 100, x: 0, y: 0, z: 0 } },
  { loc: [ 127.738077, 36.036585], award: { a: 0, b: 0, c: 0, d: 100, x: 0, y: 0, z: 0 } },

  //Russia
  { loc: [  85.962533, 59.876697], award: { a: 100, b: 0, c: 0, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [ 153.715827, 59.479278], award: { a: 100, b: 0, c: 0, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [  46.948223, 55.505575], award: { a: 0, b: 100, c: 0, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [  54.335714, 72.665571], award: { a: 0, b: 100, c: 0, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [-147.492698, 65.940563], award: { a: 0, b: 0, c: 100, d: 0, x: 0, y: 0, z: 0 } },

  //Vietnam
  { loc: [ 107.334647, 11.126552], award: { a: 0, b: 100, c: 0, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [ 105.183676, 21.372154], award: { a: 0, b: 0, c: 100, d: 0, x: 0, y: 0, z: 0 } },

  //USA
  { loc: [-107.996955, 47.051595], award: { a: 0, b: 100, c: 0, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [-108.915143, 43.008858], award: { a: 0, b: 0, c: 100, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [-123.871052, 41.236009], award: { a: 0, b: 0, c: 100, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [-148.984013, 64.111260], award: { a: 0, b: 0, c: 0, d: 100, x: 0, y: 0, z: 0 } },
  { loc: [-101.582117, 30.563058], award: { a: 0, b: 0, c: 0, d: 100, x: 0, y: 0, z: 0 } },
  { loc: [-155.410847, 19.863460], award: { a: 0, b: 0, c: 0, d: 100, x: 0, y: 0, z: 0 } },

  //China
  { loc: [ 101.753611, 25.511450], award: { a: 100, b: 0, c: 0, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [ 106.026030, 36.765979], award: { a: 100, b: 0, c: 0, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [ 109.706637, 19.181890], award: { a: 0, b: 0, c: 100, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [ 116.427692, 39.852524], award: { a: 0, b: 0, c: 100, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [ 128.883652, 46.653291], award: { a: 0, b: 0, c: 0, d: 100, x: 0, y: 0, z: 0 } },

  //DPRK
  { loc: [ 125.746391, 39.016361], award: { a: 100, b: 0, c: 0, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [  45.811175,  3.117825], award: { a: 100, b: 0, c: 0, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [   2.742218, 22.277981], award: { a: 0, b: 0, c: 100, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [ 126.996543, 38.330337], award: { a: 0, b: 0, c: 100, d: 0, x: 0, y: 0, z: 0 } },
  { loc: [ 129.283851, 41.912439], award: { a: 0, b: 0, c: 0, d: 100, x: 0, y: 0, z: 0 } },
];

export { Countries, TechTree, countrySetting, resourcePoints };
