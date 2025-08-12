## 🏗️ Project Overview

**Ladon Construction Company Website** is a professional construction company website built for a Philippines-based construction firm. The project showcases modern web development practices using React, TypeScript, and Vite.

### 🌐 **Live Website**: [ladonco.ph](https://ladonco.ph)
### 📚 **Repository**: [github.com/jcmangubat/ladonco.web](https://github.com/jcmangubat/ladonco.web)

---

## 🛠️ **Technology Stack**

### **Core Technologies**
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript 5.5.3** - Type safety and better development experience  
- **Vite 7.0.5** - Fast build tool and development server
- **React Router DOM 6.30.1** - Client-side routing

### **UI Framework & Styling**
- **Bootstrap 5.3.7** - CSS framework for responsive design
- **Tailwind CSS** (with tailwindcss-animate) - Utility-first CSS
- **Radix UI Components** - Headless UI primitives for accessibility
- **Shadcn/UI** - Beautiful and accessible component system
- **Framer Motion 12.23.6** - Animations and transitions
- **GSAP 3.13.0** - Advanced animations

### **3D Graphics & Visualization**
- **Three.js 0.178.0** - 3D graphics
- **@react-three/fiber & @react-three/drei** - React integration for Three.js
- **GLSL Shaders** - Custom WebGL shaders (see BannerTransition component)

### **Form Handling & Validation**
- **React Hook Form 7.53.0** - Form management
- **Zod 3.23.8** - Schema validation
- **@hookform/resolvers** - Form validation integration

### **Data Management**
- **@tanstack/react-query 5.56.2** - Server state management
- **Supabase 2.49.4** - Backend as a service
- **EmailJS 4.4.1** - Email integration for contact forms

### **Additional Features**
- **AOS (Animate On Scroll) 2.3.4** - Scroll animations
- **Swiper 11.2.10** - Touch sliders/carousels
- **React Leaflet** - Interactive maps
- **Lightgallery** - Image galleries
- **Keen Slider** - Lightweight carousel
- **React Medium Image Zoom** - Image zoom functionality

---

## 📁 **Project Structure**

The project follows a well-organized structure:

```
src/
├── components/           # Reusable UI components
│   ├── IntroSection.tsx  # Hero/banner section with GLSL transitions
│   ├── AboutSection.tsx  # Company about section
│   ├── AppLayout.tsx     # Main layout wrapper
│   ├── ServicesSection.tsx
│   ├── ProjectsFeaturedSection.tsx
│   └── [other sections]
├── pages/               # Route components
│   ├── HomePage.tsx     # Main landing page
│   ├── AboutPage.tsx    # About page
│   ├── ProjectsPage.tsx # Projects gallery
│   ├── ContactPage.tsx  # Contact form
│   ├── UnderConstruction.tsx # Construction mode page
│   └── UnderMaintenance.tsx  # Maintenance mode page
├── config/
│   └── site-config.ts   # Site configuration and modes
├── styles/
│   └── global.css       # Global styles
└── shaders/             # GLSL shader files
    └── fluid.glsl       # WebGL shader for transitions
```

---

## ✨ **Key Features**

### **1. Multi-Mode Website**
The site has three operational modes:
- **Live Mode**: Full website functionality
- **Construction Mode**: "Coming soon" page with countdown
- **Maintenance Mode**: Maintenance notification page

### **2. Advanced Visual Effects**
- **WebGL/GLSL Shader Transitions**: Custom fluid transition effects between banner images
- **3D Graphics**: Three.js integration for enhanced visual experiences
- **Smooth Animations**: GSAP and Framer Motion for professional animations
- **AOS Scroll Effects**: Elements animate as they enter viewport

### **3. Modern Component Architecture**
- **Modular Design**: Separate components for each website section
- **TypeScript Integration**: Type-safe development
- **Responsive Design**: Bootstrap + custom CSS for all device sizes

### **4. Business Features**
- **Project Gallery**: Showcasing construction projects
- **Service Pages**: Detailed service offerings
- **Client Reviews**: Customer testimonials
- **Contact Integration**: Forms with EmailJS integration
- **Blog System**: Content management for updates
- **Interactive Maps**: Location display using Leaflet

---

## 🚀 **Deployment & Build**

### **Build Scripts**
```json
{
  "build:live": "vite build --mode production",
  "build:construction": "vite build --mode construction", 
  "build:maintenance": "vite build --mode maintenance",
  "deploy:live": "npm run build:live && npm run add-cname && npm run copy404 && npm run deploy"
}
```

### **Deployment Strategy**
- **GitHub Pages**: Automated deployment via `gh-pages`
- **Custom Domain**: `ladonco.ph` with CNAME configuration
- **Multi-Environment**: Separate builds for different modes

---

## 🎯 **Project Purpose & Context**

This is a **professional construction company website** for:

**Ladon Construction Services**
- **Location**: Davao City, Philippines  
- **Services**: New construction, renovations, fit-outs, IT infrastructure, maintenance
- **Target**: Residential and commercial clients
- **Contact**: contactus@ladonco.ph

The website serves as a digital portfolio and client acquisition platform, showcasing the company's expertise in construction, renovation, and specialized services.

---

## 🔧 **Technical Highlights**

### **Advanced Shader Implementation**
`BannerTransition` component demonstrates sophisticated WebGL programming:
- Custom GLSL fluid transition shaders
- WebGL context management
- Texture handling and animation
- Progressive enhancement with fallback

### **Performance Optimizations**
- **Vite**: Lightning-fast build times and HMR
- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: Multiple formats and sizes
- **Caching Strategy**: Service worker implementation

### **Accessibility & SEO**
- **Radix UI**: Accessible component primitives
- **Semantic HTML**: Proper heading hierarchy
- **Screen Reader Support**: ARIA labels and roles
- **React Helmet**: Dynamic meta tags

---

## 📊 **Current Status**

The website is currently in **"construction/live" mode** 

---

## 🎨 **Design & User Experience**

The project emphasizes:
- **Professional Aesthetics**: Clean, construction-industry appropriate design
- **Interactive Elements**: Engaging animations and transitions
- **Visual Storytelling**: Hero banners with inspirational quotes
- **Mobile-First**: Responsive design for all devices
- **Fast Loading**: Optimized assets and lazy loading