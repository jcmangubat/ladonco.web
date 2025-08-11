import offerings from "./service-offerings.json";

export const getServiceOfferings = (...indices: number[]) => {
  if (indices.length === 0) return offerings;
  return offerings.filter((group) => indices.includes(group.idx));
};

export interface ServiceItem {
  name: string;
  slug: string;
  index: number;
}

export interface ServiceCategory {
  title: string;
  accent: string;
  icon: string;
  services: ServiceItem[];
}

export const getServiceCategories = (): ServiceCategory[] => {
  return offerings.map((group) => ({
    title: group.title,
    accent: group.accent,
    icon: group.icon,
    services: group.services.map((name, i) => ({
      name,
      slug: name.toLowerCase().replace(/ & | /g, "-"),
      index: i + 1,
    })),
  }));
};