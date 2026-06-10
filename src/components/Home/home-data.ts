import {
  FiCode,
  FiDatabase,
  FiDollarSign,
  FiEdit3,
  FiHeart,
  FiMonitor,
  FiSearch,
  FiSend,
  FiTrendingUp,
  FiUploadCloud,
  FiUser,
  FiUserPlus,
  FiVideo,
  FiZoomIn,
} from "react-icons/fi";
import {
  FaGoogle,
  FaMicrosoft,
  FaShopify,
  FaSpotify,
  FaUber,
} from "react-icons/fa";
import { RiVerifiedBadgeLine } from "react-icons/ri"
import type { NavbarAction, NavbarItem } from "./Navbar";
import type {
  BrandLogo,
  Domain,
  FeaturedCompany,
  HeroContent,
  Position,
  Testimonial,
  WorkStep,
} from "./home-types";
import { PiUserPlus } from "react-icons/pi";

export const navbarItems: NavbarItem[] = [
  { label: "Find Positions", href: "#featured-positions" },
  { label: "Browse Companies", href: "#featured-companies" },
];

export const navbarActions: NavbarAction[] = [
  { label:"Switch to Recruiter", href: "/recruiter", variant: "primary", icon: FiUser },
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup", variant: "primary" },
  
];

export const heroContent: HeroContent = {
  title: "Discover more than 5000+ Positions",
  highlight: "5000+ Positions",
  subtitle:
    "Great platform for the position seeker that searching for new career heights and passionate about startups.",
  imageSrc: "/home/homepositions.png",
  imageAlt: "Candidate reviewing open positions",
  searchPlaceholder: "What position are you looking for?",
};

export const sectionTitles = {
  featured: "Featured Positions",
  hot: "Hot Positions",
  domains: "Popular Domains",
  latest: "Latest Positions Open",
  trusted: "Companies That Trust Our Platform",
  howItWorks: "How JobPilot Works",
  companies: "Featured Companies",
  testimonials: "Clients Testimonial",
};

export const featuredPositions: Position[] = [
  {
    id: "featured-1",
    title: "Email Marketing Specialist",
    company: "Rebrand Studio",
    location: "San Francisco, CA",
    salary: "$75k - $110k",
    type: "Part Time",
    posted: "7 days ago",
    tags: ["Marketing", "Remote"],
    palette: "green",
    experienceLevel: "2-3 years",
    startDate: "2023-10-01",
    applicants: 120,
    contractType: "CDI",
    domain: "Digital Marketing",
  },
  {
    id: "featured-2",
    title: "Senior Brand Designer",
    company: "Digital Craft",
    location: "New York, NY",
    salary: "$90k - $125k",
    type: "Part Time",
    posted: "3 days ago",
    tags: ["Design", "Hybrid"],
    palette: "blue",
    experienceLevel: "2-3 years",
    startDate: "2023-09-15",
    applicants: 85,
    contractType: "CDI",
    domain: "Graphics & Design",
  },
  {
    id: "featured-3",
    title: "Visual Marketing Coordinator",
    company: "Northstar Labs",
    location: "Austin, TX",
    salary: "$68k - $94k",
    type: "Part Time",
    posted: "5 days ago",
    tags: ["Content", "Growth"],
    palette: "rose",
    experienceLevel: "2-3 years",
    startDate: "2023-10-10",
    applicants: 60,
    contractType: "CDI",
    domain: "Digital Marketing",
  },
  {
    id: "featured-4",
    title: "Visual Designer",
    company: "Mosaic Studio",
    location: "Seattle, WA",
    salary: "$82k - $118k",
    type: "Part Time",
    posted: "2 days ago",
    tags: ["UI", "Figma"],
    palette: "orange",
    experienceLevel: "2-3 years",
    startDate: "2023-09-20",
    applicants: 95,
    contractType: "CDI",
    domain: "Graphics & Design",
  },
  {
    id: "featured-5",
    title: "Senior Product Designer",
    company: "Evergreen Apps",
    location: "Denver, CO",
    salary: "$105k - $145k",
    type: "Full Time",
    posted: "1 day ago",
    tags: ["Product", "SaaS"],
    palette: "green",
    experienceLevel: "2-3 years",
    startDate: "2023-10-05",
    applicants: 110,
    contractType: "CDI",
    domain: "Graphics & Design",
  },
  {
    id: "featured-6",
    title: "Lead UI/UX Designer",
    company: "Orbit Works",
    location: "Remote",
    salary: "$115k - $150k",
    type: "Full Time",
    posted: "4 days ago",
    tags: ["Research", "Design"],
    palette: "blue",
    experienceLevel: "2-3 years",
    startDate: "2023-09-25",
    applicants: 130,
    contractType: "CDI",
    domain: "Graphics & Design",
  },
];

