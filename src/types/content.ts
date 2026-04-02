export interface ItemCard {
  id: string
  title: string
  subtitle?: string
  description?: string
  image: string
}

export interface PortfolioProject {
  id: string
  title: string
  category: string
  image: string
  type: 'large' | 'medium' | 'small'
  offset?: 'none' | 'sm' | 'md'
}

export interface ProcessStep {
  id: string
  title: string
  /** Short lead line under the title */
  brief: string
  /** Longer editorial paragraph */
  detail: string
  /** Short outcome labels (chips) */
  highlights: string[]
  image: string
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  /** Portrait / avatar for the quote */
  photo: string
}

export type TeamGroup = 'staff' | 'leadership' | 'founders'

export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  group: TeamGroup
}
