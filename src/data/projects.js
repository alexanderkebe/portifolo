export const defaultProjects = [
  {
    id: 'wedding-invitation',
    type: 'code',
    title: 'Digital Wedding Invitation',
    description: 'A responsive wedding invitation website featuring a countdown timer, integrated map, memory sharing section, and an RSVP system with QR code generation for secure event entry.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    category: 'Web Development',
    url: 'https://fish-and-hanni-4qbd.vercel.app/',
    device: 'desktop-phone',
    screenshot: '',
  },
  {
    id: 'hira-cafe',
    type: 'code',
    title: 'Hira Cafe Website',
    description: 'A responsive restaurant website showcasing the cafe\'s menu, brand, and services with a digital menu, location integration, and modern mobile-friendly interface.',
    tech: ['React', 'CSS', 'Node.js', 'Responsive Design'],
    category: 'Web Development',
    url: 'https://hiracafe.com/',
    device: 'desktop',
    screenshot: '',
  },
  {
    id: 'blockchain-evoting',
    type: 'code',
    title: 'Blockchain E-Voting System',
    description: 'A blockchain-based e-voting system for the National Board of Election of Ethiopia, ensuring transparency, security, immutability, and tamper-resistant vote recording.',
    tech: ['Blockchain', 'Solidity', 'React', 'Node.js'],
    category: 'Full Stack',
    url: '',
    device: 'desktop',
    screenshot: '',
  },
  {
    id: 'brana-connect',
    type: 'code',
    title: 'Brana Connect',
    description: 'A mobile reading community app connecting readers worldwide. Features user authentication, real-time sync, and social features for discovering, sharing, and discussing books.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Firestore'],
    category: 'Mobile App',
    url: '',
    device: 'phone',
    screenshot: '',
  },
  {
    id: 'social-media-branding',
    type: 'design',
    title: 'Social Media Branding',
    description: 'A comprehensive set of social media graphics and marketing materials developed to maintain brand consistency across platforms.',
    tech: ['Photoshop', 'Illustrator'],
    category: 'Graphics Design',
    url: '',
    screenshot: '',
  },
  {
    id: 'motion-graphics-promo',
    type: 'design',
    title: 'Promotional Motion Graphics',
    description: 'Dynamic motion graphics produced for promotional and communication purposes, focusing on brand storytelling and engagement.',
    tech: ['After Effects', 'Premiere Pro'],
    category: 'Motion Graphics',
    url: '',
    screenshot: '',
  },
  {
    id: 'print-marketing-materials',
    type: 'design',
    title: 'Print Marketing Materials',
    description: 'Designed professional printables, including brochures and banners, for effective offline marketing campaigns.',
    tech: ['InDesign', 'Illustrator'],
    category: 'Print Design',
    url: '',
    screenshot: '',
  }
];