export const hotPositions: Position[] = [
  {
    id: "hot-1",
    title: "Brand Designer",
    company: "Nova Haus",
    location: "Chicago, IL",
    salary: "$84k - $120k",
    type: "Full Time",
    posted: "Today",
    tags: ["Branding", "Studio"],
    palette: "orange",
    badge: "Hot",
    domain: "Graphics & Design",
    experienceLevel: "2-3 years",
    startDate: "2023-10-01",
    applicants: 150,
    contractType: "CDI",
  },
  {
    id: "hot-2",
    title: "Interactive Developer",
    company: "Pixel Foundry",
    location: "Remote",
    salary: "$98k - $140k",
    type: "Full Time",
    posted: "Today",
    tags: ["React", "Motion"],
    palette: "blue",
    badge: "Hot",
    domain: "Code & Programming",
    experienceLevel: "2-3 years",
    startDate: "2023-10-05",
    applicants: 140,
    contractType: "CDI",
  },
  {
    id: "hot-3",
    title: "Innovation Developer",
    company: "Future Grid",
    location: "Boston, MA",
    salary: "$112k - $155k",
    type: "Full Time",
    posted: "1 day ago",
    tags: ["AI", "Prototype"],
    palette: "teal",
    badge: "Hot",
    domain: "Code & Programming",
    experienceLevel: "2-3 years",
    startDate: "2023-10-10",
    applicants: 160,
    contractType: "CDI",
  },
];

export const latestPositions: Position[] = [
  {
    id: "latest-1",
    title: "Social Media Assistant",
    company: "Kindred Social",
    location: "Miami, FL",
    salary: "$55k - $72k",
    type: "Part Time",
    posted: "New",
    tags: ["Social", "Entry"],
    palette: "green",
    experienceLevel: "0-1 years",
    startDate: "2023-10-15",
    applicants: 30,
    contractType: "CDI",
    domain: "Digital Marketing",
  },
  {
    id: "latest-2",
    title: "Interactive Developer",
    company: "Sparkline",
    location: "Remote",
    salary: "$92k - $132k",
    type: "Full Time",
    posted: "New",
    tags: ["Frontend", "WebGL"],
    palette: "teal",
    experienceLevel: "2-3 years",
    startDate: "2023-10-20",
    applicants: 45,
    contractType: "CDI",
    domain: "Code & Programming",
  },
  {
    id: "latest-3",
    title: "Social Media Assistant",
    company: "Bright Path",
    location: "Los Angeles, CA",
    salary: "$58k - $76k",
    type: "Full Time",
    posted: "New",
    tags: ["Content", "Community"],
    palette: "blue",
    experienceLevel: "0-1 years",
    startDate: "2023-10-18",
    applicants: 25,
    contractType: "CDI",
    domain: "Digital Marketing",
  },
  {
    id: "latest-4",
    title: "Brand Designer",
    company: "Outline Co.",
    location: "Portland, OR",
    salary: "$78k - $105k",
    type: "Contract",
    posted: "2 days ago",
    tags: ["Identity", "Print"],
    palette: "blue",
    experienceLevel: "0-1 years",
    startDate: "2023-10-18",
    applicants: 25,
    contractType: "CDI",
    domain: "Graphics & Design",
  },
  {
    id: "latest-5",
    title: "Brand Designer",
    company: "Studio Marlo",
    location: "Remote",
    salary: "$80k - $112k",
    type: "Full Time",
    posted: "2 days ago",
    tags: ["Visual", "Brand"],
    palette: "rose",
    experienceLevel: "2-3 years",
    startDate: "2023-10-18",
    applicants: 40,
    contractType: "CDI",
    domain: "Graphics & Design",
  },
  {
    id: "latest-6",
    title: "Interactive Developer",
    company: "Bluewave",
    location: "Atlanta, GA",
    salary: "$96k - $136k",
    type: "Full Time",
    posted: "3 days ago",
    tags: ["React", "Design Systems"],
    palette: "blue",
    experienceLevel: "2-3 years",
    startDate: "2023-10-18",
    applicants: 50,
    contractType: "CDI",
    domain: "Code & Programming",
  },
];

