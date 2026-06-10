import type { IconType } from "react-icons";

export type Palette = "purple" | "green" | "blue" | "orange" | "teal" | "rose";

export type HeroContent = {
  title: string;
  highlight: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  searchPlaceholder: string;
};

export type Position = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  tags: string[];
  palette: Palette;
  badge?: string;
  experienceLevel?: string;
  startDate?: string;
  contractType?: string;
  applicants?: number;
  domain?: string;
};

export type Domain = {
  title: string;
  openPositions: string;
  icon: IconType;
};

export type BrandLogo = {
  name: string;
  icon: IconType;
  className: string;
};

export type WorkStep = {
  title: string;
  copy: string;
  icon: IconType;
  variant?: string;
};

export type FeaturedCompany = {
  name: string;
  industry: string;
  location: string;
  positions: string;
  employees: string;
  palette: Palette;
  tags: string[];
  domain: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};
