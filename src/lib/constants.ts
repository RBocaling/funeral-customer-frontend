export enum CasketPart {
  BODY = "body",
  CAP = "cap",
  HANDLE = "handle", 
  ENDCAP = "endcap",
  PILLOW = "pillow",
  MOULDING = "moulding",
  INTERIOR = "interior",
  HARDWARE = "hardware"
}

export enum Material {
  GLOSSY = "glossy",
  WOOD = "wood",
  FABRIC = "fabric",
  METAL = "metal",
  PLASTIC = "plastic"
}

export interface CasketPartConfig {
  name: string;
  color: string;
  material: Material;
}

export const materials = {
  [Material.GLOSSY]: {
    name: "High-Gloss Finish",
    description: "Smooth reflective surface with a premium look"
  },
  [Material.WOOD]: {
    name: "Natural Wood",
    description: "Traditional wood grain texture"
  },
  [Material.FABRIC]: {
    name: "Fabric",
    description: "Soft textile finish for interior components"
  },
  [Material.METAL]: {
    name: "Metal",
    description: "Durable metallic finish for hardware components"
  },
  [Material.PLASTIC]: {
    name: "Composite",
    description: "Versatile and durable synthetic material"
  }
};

// Default configurations for each casket part
export const partConfigs: Record<CasketPart, CasketPartConfig> = {
  [CasketPart.BODY]: {
    name: "Main Body",
    color: "#FFFFFF",
    material: Material.GLOSSY
  },
  [CasketPart.CAP]: {
    name: "Cap Panel",
    color: "#FFFFFF",
    material: Material.GLOSSY
  },
  [CasketPart.HANDLE]: {
    name: "Handles",
    color: "#D4AF37",
    material: Material.METAL
  },
  [CasketPart.ENDCAP]: {
    name: "Metal Endcaps",
    color: "#D4AF37",
    material: Material.METAL
  },
  [CasketPart.PILLOW]: {
    name: "Pillow",
    color: "#F8F8FF",
    material: Material.FABRIC
  },
  [CasketPart.MOULDING]: {
    name: "Decorative Edges",
    color: "#D4AF37",
    material: Material.METAL
  },
  [CasketPart.INTERIOR]: {
    name: "Interior Lining",
    color: "#F8F8FF",
    material: Material.FABRIC
  },
  [CasketPart.HARDWARE]: {
    name: "Hardware",
    color: "#D4AF37",
    material: Material.METAL
  }
};

// Standard casket dimensions in meters
export const CASKET_DIMENSIONS = {
  length: 2.1, // 210 cm
  width: 0.7,  // 70 cm
  height: 0.6  // 60 cm
};

// Available styles typical in Philippine caskets
export const CASKET_STYLES = [
  { id: "traditional", name: "Traditional" },
  { id: "modern", name: "Modern" },
  { id: "catholic", name: "Catholic" },
  { id: "premium", name: "Premium" },
  { id: "basic", name: "Basic" }
];


export const revenueData = [
  { name: "Jan", value: 12000 },
  { name: "Feb", value: 19000 },
  { name: "Mar", value: 15000 },
  { name: "Apr", value: 22000 },
  { name: "May", value: 18000 },
  { name: "Jun", value: 25000 },
];

export const bookingsData = [
  { name: "Mon", value: 4 },
  { name: "Tue", value: 3 },
  { name: "Wed", value: 5 },
  { name: "Thu", value: 2 },
  { name: "Fri", value: 4 },
  { name: "Sat", value: 6 },
  { name: "Sun", value: 3 },
];