export const services = [
  {
    icon: `<svg class="svc-anim" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="16" width="64" height="42" rx="4" stroke="#60a5fa" stroke-width="2"><animate attributeName="stroke-dasharray" from="0 220" to="220 0" dur="2s" fill="freeze"/></rect>
      <line x1="8" y1="58" x2="72" y2="58" stroke="#60a5fa" stroke-width="2"/>
      <line x1="30" y1="58" x2="50" y2="66" stroke="#a78bfa" stroke-width="2"/>
      <line x1="50" y1="58" x2="30" y2="66" stroke="#a78bfa" stroke-width="2"/>
      <text x="20" y="35" fill="#60a5fa" font-size="7" font-family="monospace" opacity="0">&lt;/&gt;<animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite"/></text>
      <text x="20" y="45" fill="#a78bfa" font-size="6" font-family="monospace" opacity="0">code<animate attributeName="opacity" values="0;0;1;1;0" dur="3s" repeatCount="indefinite"/></text>
      <circle cx="58" cy="38" r="3" fill="#60a5fa" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/></circle>
    </svg>`,
    title: 'Web Development',
    desc: 'Building responsive, performant web applications using modern frameworks like Angular, React, and vanilla JavaScript.'
  },
  {
    icon: `<svg class="svc-anim" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="28" stroke="#a78bfa" stroke-width="2" stroke-dasharray="4 4"><animateTransform attributeName="transform" type="rotate" from="0 40 40" to="360 40 40" dur="20s" repeatCount="indefinite"/></circle>
      <circle cx="40" cy="40" r="8" fill="#60a5fa" opacity="0.6"><animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/></circle>
      <circle cx="24" cy="30" r="5" fill="#f472b6" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/></circle>
      <circle cx="56" cy="30" r="5" fill="#34d399" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/></circle>
      <circle cx="40" cy="58" r="5" fill="#fbbf24" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/></circle>
      <path d="M25 50 L40 20 L55 50" stroke="#60a5fa" stroke-width="1.5" fill="none" opacity="0.4"><animate attributeName="stroke-dashoffset" from="80" to="0" dur="3s" repeatCount="indefinite"/><animate attributeName="stroke-dasharray" values="0 80;80 0;0 80" dur="3s" repeatCount="indefinite"/></path>
    </svg>`,
    title: 'Graphic Design',
    desc: 'Creating printables, marketing materials, social media graphics, and visual concepts aligned with brand identity.'
  },
  {
    icon: `<svg class="svc-anim" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="56" width="60" height="6" rx="2" fill="#1e293b" stroke="#60a5fa" stroke-width="1"/>
      <rect x="14" y="58" width="8" height="2" rx="1" fill="#60a5fa"><animate attributeName="width" values="8;12;8" dur="1s" repeatCount="indefinite"/></rect>
      <rect x="25" y="58" width="6" height="2" rx="1" fill="#a78bfa"><animate attributeName="width" values="6;10;6" dur="1.5s" repeatCount="indefinite"/></rect>
      <rect x="34" y="58" width="10" height="2" rx="1" fill="#f472b6"><animate attributeName="width" values="10;6;10" dur="1.2s" repeatCount="indefinite"/></rect>
      <polygon points="40,20 48,36 32,36" stroke="#60a5fa" stroke-width="2" fill="none"><animateTransform attributeName="transform" type="rotate" from="0 40 28" to="360 40 28" dur="4s" repeatCount="indefinite"/></polygon>
      <circle cx="40" cy="44" r="4" stroke="#a78bfa" stroke-width="1.5" fill="none"><animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/></circle>
      <line x1="30" y1="44" x2="20" y2="38" stroke="#60a5fa" stroke-width="1" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/></line>
      <line x1="50" y1="44" x2="60" y2="38" stroke="#a78bfa" stroke-width="1" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite"/></line>
    </svg>`,
    title: 'Motion Graphics',
    desc: 'Producing engaging motion graphics for promotional content, social media, and communication purposes.'
  },
  {
    icon: `<svg class="svc-anim" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="10" width="36" height="60" rx="6" stroke="#60a5fa" stroke-width="2" fill="none"><animate attributeName="stroke-dasharray" from="0 200" to="200 0" dur="2s" fill="freeze"/></rect>
      <line x1="22" y1="20" x2="58" y2="20" stroke="#60a5fa" stroke-width="1" opacity="0.3"/>
      <line x1="22" y1="60" x2="58" y2="60" stroke="#60a5fa" stroke-width="1" opacity="0.3"/>
      <circle cx="40" cy="65" r="2" fill="#60a5fa" opacity="0.5"/>
      <rect x="28" y="26" width="24" height="4" rx="2" fill="#a78bfa" opacity="0"><animate attributeName="opacity" values="0;0.6;0.6;0" dur="3s" repeatCount="indefinite"/></rect>
      <rect x="28" y="34" width="16" height="4" rx="2" fill="#60a5fa" opacity="0"><animate attributeName="opacity" values="0;0;0.6;0.6;0" dur="3s" repeatCount="indefinite"/></rect>
      <rect x="28" y="42" width="20" height="4" rx="2" fill="#a78bfa" opacity="0"><animate attributeName="opacity" values="0;0;0;0.6;0.6" dur="3s" repeatCount="indefinite"/></rect>
      <rect x="28" y="50" width="12" height="4" rx="2" fill="#34d399" opacity="0"><animate attributeName="opacity" values="0.6;0;0;0;0.6" dur="3s" repeatCount="indefinite"/></rect>
    </svg>`,
    title: 'UI/UX Design',
    desc: 'Designing intuitive, user-centered interfaces that prioritize usability, accessibility, and visual appeal.'
  },
  {
    icon: `<svg class="svc-anim" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="36" r="22" stroke="#60a5fa" stroke-width="2" fill="none"/>
      <polygon points="35,28 35,44 50,36" fill="#60a5fa" opacity="0.8"><animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite"/></polygon>
      <rect x="12" y="62" width="56" height="5" rx="2" fill="#1e293b" stroke="#a78bfa" stroke-width="1"/>
      <rect x="14" y="63.5" width="20" height="2" rx="1" fill="#60a5fa"><animate attributeName="width" values="20;40;20" dur="4s" repeatCount="indefinite"/></rect>
      <circle cx="18" cy="36" r="2" fill="#a78bfa" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/></circle>
      <circle cx="62" cy="36" r="2" fill="#a78bfa" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="2s" begin="1s" repeatCount="indefinite"/></circle>
      <path d="M16 54 Q28 48 40 54 Q52 60 64 54" stroke="#a78bfa" stroke-width="1.5" fill="none" opacity="0.4"><animate attributeName="d" values="M16 54 Q28 48 40 54 Q52 60 64 54;M16 54 Q28 60 40 54 Q52 48 64 54;M16 54 Q28 48 40 54 Q52 60 64 54" dur="3s" repeatCount="indefinite"/></path>
    </svg>`,
    title: 'Video Editing',
    desc: 'Creating both short-form and long-form video content with professional editing and post-production.'
  }
];

