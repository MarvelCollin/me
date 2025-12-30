export const siteContent = {
    hero: {
        greeting: "Hello, I'm",
        name: "Marvel Collin",
        titles: [],
        description: "I have no prime. I will forever evolve into a better version of myself.",
        cta: {
            primary: "View My Work",
            secondary: "Get In Touch"
        },
        socials: {
            github: "https://github.com/MarvelCollin",
            linkedin: "https://www.linkedin.com/in/marvel-collin-0244a21ba/?originalSubdomain=id",
        }
    },
    works: [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "A modern e-commerce solution with seamless checkout experience and real-time inventory management.",
            fullDescription: "A comprehensive e-commerce platform built from scratch featuring a modern, responsive design with real-time inventory tracking, advanced search and filtering, secure payment integration, and an intuitive admin dashboard. The platform handles thousands of products with optimized performance and provides customers with a seamless shopping experience from browsing to checkout.",
            category: "Web Development",
            tags: ["React", "Node.js", "MongoDB"],
            features: [
                "Real-time inventory management system",
                "Secure payment processing with Stripe",
                "Advanced product search and filtering",
                "Responsive design for all devices",
                "Admin dashboard with analytics",
                "Order tracking and notifications"
            ],
            techDetails: "Built with React for the frontend, Node.js and Express for the backend API, MongoDB for database management, and integrated with Stripe for secure payments. Implements JWT authentication, real-time updates using WebSockets, and optimized image delivery through CDN.",
            timeline: "6 months",
            role: "Full Stack Developer",
            challenges: "Implementing real-time inventory updates across multiple concurrent users while maintaining data consistency and optimal performance.",
            outcome: "Successfully launched platform serving 10,000+ monthly active users with 99.9% uptime.",
            images: [
                "https://picsum.photos/seed/ecommerce/800/600",
                "https://picsum.photos/seed/ecommerce2/800/600",
                "https://picsum.photos/seed/ecommerce3/800/600",
                "https://picsum.photos/seed/ecommerce4/800/600"
            ],
            link: "#",
            githubLink: "https://github.com",
            liveLink: "https://example.com",
            featured: true
        },
        {
            id: 2,
            title: "Finance Dashboard",
            description: "Interactive dashboard for tracking investments, expenses, and financial goals with data visualization.",
            fullDescription: "An intuitive financial dashboard application that helps users track their investments, monitor expenses, set financial goals, and visualize their financial health through interactive charts and graphs. The dashboard provides real-time market data, personalized insights, and automated reporting features.",
            category: "UI/UX Design",
            tags: ["Figma", "React", "D3.js"],
            features: [
                "Real-time stock market data integration",
                "Interactive charts with D3.js visualization",
                "Expense tracking and categorization",
                "Financial goal setting and progress tracking",
                "Automated monthly reports",
                "Multi-currency support"
            ],
            techDetails: "Designed in Figma with a focus on user experience and accessibility. Built with React for component-based architecture, D3.js for custom data visualizations, and integrated with financial APIs for real-time market data. Implements responsive design patterns and dark mode support.",
            timeline: "4 months",
            role: "UI/UX Designer & Frontend Developer",
            challenges: "Creating intuitive visualizations for complex financial data while maintaining performance with real-time updates and large datasets.",
            outcome: "Achieved 95% user satisfaction rate and reduced financial tracking time by 60% for users.",
            images: [
                "https://picsum.photos/seed/finance/800/600",
                "https://picsum.photos/seed/finance2/800/600",
                "https://picsum.photos/seed/finance3/800/600",
                "https://picsum.photos/seed/finance4/800/600"
            ],
            link: "#",
            githubLink: "https://github.com",
            liveLink: "https://example.com",
            featured: true
        },
        {
            id: 3,
            title: "Mobile Fitness App",
            description: "Cross-platform fitness application with workout tracking, meal planning, and progress analytics.",
            fullDescription: "A comprehensive mobile fitness application that combines workout tracking, nutrition planning, and progress analytics in one unified platform. Users can follow personalized workout plans, track their meals with calorie counting, monitor their progress with detailed analytics, and stay motivated with achievement badges and social features.",
            category: "Mobile Development",
            tags: ["React Native", "Firebase"],
            features: [
                "Personalized workout plan generator",
                "Exercise library with video demonstrations",
                "Meal planning and calorie tracker",
                "Progress tracking with charts and statistics",
                "Social features and community challenges",
                "Offline mode for workout tracking"
            ],
            techDetails: "Developed using React Native for cross-platform compatibility (iOS and Android). Backend powered by Firebase for authentication, real-time database, and cloud storage. Implements push notifications, local caching for offline functionality, and integrates with health tracking APIs.",
            timeline: "5 months",
            role: "Mobile Developer",
            challenges: "Ensuring smooth performance across different devices while handling video content and maintaining offline functionality for workout tracking.",
            outcome: "Downloaded by 50,000+ users with 4.8-star rating on both App Store and Google Play.",
            images: [
                "https://picsum.photos/seed/fitness/800/600",
                "https://picsum.photos/seed/fitness2/800/600",
                "https://picsum.photos/seed/fitness3/800/600",
                "https://picsum.photos/seed/fitness4/800/600"
            ],
            link: "#",
            githubLink: "https://github.com",
            liveLink: "https://example.com",
            featured: true
        },
        {
            id: 4,
            title: "AI Content Generator",
            description: "AI-powered tool for generating marketing copy, blog posts, and social media content.",
            fullDescription: "An intelligent content generation platform leveraging advanced AI models to help marketers, bloggers, and content creators produce high-quality content efficiently. The tool supports multiple content types, offers customization options for tone and style, and includes SEO optimization suggestions.",
            category: "AI/ML",
            tags: ["Python", "OpenAI", "FastAPI"],
            features: [
                "Multiple content types (blogs, ads, social media)",
                "Customizable tone and writing style",
                "SEO keyword optimization",
                "Content templates library",
                "Multi-language support",
                "Plagiarism detection integration"
            ],
            techDetails: "Built with Python and FastAPI for high-performance API endpoints. Integrates OpenAI GPT models for content generation with custom fine-tuning. Implements rate limiting, caching strategies, and asynchronous processing for handling concurrent requests efficiently.",
            timeline: "3 months",
            role: "AI/ML Engineer",
            challenges: "Optimizing API costs while maintaining quality output and implementing effective content filtering to ensure brand-safe generated content.",
            outcome: "Helping 5,000+ content creators save an average of 10 hours per week on content production.",
            images: [
                "https://picsum.photos/seed/aitools/800/600",
                "https://picsum.photos/seed/aitools2/800/600",
                "https://picsum.photos/seed/aitools3/800/600",
                "https://picsum.photos/seed/aitools4/800/600"
            ],
            link: "#",
            githubLink: "https://github.com",
            liveLink: "https://example.com",
            featured: false
        },
        {
            id: 5,
            title: "Real Estate Platform",
            description: "Property listing platform with virtual tours, mortgage calculator, and agent matching.",
            fullDescription: "A modern real estate platform that revolutionizes property search and transactions. Features include immersive 360° virtual tours, smart property matching based on user preferences, integrated mortgage calculator, direct agent communication, and streamlined document management for smooth transactions.",
            category: "Web Development",
            tags: ["Next.js", "PostgreSQL", "Stripe"],
            features: [
                "360° virtual property tours",
                "Advanced search with map integration",
                "Mortgage calculator and financing tools",
                "AI-powered property recommendations",
                "Agent matching and messaging system",
                "Secure document signing and storage"
            ],
            techDetails: "Built with Next.js for server-side rendering and optimal SEO performance. PostgreSQL database with PostGIS for geospatial queries. Stripe integration for premium listings and payment processing. Implements image optimization, lazy loading, and CDN delivery for fast property image loading.",
            timeline: "8 months",
            role: "Lead Developer",
            challenges: "Handling large amounts of property data with complex geospatial queries while maintaining fast page load times and seamless user experience.",
            outcome: "Platform hosts 100,000+ property listings and facilitates $50M+ in annual transactions.",
            images: [
                "https://picsum.photos/seed/realestate/800/600",
                "https://picsum.photos/seed/realestate2/800/600",
                "https://picsum.photos/seed/realestate3/800/600",
                "https://picsum.photos/seed/realestate4/800/600"
            ],
            link: "#",
            githubLink: "https://github.com",
            liveLink: "https://example.com",
            featured: false
        },
        {
            id: 6,
            title: "Brand Identity System",
            description: "Complete brand identity design including logo, color system, typography, and guidelines.",
            fullDescription: "A comprehensive brand identity system designed for a growing tech startup. The project includes logo design, complete color palette with accessibility considerations, typography selection, iconography system, and detailed brand guidelines to ensure consistency across all touchpoints.",
            category: "Branding",
            tags: ["Illustrator", "Figma"],
            features: [
                "Custom logo design with variations",
                "Comprehensive color palette system",
                "Typography hierarchy and pairings",
                "Custom icon library",
                "Brand guidelines documentation",
                "Marketing collateral templates"
            ],
            techDetails: "Designed using Adobe Illustrator for vector logo creation and Figma for collaborative design system development. Created responsive logo variations for different use cases, implemented WCAG-compliant color combinations, and developed a modular component library for consistent brand application.",
            timeline: "2 months",
            role: "Brand Designer",
            challenges: "Creating a distinctive visual identity that stands out in a competitive tech market while remaining versatile and scalable for future growth.",
            outcome: "Brand identity adopted across 100+ marketing materials, resulting in 40% increase in brand recognition.",
            images: [
                "https://picsum.photos/seed/branding/800/600",
                "https://picsum.photos/seed/branding2/800/600",
                "https://picsum.photos/seed/branding3/800/600",
                "https://picsum.photos/seed/branding4/800/600"
            ],
            link: "#",
            githubLink: "https://github.com",
            liveLink: "https://example.com",
            featured: false
        }
    ]
};

export type Work = typeof siteContent.works[0];
