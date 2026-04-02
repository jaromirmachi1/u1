import type { TeamGroup, TeamMember } from '../types/content'

const portrait = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=82`

export const teamGroupOrder: { id: TeamGroup; label: string }[] = [
  { id: 'staff', label: 'Staff' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'founders', label: 'Founders' },
]

export const teamMembers: TeamMember[] = [
  {
    id: 'tm1',
    name: 'Eliška Nováková',
    role: 'Studio coordinator · Prague',
    image: portrait('photo-1573496359142-b8d87734a5a2'),
    group: 'staff',
  },
  {
    id: 'tm2',
    name: 'Tomáš Vlk',
    role: 'Visualization lead',
    image: portrait('photo-1507003211169-0a1dd7228f2d'),
    group: 'staff',
  },
  {
    id: 'tm3',
    name: 'Nina Horáková',
    role: 'Materials & FF&E',
    image: portrait('photo-1580489944761-15a19d654956'),
    group: 'staff',
  },
  {
    id: 'tm4',
    name: 'Jaromír Popek',
    role: 'Executive, Development · Brno',
    image: portrait('photo-1560250097-0b93528c311a'),
    group: 'leadership',
  },
  {
    id: 'tm5',
    name: 'Michal Gróf',
    role: 'Business director · Brno',
    image: portrait('photo-1472099645785-5658abf4ff4e'),
    group: 'leadership',
  },
  {
    id: 'tm6',
    name: 'Lucie Marešová',
    role: 'Creative director',
    image: portrait('photo-1438761681033-6461ffad8d80'),
    group: 'leadership',
  },
  {
    id: 'tm7',
    name: 'Adam Uhlíř',
    role: 'Co-founder · Principal',
    image: portrait('photo-1519085360753-af0119f7cbe7'),
    group: 'founders',
  },
  {
    id: 'tm8',
    name: 'Kristýna Blažková',
    role: 'Co-founder · Strategy',
    image: portrait('photo-1544005313-94ddf0286df2'),
    group: 'founders',
  },
]
