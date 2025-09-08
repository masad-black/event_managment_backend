const { prisma } = require("../src/db/prisma_connect.js");

async function catrgories() {
  const categories = [
    {
      name: "Gaming",
      subCategories: [
        "Esports",
        "LAN Parties",
        "Tournaments",
        "Casual Gaming",
        "Game Development",
        "Board Games",
        "VR/AR Gaming",
        "Mobile Gaming",
      ],
    },
    {
      name: "Music",
      subCategories: [
        "Concerts",
        "Festivals",
        "Open Mic",
        "Club Events",
        "Classical",
      ],
    },
    {
      name: "Sports",
      subCategories: [
        "Football",
        "Cricket",
        "Basketball",
        "Marathon",
        "Esports",
      ],
    },
    {
      name: "Education",
      subCategories: [
        "Workshops",
        "Seminars",
        "Webinars",
        "Bootcamps",
        "Conferences",
      ],
    },
    {
      name: "Business",
      subCategories: [
        "Networking",
        "Trade Shows",
        "Startups",
        "Product Launches",
        "Meetups",
      ],
    },
    {
      name: "Technology",
      subCategories: [
        "Hackathons",
        "AI & ML",
        "Blockchain",
        "Cybersecurity",
        "Tech Talks",
      ],
    },
    {
      name: "Health & Fitness",
      subCategories: [
        "Yoga",
        "Gym",
        "Nutrition",
        "Mental Health",
        "Wellness Retreats",
      ],
    },
    {
      name: "Food & Drink",
      subCategories: [
        "Food Festivals",
        "Wine Tasting",
        "Cooking Classes",
        "Street Food",
        "Fine Dining",
      ],
    },
    {
      name: "Arts & Culture",
      subCategories: [
        "Theater",
        "Dance",
        "Exhibitions",
        "Literature",
        "Film Screenings",
      ],
    },
    {
      name: "Charity & Causes",
      subCategories: [
        "Fundraisers",
        "Volunteering",
        "Environmental",
        "Animal Welfare",
        "Community Support",
      ],
    },
    {
      name: "Travel & Adventure",
      subCategories: [
        "Hiking",
        "Camping",
        "Tours",
        "Road Trips",
        "Exploration",
      ],
    },
  ];

  for (const cat of categories) {
    await prisma.categorie.create({
      data: {
        name: cat.name,
        subCategories: cat.subCategories,
      },
    });
  }

  console.log("✅ Categories seeded successfully!");
}

