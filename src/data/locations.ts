export const locations = {
  'Europe & Africa': {
    'Germany': {
      Berlin: {
        id: 'berlin',
        lat: 52.52,
        lng: 13.405,
        solutions: ['Office space', 'Coworking membership', 'Dedicated desk', 'Meeting rooms', 'Virtual Office']
      },
      Munich: {
        id: 'munich',
        lat: 48.1351,
        lng: 11.582,
        solutions: ['Office space', 'Coworking membership', 'Meeting rooms']
      },
      Frankfurt: {
        id: 'frankfurt',
        lat: 50.1109,
        lng: 8.6821,
        solutions: ['Office space', 'Dedicated desk', 'Virtual Office']
      },
      Hamburg: { id: 'hamburg', lat: 53.5511, lng: 9.9937, solutions: ['Coworking membership', 'Meeting rooms'] },
      Cologne: { id: 'cologne', lat: 50.9375, lng: 6.9603, solutions: ['Office space', 'Virtual Office'] }
    },
    'United Kingdom': {
      London: {
        id: 'london',
        lat: 51.5074,
        lng: -0.1278,
        solutions: ['Office space', 'Coworking membership', 'Dedicated desk', 'Meeting rooms', 'Virtual Office']
      },
      Manchester: {
        id: 'manchester',
        lat: 53.4808,
        lng: -2.2426,
        solutions: ['Office space', 'Coworking membership', 'Meeting rooms']
      },
      Birmingham: {
        id: 'birmingham',
        lat: 52.4862,
        lng: -1.8904,
        solutions: ['Coworking membership', 'Dedicated desk']
      },
      Glasgow: { id: 'glasgow', lat: 55.8642, lng: -4.2518, solutions: ['Office space', 'Virtual Office'] },
      Edinburgh: { id: 'edinburgh', lat: 55.9533, lng: -3.1883, solutions: ['Coworking membership', 'Meeting rooms'] }
    },
    'France': {
      Paris: {
        id: 'paris',
        lat: 48.8566,
        lng: 2.3522,
        solutions: ['Office space', 'Coworking membership', 'Dedicated desk', 'Meeting rooms', 'Virtual Office']
      },
      Lyon: { id: 'lyon', lat: 45.764, lng: 4.8357, solutions: ['Office space', 'Coworking membership'] },
      Marseille: { id: 'marseille', lat: 43.2965, lng: 5.3698, solutions: ['Coworking membership', 'Meeting rooms'] },
      Nice: { id: 'nice', lat: 43.7102, lng: 7.262, solutions: ['Office space', 'Virtual Office'] },
      Bordeaux: { id: 'bordeaux', lat: 44.8378, lng: -0.5792, solutions: ['Dedicated desk', 'Meeting rooms'] }
    },
    'Nigeria': {
      'Lagos': {
        id: 'lagos',
        lat: 6.5244,
        lng: 3.3792,
        solutions: ['Office space', 'Coworking membership', 'Meeting rooms']
      },
      'Abuja': { id: 'abuja', lat: 9.0765, lng: 7.3986, solutions: ['Coworking membership', 'Virtual Office'] },
      'Port Harcourt': { id: 'port-harcourt', lat: 4.8156, lng: 7.0498, solutions: ['Office space', 'Meeting rooms'] },
      'Ibadan': { id: 'ibadan', lat: 7.3775, lng: 3.947, solutions: ['Coworking membership'] }
    },
    'Italy': {
      Rome: {
        id: 'rome',
        lat: 41.9028,
        lng: 12.4964,
        solutions: ['Office space', 'Coworking membership', 'Dedicated desk', 'Meeting rooms', 'Virtual Office']
      },
      Milan: {
        id: 'milan',
        lat: 45.4642,
        lng: 9.19,
        solutions: ['Office space', 'Coworking membership', 'Meeting rooms']
      },
      Naples: { id: 'naples', lat: 40.8518, lng: 14.2681, solutions: ['Coworking membership', 'Virtual Office'] },
      Turin: { id: 'turin', lat: 45.0703, lng: 7.6869, solutions: ['Office space', 'Dedicated desk'] },
      Florence: { id: 'florence', lat: 43.7696, lng: 11.2558, solutions: ['Coworking membership', 'Meeting rooms'] }
    },
    'Spain': {
      Madrid: {
        id: 'madrid',
        lat: 40.4168,
        lng: -3.7038,
        solutions: ['Office space', 'Coworking membership', 'Dedicated desk', 'Meeting rooms', 'Virtual Office']
      },
      Barcelona: {
        id: 'barcelona',
        lat: 41.3851,
        lng: 2.1734,
        solutions: ['Office space', 'Coworking membership', 'Meeting rooms']
      },
      Valencia: { id: 'valencia', lat: 39.4699, lng: -0.3763, solutions: ['Coworking membership', 'Dedicated desk'] },
      Seville: { id: 'seville', lat: 37.3891, lng: -5.9845, solutions: ['Office space', 'Virtual Office'] },
      Bilbao: { id: 'bilbao', lat: 43.263, lng: -2.935, solutions: ['Coworking membership', 'Meeting rooms'] }
    }
  },
  'North America': {
    'United States': {
      'New York': {
        id: 'new-york',
        lat: 40.7128,
        lng: -74.006,
        solutions: ['Office space', 'Coworking membership', 'Dedicated desk', 'Meeting rooms', 'Virtual Office']
      },
      'Los Angeles': {
        id: 'los-angeles',
        lat: 34.0522,
        lng: -118.2437,
        solutions: ['Office space', 'Coworking membership', 'Meeting rooms']
      },
      'Chicago': {
        id: 'chicago',
        lat: 41.8781,
        lng: -87.6298,
        solutions: ['Office space', 'Dedicated desk', 'Virtual Office']
      },
      'Houston': { id: 'houston', lat: 29.7604, lng: -95.3698, solutions: ['Coworking membership', 'Meeting rooms'] },
      'San Francisco': {
        id: 'san-francisco',
        lat: 37.7749,
        lng: -122.4194,
        solutions: ['Office space', 'Coworking membership', 'Dedicated desk']
      }
    },
    'Canada': {
      Toronto: {
        id: 'toronto',
        lat: 43.6532,
        lng: -79.3832,
        solutions: ['Office space', 'Coworking membership', 'Dedicated desk', 'Meeting rooms', 'Virtual Office']
      },
      Vancouver: {
        id: 'vancouver',
        lat: 49.2827,
        lng: -123.1207,
        solutions: ['Office space', 'Coworking membership', 'Meeting rooms']
      },
      Montreal: {
        id: 'montreal',
        lat: 45.5017,
        lng: -73.5673,
        solutions: ['Coworking membership', 'Dedicated desk', 'Virtual Office']
      },
      Calgary: { id: 'calgary', lat: 51.0447, lng: -114.0719, solutions: ['Office space', 'Meeting rooms'] },
      Ottawa: { id: 'ottawa', lat: 45.4215, lng: -75.6972, solutions: ['Coworking membership', 'Virtual Office'] }
    },
    'Mexico': {
      'Mexico City': {
        id: 'mexico-city',
        lat: 19.4326,
        lng: -99.1332,
        solutions: ['Office space', 'Coworking membership', 'Dedicated desk', 'Meeting rooms', 'Virtual Office']
      },
      'Guadalajara': {
        id: 'guadalajara',
        lat: 20.6597,
        lng: -103.3496,
        solutions: ['Office space', 'Coworking membership']
      },
      'Monterrey': {
        id: 'monterrey',
        lat: 25.6866,
        lng: -100.3161,
        solutions: ['Coworking membership', 'Meeting rooms']
      },
      'Puebla': { id: 'puebla', lat: 19.0414, lng: -98.2063, solutions: ['Office space', 'Virtual Office'] },
      'Cancun': { id: 'cancun', lat: 21.1619, lng: -86.8515, solutions: ['Coworking membership', 'Meeting rooms'] }
    }
  },
  'Latin & South America': {
    Brazil: {
      'Sao Paulo': {
        id: 'sao-paulo',
        lat: -23.5505,
        lng: -46.6333,
        solutions: ['Office space', 'Coworking membership', 'Dedicated desk', 'Meeting rooms', 'Virtual Office']
      },
      'Rio de Janeiro': {
        id: 'rio-de-janeiro',
        lat: -22.9068,
        lng: -43.1729,
        solutions: ['Office space', 'Coworking membership', 'Meeting rooms']
      },
      'Brasilia': {
        id: 'brasilia',
        lat: -15.7801,
        lng: -47.9292,
        solutions: ['Coworking membership', 'Dedicated desk']
      },
      'Salvador': { id: 'salvador', lat: -12.9714, lng: -38.5014, solutions: ['Office space', 'Virtual Office'] },
      'Fortaleza': {
        id: 'fortaleza',
        lat: -3.7319,
        lng: -38.5267,
        solutions: ['Coworking membership', 'Meeting rooms']
      }
    },
    Argentina: {
      'Buenos Aires': {
        id: 'buenos-aires',
        lat: -34.6037,
        lng: -58.3816,
        solutions: ['Office space', 'Coworking membership', 'Dedicated desk', 'Meeting rooms', 'Virtual Office']
      },
      'Cordoba': { id: 'cordoba', lat: -31.4201, lng: -64.1888, solutions: ['Office space', 'Coworking membership'] },
      'Rosario': { id: 'rosario', lat: -32.9442, lng: -60.6505, solutions: ['Coworking membership', 'Meeting rooms'] },
      'Mendoza': { id: 'mendoza', lat: -32.8908, lng: -68.8272, solutions: ['Office space', 'Virtual Office'] },
      'Tucuman': { id: 'tucuman', lat: -26.8083, lng: -65.2176, solutions: ['Coworking membership', 'Dedicated desk'] }
    },
    Chile: {
      'Santiago': {
        id: 'santiago',
        lat: -33.4489,
        lng: -70.6693,
        solutions: ['Office space', 'Coworking membership', 'Dedicated desk', 'Meeting rooms', 'Virtual Office']
      },
      'Valparaiso': {
        id: 'valparaiso',
        lat: -33.0472,
        lng: -71.6127,
        solutions: ['Office space', 'Coworking membership']
      },
      'Concepcion': {
        id: 'concepcion',
        lat: -36.8201,
        lng: -73.044,
        solutions: ['Coworking membership', 'Meeting rooms']
      },
      'La Serena': { id: 'la-serena', lat: -29.9027, lng: -71.252, solutions: ['Office space', 'Virtual Office'] },
      'Antofagasta': {
        id: 'antofagasta',
        lat: -23.6509,
        lng: -70.3975,
        solutions: ['Coworking membership', 'Dedicated desk']
      }
    }
  },
  'Asia & Pacific': {
    Japan: {
      Tokyo: {
        id: 'tokyo',
        lat: 35.6762,
        lng: 139.6503,
        solutions: ['Office space', 'Coworking membership', 'Dedicated desk', 'Meeting rooms', 'Virtual Office']
      },
      Osaka: {
        id: 'osaka',
        lat: 34.6937,
        lng: 135.5023,
        solutions: ['Office space', 'Coworking membership', 'Meeting rooms']
      },
      Kyoto: { id: 'kyoto', lat: 35.0116, lng: 135.7681, solutions: ['Coworking membership', 'Dedicated desk'] },
      Nagoya: { id: 'nagoya', lat: 35.1815, lng: 136.9066, solutions: ['Office space', 'Virtual Office'] },
      Sapporo: { id: 'sapporo', lat: 43.0618, lng: 141.3545, solutions: ['Coworking membership', 'Meeting rooms'] }
    },
    Australia: {
      Sydney: {
        id: 'sydney',
        lat: -33.8688,
        lng: 151.2093,
        solutions: ['Office space', 'Coworking membership', 'Dedicated desk', 'Meeting rooms', 'Virtual Office']
      },
      Melbourne: {
        id: 'melbourne',
        lat: -37.8136,
        lng: 144.9631,
        solutions: ['Office space', 'Coworking membership', 'Meeting rooms']
      },
      Brisbane: { id: 'brisbane', lat: -27.4698, lng: 153.0251, solutions: ['Coworking membership', 'Dedicated desk'] },
      Perth: { id: 'perth', lat: -31.9505, lng: 115.8605, solutions: ['Office space', 'Virtual Office'] },
      Adelaide: { id: 'adelaide', lat: -34.9285, lng: 138.6007, solutions: ['Coworking membership', 'Meeting rooms'] }
    },
    China: {
      Beijing: {
        id: 'beijing',
        lat: 39.9042,
        lng: 116.4074,
        solutions: ['Office space', 'Coworking membership', 'Dedicated desk', 'Meeting rooms', 'Virtual Office']
      },
      Shanghai: {
        id: 'shanghai',
        lat: 31.2304,
        lng: 121.4737,
        solutions: ['Office space', 'Coworking membership', 'Meeting rooms']
      },
      Guangzhou: {
        id: 'guangzhou',
        lat: 23.1291,
        lng: 113.2644,
        solutions: ['Coworking membership', 'Dedicated desk']
      },
      Shenzhen: { id: 'shenzhen', lat: 22.5431, lng: 114.0579, solutions: ['Office space', 'Virtual Office'] },
      Chengdu: { id: 'chengdu', lat: 30.5728, lng: 104.0668, solutions: ['Coworking membership', 'Meeting rooms'] }
    },
    India: {
      Mumbai: {
        id: 'mumbai',
        lat: 19.076,
        lng: 72.8777,
        solutions: ['Office space', 'Coworking membership', 'Dedicated desk', 'Meeting rooms', 'Virtual Office']
      },
      Delhi: {
        id: 'delhi',
        lat: 28.6139,
        lng: 77.209,
        solutions: ['Office space', 'Coworking membership', 'Meeting rooms']
      },
      Bangalore: {
        id: 'bangalore',
        lat: 12.9716,
        lng: 77.5946,
        solutions: ['Coworking membership', 'Dedicated desk', 'Virtual Office']
      },
      Hyderabad: { id: 'hyderabad', lat: 17.385, lng: 78.4867, solutions: ['Office space', 'Meeting rooms'] },
      Chennai: { id: 'chennai', lat: 13.0827, lng: 80.2707, solutions: ['Coworking membership', 'Dedicated desk'] }
    }
  }
} as const

export type Location = typeof locations

export type Region = keyof typeof locations

export type Country = {
  [R in Region]: keyof Location[R]
}[Region]

export type City = {
  [R in Region]: {
    [C in keyof Location[R]]: keyof Location[R][C]
  }[keyof Location[R]]
}[Region]

export type Solution = 'Office space' | 'Coworking membership' | 'Dedicated desk' | 'Meeting rooms' | 'Virtual Office'

export type LocationWithId = {
  id: string
  lat: number
  lng: number
  solutions: Solution[]
}

export type CityObject = {
  [key in Country]: City[]
}