export const domains: Domain[] = [
  { title: "Graphics & Design", openPositions: "324 open roles", icon: FiEdit3 },
  { title: "Code & Programming", openPositions: "421 open roles", icon: FiCode },
  { title: "Digital Marketing", openPositions: "289 open roles", icon: FiTrendingUp },
  { title: "Video & Animation", openPositions: "118 open roles", icon: FiVideo },
  { title: "Music & Audio", openPositions: "97 open roles", icon: FiMonitor },
  { title: "Account & Finance", openPositions: "176 open roles", icon: FiDollarSign },
  { title: "Health & Care", openPositions: "132 open roles", icon: FiHeart },
  { title: "Data Science", openPositions: "241 open roles", icon: FiDatabase },
];

const logoCycle: BrandLogo[] = [
  { name: "Microsoft", icon: FaMicrosoft, className: "text-[#f25022]" },
  { name: "Spotify", icon: FaSpotify, className: "text-[#1db954]" },
  { name: "Shopify", icon: FaShopify, className: "text-[#7ab55c]" },
  { name: "Uber", icon: FaUber, className: "text-[#111111]" },
  { name: "Google", icon: FaGoogle, className: "text-[#4285f4]" },
];

export const trustedLogos: BrandLogo[] = Array.from({ length: 25 }, (_, index) => {
  return logoCycle[index % logoCycle.length];
});

export const workSteps: WorkStep[] = [
  {
    title: "Create Account",
    copy: "Set up a profile that keeps your search organized.",
    icon: PiUserPlus,
  },
  {
    title: "Upload CV/Resume",
    copy: "Keep one polished resume ready for every match.",
    icon: FiUploadCloud,
    variant: "blue",
  },
  {
    title: "Search Positions",
    copy: "Filter roles by domain, location, and work style.",
    icon: FiZoomIn,
  },
  {
    title: "Apply Job",
    copy: "Send applications and track responses in one place.",
    icon: RiVerifiedBadgeLine,
  },
];

export const featuredCompanies: FeaturedCompany[] = [
  {
    name: "CloudLoop",
    industry: "SaaS Platform",
    location: "New York, USA",
    positions: "14 open positions",
    employees: "200+ employees",
    palette: "blue",
    tags: ["SaaS", "Cloud"],
    domain: "Software & Technology"
  },
  {
    name: "Designo",
    industry: "Creative Studio",
    location: "Austin, USA",
    positions: "9 open positions",
    employees: "80+ employees",
    palette: "purple",
    tags: ["Design", "Branding"],
    domain: "Graphics & Design"
  },
  {
    name: "Northwind",
    industry: "AI Research",
    location: "Remote",
    positions: "21 open positions",
    employees: "350+ employees",
    palette: "teal",
    tags: ["AI", "Research"],
    domain: "Data Science"
  },
  {
    name: "Orbit Labs",
    industry: "Product Studio",
    location: "Seattle, USA",
    positions: "7 open positions",
    employees: "120+ employees",
    palette: "orange",
    tags: ["Product", "Innovation"],
    domain: "Software & Technology"
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "JobPilot helped our team find strong candidates quickly while keeping every application easy to review.",
    name: "Robert Fox",
    role: "Hiring Lead",
  },
  {
    quote:
      "The position cards are clear, the company profiles feel trustworthy, and the candidate flow is refreshingly calm.",
    name: "Marvin McKinney",
    role: "Product Recruiter",
  },
  {
    quote:
      "We filled three specialist roles from one campaign and had better applicant quality than our previous channels.",
    name: "Jane Cooper",
    role: "Talent Partner",
  },
    {
    quote:
      "JobPilot helped our team find strong candidates quickly while keeping every application easy to review.",
    name: "Robert Fox2",
    role: "Hiring Lead",
  },
  {
    quote:
      "The position cards are clear, the company profiles feel trustworthy, and the candidate flow is refreshingly calm.",
    name: "Marvin McKinney2",
    role: "Product Recruiter",
  },
  {
    quote:
      "We filled three specialist roles from one campaign and had better applicant quality than our previous channels.",
    name: "Jane Cooper2",
    role: "Talent Partner",
  },
];

export const promoStats = [
  { label: "Open positions", value: "21,457" },
  { label: "Hiring companies", value: "1,420" },
  { label: "Monthly applicants", value: "84K" },
];
