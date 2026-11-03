export type FlavorId = 'vanilla' | 'cookies' | 'mint' | 'strawberry' | 'apple'

export interface Flavor {
  id: FlavorId
  seed: number
  label: string
  kcal: number
  /** page + hero colors that animate when this flavor becomes active */
  stage: string
  h1: string
  h2: string
  btn: string
  scoop: { hi: string; base: string; shade: string; fleck: string; chunk?: string; swirl?: string }
  cup: { body: string; dark: string; band: string; name: string }
}

export const FLAVORS: Flavor[] = [
  {
    id: 'vanilla', seed: 11, label: 'Swedish Vanilj', kcal: 240,
    stage: '#5ebbe9', h1: '#4aa0d3', h2: '#2b84b0', btn: '#1e4684',
    scoop: { hi: '#fffaf0', base: '#f4ead2', shade: '#d9c9a4', fleck: '#6b5a40' },
    cup: { body: '#5da4dc', dark: '#3f7fb8', band: '#f6e9c4', name: '#4a2a1a' },
  },
  {
    id: 'cookies', seed: 23, label: 'Cookies and Kram', kcal: 280,
    stage: '#e88a6a', h1: '#c07350', h2: '#a65937', btn: '#6e3321',
    scoop: { hi: '#fbf3e4', base: '#ece1cc', shade: '#c7b79c', fleck: '#4a3226', chunk: '#3a261d' },
    cup: { body: '#a55a3c', dark: '#7d3f27', band: '#efe0c0', name: '#f6e9c4' },
  },
  {
    id: 'mint', seed: 37, label: 'Mint Chokladchip', kcal: 270,
    stage: '#6eca8c', h1: '#52a56f', h2: '#3d8a58', btn: '#1f6b42',
    scoop: { hi: '#f3f4e2', base: '#dfe3c6', shade: '#b4bb96', fleck: '#4b3a2c', chunk: '#5a4332' },
    cup: { body: '#6cc88f', dark: '#46a26c', band: '#ffffff', name: '#4a2a1a' },
  },
  {
    id: 'strawberry', seed: 41, label: 'Strawbar Swirl', kcal: 220,
    stage: '#f99b7d', h1: '#e7774f', h2: '#d65f3b', btn: '#8c2c1d',
    scoop: { hi: '#ffe3de', base: '#f4b4ad', shade: '#d98880', fleck: '#e24b55', swirl: '#e5646c' },
    cup: { body: '#e24646', dark: '#b82e33', band: '#ffffff', name: '#5a1c1c' },
  },
  {
    id: 'apple', seed: 53, label: 'Swedish Apple Pie', kcal: 250,
    stage: '#e9a678', h1: '#cd8d62', h2: '#b9704a', btn: '#74401f',
    scoop: { hi: '#fffaf0', base: '#f3e8cd', shade: '#d6c39c', fleck: '#b9773d', swirl: '#d19a58' },
    cup: { body: '#d9a360', dark: '#b87f3d', band: '#f6e9c4', name: '#4a2a1a' },
  },
]

export const byId = (id: FlavorId) => FLAVORS.find(f => f.id === id)!

export const MENU: { id: FlavorId; price: string; desc: string }[] = [
  { id: 'vanilla', price: '$12.00', desc: 'Swedish style light ice cream' },
  { id: 'mint', price: '$14.00', desc: 'Swedish mint chokaldchip' },
  { id: 'strawberry', price: '$10.00', desc: 'Swedish Strawbar swirl ice cream' },
  { id: 'cookies', price: '$12.00', desc: 'Swedish cookies and kram' },
]

export const FAQS = [
  { icon: '🍨', q: 'What makes your ice cream different?', a: 'We use real tropical fruits, fresh dairy, and zero artificial flavours. Every batch is handcrafted in small quantities to maintain quality.' },
  { icon: '🚚', q: 'Do you offer home delivery?', a: 'Yes — we deliver chilled, in insulated packaging, to addresses within our delivery area. Enter your postcode at checkout to check availability.' },
  { icon: '🌱', q: 'Is your ice cream vegan or dairy-free?', a: 'We have a rotating selection of vegan and dairy-free flavours made with oat and coconut bases. Look for the leaf label on the tub.' },
  { icon: '📦', q: 'Can I order in bulk for events/parties?', a: 'Absolutely. Get in touch at least a week ahead and we will put together a party order with a custom flavour mix.' },
]

export const REVIEW = {
  quote: '“We’ve seen a significant increase in user engagement since launching the new features. Feedback from users has been overwhelmingly positive, and we’re excited to implement further improvements. This platform has truly transformed our approach to customer interaction.”',
  name: 'Aisha Khan',
  role: '“Product Manager”',
}
export const REVIEWS = [0, 1, 2, 3].map(i => ({ ...REVIEW, id: i }))