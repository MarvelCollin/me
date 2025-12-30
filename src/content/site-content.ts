export const siteContent = {
    hero: {
        greeting: "Hello, I'm",
        name: "Marvel Collin",
        titles: ["Creative", "Developer", "Designer"],
        description: "Crafting digital experiences that blend aesthetics with functionality. Turning ideas into interactive realities.",
        cta: {
            primary: "View My Work",
            secondary: "Get In Touch"
        },
        socials: {
            github: "https://github.com",
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com"
        }
    },
    works: [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "A modern e-commerce solution with seamless checkout experience and real-time inventory management.",
            category: "Web Development",
            tags: ["React", "Node.js", "MongoDB"],
            image: "https://picsum.photos/seed/ecommerce/800/600",
            link: "#",
            featured: true
        },
        {
            id: 2,
            title: "Finance Dashboard",
            description: "Interactive dashboard for tracking investments, expenses, and financial goals with data visualization.",
            category: "UI/UX Design",
            tags: ["Figma", "React", "D3.js"],
            image: "https://picsum.photos/seed/finance/800/600",
            link: "#",
            featured: true
        },
        {
            id: 3,
            title: "Mobile Fitness App",
            description: "Cross-platform fitness application with workout tracking, meal planning, and progress analytics.",
            category: "Mobile Development",
            tags: ["React Native", "Firebase"],
            image: "https://picsum.photos/seed/fitness/800/600",
            link: "#",
            featured: true
        },
        {
            id: 4,
            title: "AI Content Generator",
            description: "AI-powered tool for generating marketing copy, blog posts, and social media content.",
            category: "AI/ML",
            tags: ["Python", "OpenAI", "FastAPI"],
            image: "https://picsum.photos/seed/aitools/800/600",
            link: "#",
            featured: false
        },
        {
            id: 5,
            title: "Real Estate Platform",
            description: "Property listing platform with virtual tours, mortgage calculator, and agent matching.",
            category: "Web Development",
            tags: ["Next.js", "PostgreSQL", "Stripe"],
            image: "https://picsum.photos/seed/realestate/800/600",
            link: "#",
            featured: false
        },
        {
            id: 6,
            title: "Brand Identity System",
            description: "Complete brand identity design including logo, color system, typography, and guidelines.",
            category: "Branding",
            tags: ["Illustrator", "Figma"],
            image: "https://picsum.photos/seed/branding/800/600",
            link: "#",
            featured: false
        }
    ]
};

export type Work = typeof siteContent.works[0];