export const skills = [
  {
    category: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Angular', 'React', 'Flutter']
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'Firebase', 'REST APIs']
  },
  {
    category: 'Database',
    items: ['MongoDB', 'Microsoft SQL Server', 'Firestore', 'MySQL']
  },
  {
    category: 'Design & Creative',
    items: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects', 'Figma']
  },
  {
    category: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Dart', 'C++', 'Java', 'C#', 'Python']
  },
  {
    category: 'Tools & Other',
    items: ['Git', 'GitHub', 'Vercel', 'VS Code', 'Blockchain', 'Agile']
  }
];

export const experience = [
  {
    title: 'Software Developer',
    company: 'Biztech Global — Addis Ababa',
    date: 'Aug 2025 – Oct 2025',
    tasks: [
      'Developed and maintained the front-end of an ERP system using Angular',
      'Built responsive, user-friendly interfaces for web applications',
      'Collaborated with backend developers to integrate APIs',
      'Improved usability and performance of the application',
      'Wrote clean, maintainable, and efficient code'
    ]
  },
  {
    title: 'Graphic Designer',
    company: 'Beaman Piping Solutions — Addis Ababa',
    date: '2024 – 2025',
    tasks: [
      'Designed printables, social media graphics, and marketing materials',
      'Created short-form and long-form video content',
      'Produced motion graphics for promotional purposes',
      'Collaborated with marketing teams to deliver creative assets',
      'Developed visual concepts aligned with brand identity'
    ]
  }
];

export const education = [
  {
    title: "Bachelor's Degree in Computer Science",
    school: 'HiLCoE School of Computer Science',
    date: 'Jan 2020 – Feb 2024',
    desc: 'Software development, database design, network administration, and ICT.'
  },
  {
    title: 'Graphics Design & Editing for Printing',
    school: 'Birhan Ena Selam Printing Press',
    date: 'Feb 2024 – May 2024',
    desc: 'Audio-visual techniques, media production, and professional printing design.'
  }
];

export const certifications = [
  {
    title: 'Programming with JavaScript',
    issuer: 'Meta (Coursera)',
    date: 'March 2023',
    url: 'https://coursera.org/verify/NBGHQLU32K7L'
  },
  {
    title: 'Introduction to Back-End Development',
    issuer: 'Meta (Coursera)',
    date: 'March 2023',
    url: 'https://coursera.org/verify/GGNSKQ2W2U4F'
  },
  {
    title: 'Introduction to Front-End Development',
    issuer: 'Meta (Coursera)',
    date: 'March 2023',
    url: 'https://coursera.org/verify/FW4CCD46RXDL'
  }
];
