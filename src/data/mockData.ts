import type { ItemCard, PortfolioProject, ProcessStep, Testimonial } from '../types/content'

const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`

export const projects: ItemCard[] = [
  { id: 'p1', title: 'Atrium Residence', subtitle: 'Prague', image: image('photo-1600585154340-be6161a56a0c') },
  { id: 'p2', title: 'Lumen House', subtitle: 'Vienna', image: image('photo-1516455590571-18256e5bb9ff') },
  { id: 'p3', title: 'Gallery 19', subtitle: 'Zurich', image: image('photo-1600047509782-20d39509f26d') },
  { id: 'p4', title: 'Monolith Office', subtitle: 'Berlin', image: image('photo-1524758631624-e2822e304c36') },
]

export const services: ItemCard[] = [
  { id: 's1', title: 'Architecture', description: 'Private and commercial spaces with measured proportion.', image: image('photo-1464146072230-91cabc968266') },
  { id: 's2', title: 'Interior Design', description: 'Material-led interiors with quiet character.', image: image('photo-1617104678098-de229db51175') },
  { id: 's3', title: 'Project Delivery', description: 'Technical detailing and quality supervision.', image: image('photo-1486406146926-c627a92ad1ab') },
]

export const articles: ItemCard[] = [
  { id: 'a1', title: 'Quiet Luxury by Design', description: 'Why less visual noise creates stronger premium experience.', image: image('photo-1616046229478-9901c5536a45') },
  { id: 'a2', title: 'Rhythm as Structure', description: 'Using repetition for calm and precision in spatial composition.', image: image('photo-1600121848594-d8644e57abab') },
  { id: 'a3', title: 'Material Honesty', description: 'A practical approach to timeless palettes and longevity.', image: image('photo-1600566753151-384129cf4e3e') },
]

export const processSteps: ProcessStep[] = [
  {
    id: 'ps1',
    title: 'Dialogue',
    brief:
      'We listen to how light should feel in your space—mood, rhythm, and daily use—before anything is drawn.',
    detail:
      'Workshops and site walks establish vocabulary: warm vs cool, contrast, where silence matters, and how rooms hand off to one another. We align with architects and clients on scenes for morning, work, and evening so the brief is emotional as well as technical.',
    highlights: ['Scene mapping', 'Stakeholder alignment', 'Light + mood brief'],
    image: '/whatwedo1.png',
  },
  {
    id: 'ps2',
    title: 'Study',
    brief:
      'Only careful planning unlocks the full potential of your interiors without costly changes later.',
    detail:
      'We model layers of light—ambient, task, accent—and map circuits, dimming curves, and control groups. Drawings specify fixture families, CCT, and glare control so the scheme stays coherent when value-engineering pressure appears.',
    highlights: ['Lux calculations', 'Dimming strategy', 'Fixture schedule'],
    image: '/whatwedo2.png',
  },
  {
    id: 'ps3',
    title: 'Construction',
    brief:
      'Fixtures, dimming, and integration are coordinated on site so the atmosphere reads as one calm system.',
    detail:
      'We coordinate with trades for ceiling depth, wiring paths, and commissioning. Focus scenes are tuned on site: trim levels, fade times, and emergency overrides—so the space feels finished, not “almost there.”',
    highlights: ['Site coordination', 'Commissioning', 'Scene tuning'],
    image: '/whatwedo3.png',
  },
  {
    id: 'ps4',
    title: 'Furnishing',
    brief:
      'Final layers—texture, reflectance, and placement—are tuned so light and material read in balance.',
    detail:
      'Furniture and finishes change bounce and shadow. We adjust aim, beam, and intensity so materials read true—stone, timber, fabric—and the room keeps the calm hierarchy we designed in dialogue.',
    highlights: ['Material bounce', 'Accent adjustment', 'Final layering'],
    image: '/whatwedo4.png',
  },
  {
    id: 'ps5',
    title: 'Research',
    brief:
      'We document performance and feeling, refining palettes and scenes for longevity and quiet character.',
    detail:
      'After handover we capture feedback, energy use where relevant, and maintenance notes. Lessons feed the next project—so your space stays legible, beautiful, and easy to live with for years.',
    highlights: ['Post-occupancy', 'Maintenance pack', 'Continuous refinement'],
    image: '/whatwedo1.png',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'The lighting programme changed how we inhabit the house—calm in the evening, precise where we work. Nothing feels decorative; it feels inevitable.',
    name: 'Elena Vostrá',
    role: 'Homeowner, Prague',
    photo: image('photo-1544005313-94ddf0286df2'),
  },
  {
    id: 't2',
    quote:
      'u1 translated a vague brief into layers of light we could sign off with confidence. Site coordination was quiet and exact.',
    name: 'Marcus Lind',
    role: 'Development lead, Nordic Office Group',
    photo: image('photo-1506794778202-cad84cf45f1d'),
  },
  {
    id: 't3',
    quote:
      'Guests still comment on the atmosphere. We asked for timeless; the result feels both restrained and generous.',
    name: 'Sofia Renard',
    role: 'Boutique hotel director, Geneva',
    photo: image('photo-1534528741775-53994a69daeb'),
  },
]

export const portfolioProjects: PortfolioProject[] = [
  { id: 'pp1', title: 'Ortho Dent', category: '2025', image: '/Ortho%20Dent%20(2025).jpg', type: 'large', offset: 'none' },
  { id: 'pp2', title: 'Plzeňský prazdroj', category: '2025', image: '/plzensky-prazdroj-2025.jpg', type: 'small', offset: 'md' },
  { id: 'pp3', title: 'Seyfor - Trimaran', category: '2025', image: '/Seyfor%20-%20Trimaran%20(2025).jpg', type: 'medium', offset: 'sm' },
  { id: 'pp4', title: 'Volareza - Restaurace Evropa', category: '2025', image: '/Volareza%20-%20Restaurace%20Evropa%20(2025).jpg', type: 'small', offset: 'none' },
]
