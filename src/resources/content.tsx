import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Riqo",
  lastName: "Rahma Hidayat",
  name: "Riqo Rahma Hidayat",
  role: "Front-End Developer",
  avatar: "/images/avatar_Riqo.jpg",
  email: "riqorahmahidayat@gmail.com",
  location: "Asia/Jakarta", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  city: "Tegal, Indonesia", // Displayed as readable city name
  languages: ["bahasa", "English", "indonesian"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/RIQORAHMAHIDAYAT",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://id.linkedin.com/in/riqo-rahma-hidayat-542112291",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/riqorhidayat/",
    essential: false,
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@riqorhidayat",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <> Riqo Rahma Hidayat </>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">CekKomposisi</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Mobile App
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      I'm Riqo, a Front-End Developer specializing in building responsive, intuitive, and accessible
      user interfaces.
      <br />
      In addition to my studies in Informatics Engineering, I actively develop personal projects to
      refine my frontend skills.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.city ?? person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Riqo is an Informatics Engineering student focused on front-end development, with a strong
        interest in building clean, responsive, and user-friendly interfaces. His work centers on
        crafting interactive mobile experiences and translating design concepts into functional,
        accessible user interfaces.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Campus",
        timeframe: "2025 - Present",
        role: "Junior Design Engineer",
        achievements: [
          "Designed and developed a mobile UI/UX application using Flutter, focusing on clean layouts, intuitive navigation, and responsive components to deliver a smooth user experience.",
          "This project reflects my approach to front-end development, where design consistency, usability, and accessibility are prioritized across all mobile screens.",
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/CekKomposisi_UI.png",
            alt: "UX Project",
            width: 18,
            height: 12,
          },
        ],
      },
      {
        company: "Campus",
        timeframe: "2025 - Present",
        role: "Front-End Mobile Developer",
        achievements: [
          "Developed and optimized mobile application interfaces using Flutter, ensuring responsive design and improving app performance by 30%.",
          "Collaborated with cross-functional teams to deliver production-ready features, contributing to a 20% increase in user engagement.",
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/Android_studio.png",
            alt: "UX Project",
            width: 18,
            height: 12,
          },
        ],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Harkat Negeri University of Tegal",
        description: <>Informatics Engineering student.</>,
      },
      {
        name: "Build the Future",
        description: <>Studied online marketing and personal branding.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: (
          <>Able to create prototypes in Figma for mobile devices with a user-friendly interface.</>
        ),
        tags: [
          {
            name: "Figma",
            icon: "figma",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/CekKomposisi_UI.png",
            alt: "Project image",
            width: 18,
            height: 12,
          },
          {
            src: "/images/projects/project-01/UI_cekKomposisi.png",
            alt: "Project image",
            width: 18,
            height: 12,
          },
        ],
      },
      {
        title: "Flutter",
        description: <>Building next gen apps with Flutter + Flask + Mysql.</>,
        tags: [
          {
            name: "Flutter",
            icon: "flutter",
          },
          {
            name: "Flask",
            icon: "flask",
          },
          {
            name: "MySQL",
            icon: "mysql",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/Android_studio.png",
            alt: "Project image",
            width: 18,
            height: 14,
          },
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing & Notes",
  description: `Project reflections, technical notes, and things I've learned as a Front-End Developer`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/Me_And_Mother.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Me_And_Mother_2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Pecak_silat.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/Pencak_silat_2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Me_And_Mother_3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    // {
    //   src: "/images/gallery/horizontal-2.jpg",
    //   alt: "image",
    //   orientation: "horizontal",
    // },
    // {
    //   src: "/images/gallery/horizontal-4.jpg",
    //   alt: "image",
    //   orientation: "horizontal",
    // },
    // {
    //   src: "/images/gallery/vertical-3.jpg",
    //   alt: "image",
    //   orientation: "vertical",
    // },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
