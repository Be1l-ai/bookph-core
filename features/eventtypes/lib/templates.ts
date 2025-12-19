/**
 * Event type templates for quick creation
 */

export interface EventTypeTemplate {
  id: string;
  title: string;
  slug: string;
  length: number;
  description: string;
  category: string;
}

export const EVENT_TYPE_CATEGORIES = {
  FILIPINO_FREELANCER: "Filipino Freelancer",
  GENERAL: "General",
} as const;

export const FILIPINO_FREELANCER_TEMPLATES: EventTypeTemplate[] = [
  {
    id: "va-discovery-call",
    title: "VA Discovery Call",
    slug: "va-discovery-call",
    length: 30,
    description: "Initial consultation call to discuss virtual assistant services and client needs.",
    category: EVENT_TYPE_CATEGORIES.FILIPINO_FREELANCER,
  },
  {
    id: "one-on-one-consultation",
    title: "1-on-1 Consultation",
    slug: "one-on-one-consultation",
    length: 60,
    description: "In-depth consultation session for detailed project discussion and planning.",
    category: EVENT_TYPE_CATEGORIES.FILIPINO_FREELANCER,
  },
  {
    id: "project-kickoff",
    title: "Project Kickoff",
    slug: "project-kickoff",
    length: 45,
    description: "Initial project kickoff meeting to align on goals, deliverables, and timeline.",
    category: EVENT_TYPE_CATEGORIES.FILIPINO_FREELANCER,
  },
];

export const EVENT_TYPE_TEMPLATES: EventTypeTemplate[] = [
  ...FILIPINO_FREELANCER_TEMPLATES,
];

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: string): EventTypeTemplate[] {
  return EVENT_TYPE_TEMPLATES.filter((template) => template.category === category);
}

/**
 * Get all template categories
 */
export function getTemplateCategories(): string[] {
  return Array.from(new Set(EVENT_TYPE_TEMPLATES.map((template) => template.category)));
}

/**
 * Get template by id
 */
export function getTemplateById(id: string): EventTypeTemplate | undefined {
  return EVENT_TYPE_TEMPLATES.find((template) => template.id === id);
}
