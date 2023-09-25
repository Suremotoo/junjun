export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Junjun",
    description: "Effortlessly generate test cases for your APIs – the power to ensure seamless performance.",
    navItems: [
        {
            label: "Home",
            href: "/",
            disabled: false,
        },
        {
            label: "Project",
            href: "/project",
            disabled: false,
        },
        {
            label: "API",
            href: "/apis",
            disabled: false,
        },
        {
            label: "Paramter",
            href: "/paramter",
            disabled: false,
        },
        {
            label: "Preview",
            href: "/preview",
            disabled: false,
        },
        {
            label: "Docs",
            href: "/docs",
            disabled: false,
        },
        {
            label: "User",
            href: "/user",
            disabled: true,
        }
    ],
    navMenuItems: [
        {
            label: "Profile",
            href: "/profile",
        },
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Projects",
            href: "/projects",
        },
        {
            label: "Team",
            href: "/team",
        },
        {
            label: "Calendar",
            href: "/calendar",
        },
        {
            label: "Settings",
            href: "/settings",
        },
        {
            label: "Help & Feedback",
            href: "/help-feedback",
        },
        {
            label: "Logout",
            href: "/logout",
        },
    ],
    links: {
        github: "https://github.com/Suremotoo",
        docs: "/docs",
        discord: "/#/",
        sponsor: "/#/"
    },
};
