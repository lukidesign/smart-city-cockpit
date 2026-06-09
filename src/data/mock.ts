export const navItems = ['POPULATION', 'ECONOMICS', 'COMMAND', 'ECOLOGY']

export const statsCards = [
  { value: '250,640,320', color: 'cyan', pct: 72 },
  { value: '562,320,480', color: 'orange', pct: 88 },
  { value: '365,720,560', color: 'cyan', pct: 54 }
]

export interface Machine {
  id: string
  name: string
  value: string
  kind: 'pump-blue' | 'pump-orange' | 'pump-white' | 'robot'
}

export const machines: Machine[] = [
  { id: 'HB1201', name: 'Name', value: '20,560', kind: 'pump-blue' },
  { id: 'HB1203', name: 'Name', value: '20,560', kind: 'pump-orange' },
  { id: 'HB1205', name: 'Name', value: '20,560', kind: 'pump-white' },
  { id: 'HB1207', name: 'Name', value: '20,560', kind: 'robot' }
]

export const police = {
  number: '26,345',
  alarms: '256',
  industry: [
    { label: 'Primary Industry', value: 1256, pct: 92, color: 'cyan' },
    { label: 'Secondary Industry', value: 520, pct: 40, color: 'orange' },
    { label: 'Tertiary-industry', value: 36, pct: 14, color: 'orange' }
  ]
}

export const safety = [
  { value: '1.320', label: 'Key Projects', trend: 'up' },
  { value: '2.508', label: 'Start A Business', trend: 'down' }
]

export const airQuality = {
  cities: [
    { name: 'City A', grade: 'C I' },
    { name: 'City B', grade: 'C I' },
    { name: 'City C', grade: 'C II' },
    { name: 'City D', grade: 'C II' },
    { name: 'City E', grade: 'C II' },
    { name: 'City F', grade: 'C II' }
  ],
  legend: [
    { range: '0-50 (Excellent)', color: '#36e0a6' },
    { range: '51-100 (good)', color: '#38d6ff' },
    { range: '100-150 (mild)', color: '#ffd24d' },
    { range: '151-200 (moderate)', color: '#ff9a3c' }
  ]
}

export const industryMap = [
  { name: 'Scientific Research', value: 57, color: '#38d6ff' },
  { name: 'Wholesale Retail', value: 24, color: '#2f7bff' },
  { name: 'Construction', value: 18, color: '#5b8dff' },
  { name: 'Others', value: 11, color: '#ff9a3c' }
]

export const factoryData = {
  index: '560,000',
  order: '1,958,200',
  floating: '54,472',
  passenger: '158,935'
}

export const warning = {
  index: '3,660,000',
  working: '3,958,200',
  floating: '250,420',
  passenger: '158,230'
}

/* ---------- detail screen ---------- */
export const dataOverview = {
  gross: '8,620,480',
  perCapita: '150,630',
  completed: '2,520',
  bars: [
    { label: 'Gen', value: 1256, pct: 92, color: 'cyan' },
    { label: 'Imp', value: 520, pct: 42, color: 'orange' },
    { label: 'Urg', value: 36, pct: 14, color: 'orange' }
  ]
}

export const totalCase = [
  { value: '1.320', label: 'Employee', trend: 'up' },
  { value: '2.508', label: 'Shuttle', trend: 'down' }
]

export const ecosystem = {
  indicators: [
    { name: 'Water', max: 100 },
    { name: 'Land', max: 100 },
    { name: 'Surface', max: 100 },
    { name: 'Atmos', max: 100 },
    { name: 'Air', max: 100 }
  ],
  values: [80, 20, 90, 30, 98],
  rows: [
    { label: 'Water', pct: 80 },
    { label: 'Land', pct: 20 },
    { label: 'Surface', pct: 90 },
    { label: 'Atmos', pct: 30 },
    { label: 'Air', pct: 98 }
  ]
}

export const waterQuality = {
  x: ['City A', 'City B', 'City C', 'City D', 'City E', 'City F'],
  cod: [30, 55, 48, 78, 40, 62],
  bacterial: [42, 60, 35, 70, 50, 45]
}

export const machineDetail = {
  code: 'HB1205 C-2',
  parts: [
    { name: 'Mount', state: 'Normal', maintenance: 3, abnormal: false },
    { name: 'Articulation', state: 'Normal', maintenance: 1, abnormal: false },
    { name: 'End Effector', state: 'Abnormal', maintenance: 4, abnormal: true },
    { name: 'Upkeep', countdown: '256 D', pct: 28 }
  ]
}