async function events() {
  const events = [
    {
      title: "Islamabad Tech Summit 2025",
      summary:
        "A large-scale summit bringing together innovators, startups, and industry leaders to discuss emerging technologies.",
      status: "UPCOMING",
      startDate: new Date("2025-12-01T09:00:00Z"),
      endDate: new Date("2025-12-03T18:00:00Z"),
      location: {
        venue: "Jinnah Convention Center",
        city: "Islamabad",
        country: "Pakistan",
        address: "Constitution Avenue, G-5/2, Islamabad",
      },
      organizationId: "10c83343-08c9-4b49-a5ec-210979ddabe8",
    },
    {
      title: "AI & Machine Learning Hackathon",
      summary:
        "A 48-hour hackathon where participants build innovative AI solutions to solve real-world challenges.",
      status: "PUBLIC",
      startDate: new Date("2026-01-20T08:00:00Z"),
      endDate: new Date("2026-01-22T20:00:00Z"),
      location: {
        venue: "National Incubation Center",
        city: "Islamabad",
        country: "Pakistan",
        address: "NIC Building, H-9/1, Islamabad",
      },
      organizationId: "10c83343-08c9-4b49-a5ec-210979ddabe8",
    },
    {
      title: "Blockchain & Web3 Expo",
      summary:
        "An expo showcasing blockchain startups, Web3 applications, and cryptocurrency innovations.",
      status: "DRAFT",
      startDate: new Date("2026-02-10T10:00:00Z"),
      endDate: new Date("2026-02-12T18:00:00Z"),
      location: {
        venue: "Pak-China Friendship Center",
        city: "Islamabad",
        country: "Pakistan",
        address: "Garden Avenue, Shakarparian, Islamabad",
      },
      organizationId: "10c83343-08c9-4b49-a5ec-210979ddabe8",
    },
    {
      title: "Cybersecurity Conference",
      summary:
        "A private gathering of IT security experts, researchers, and government officials to discuss the future of cybersecurity.",
      status: "PRIVATE",
      startDate: new Date("2026-03-15T09:00:00Z"),
      endDate: new Date("2026-03-16T17:00:00Z"),
      location: {
        venue: "Serena Hotel",
        city: "Islamabad",
        country: "Pakistan",
        address: "Khajoor Road, Islamabad",
      },
      organizationId: "10c83343-08c9-4b49-a5ec-210979ddabe8",
    },
    {
      title: "Past Islamabad DevCon",
      summary:
        "A developers’ conference featuring coding bootcamps, expert panels, and networking sessions.",
      status: "PAST",
      startDate: new Date("2025-06-15T09:00:00Z"),
      endDate: new Date("2025-06-17T18:00:00Z"),
      location: {
        venue: "COMSATS University",
        city: "Islamabad",
        country: "Pakistan",
        address: "Park Road, Tarlai Kalan, Islamabad",
      },
      organizationId: "10c83343-08c9-4b49-a5ec-210979ddabe8",
    },
  ];

  const tickets = [
    {
      type: "VIP",
      availableQty: 100,
      perTicketPrice: 10000,
      salesStart: new Date("2025-10-01T09:00:00Z"),
      salesEnd: new Date("2025-11-15T23:59:59Z"),
      sold: 0,
      paymentMethod: "Credit Card",
      discount: { percentage: 20, code: "TECHVIP20" },
    },
    {
      type: "REGULAR",
      availableQty: 500,
      perTicketPrice: 3000,
      salesStart: new Date("2025-10-01T09:00:00Z"),
      salesEnd: new Date("2025-11-15T23:59:59Z"),
      sold: 0,
      paymentMethod: "Debit Card",
      discount: {},
    },
    {
      type: "EARLY_BUYERS",
      availableQty: 200,
      perTicketPrice: 2000,
      salesStart: new Date("2025-10-01T09:00:00Z"),
      salesEnd: new Date("2025-10-15T23:59:59Z"),
      sold: 0,
      paymentMethod: "Credit Card",
      discount: { percentage: 25, code: "EARLYTECH25" },
    },
    {
      type: "REGULAR",
      availableQty: 300,
      perTicketPrice: 3500,
      salesStart: new Date("2025-10-01T09:00:00Z"),
      salesEnd: new Date("2025-11-15T23:59:59Z"),
      sold: 0,
      paymentMethod: "Bank Transfer",
      discount: {},
    },
    {
      type: "VIP",
      availableQty: 50,
      perTicketPrice: 12000,
      salesStart: new Date("2025-10-01T09:00:00Z"),
      salesEnd: new Date("2025-11-15T23:59:59Z"),
      sold: 0,
      paymentMethod: "Credit Card",
      discount: {},
    },
  ];

  for (let i in events) {
    let event = events.at(i);
    let ticket = tickets.at(i);

    const newEvent = await prisma.event.create({
      data: event,
    });

    await prisma.ticket.create({
      data: {
        ...ticket,
        eventId: newEvent.id,
      },
    });
  }
}

async function organizations() {
  const organizations = [
    {
      name: "Cyber Ninjas",
      description:
        "Competitive MOBA and RPG team making waves in the global gaming scene.",
      socialLinks: {
        twitter: "https://twitter.com/cyberninjas",
        twitch: "https://twitch.tv/cyberninjaesports",
      },
      userEmail: "david.wilson@example.com",
    },
    {
      name: "Madrid Dragons",
      description: "Spanish powerhouse in FIFA and racing game tournaments.",
      socialLinks: {
        facebook: "https://facebook.com/madriddragons",
        website: "https://madriddragons.es",
      },
      userEmail: "sophia.martinez@example.com",
    },
    {
      name: "Golden State Gamers",
      description:
        "San Francisco-based organization fostering local gaming communities.",
      socialLinks: {
        twitter: "https://twitter.com/gsgamers",
        discord: "https://discord.gg/gsgamers",
      },
      userEmail: "james.anderson@example.com",
    },
    {
      name: "Berlin Titans",
      description:
        "German eSports team with strong presence in Counter-Strike and Valorant.",
      socialLinks: {
        instagram: "https://instagram.com/berlintitans",
        youtube: "https://youtube.com/berlintitans",
      },
      userEmail: "olivia.taylor@example.com",
    },
    {
      name: "Shibuya Shadows",
      description:
        "Tokyo-based gaming group blending anime culture with competitive play.",
      socialLinks: {
        twitter: "https://twitter.com/shibuyashadows",
        website: "https://shibuyashadows.jp",
      },
      userEmail: "william.lee@example.com",
    },
    {
      name: "Seoul Strikers",
      description:
        "South Korean pro team excelling in StarCraft and League of Legends.",
      socialLinks: {
        facebook: "https://facebook.com/seoulstrikers",
        twitch: "https://twitch.tv/seoulstrikers",
      },
      userEmail: "ava.kim@example.com",
    },
  ];
}

events()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
