import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// function slugify(str) {
//   return str
//     .toLowerCase()
//     .replace(/[^\w\s-]/g, "")
//     .trim()
//     .replace(/\s+/g, "-");
// }

export function stripFrontmatter(markdown: string): string {
  const frontmatterRegex = /^---\s*[\s\S]*?---\s*/;
  return markdown.replace(frontmatterRegex, "").trim();
}

export const isValidPhone = (phone: string) => {
  // basic check: at least 7–15 digits
  return /^\+?\d{7,15}$/.test(phone);
};