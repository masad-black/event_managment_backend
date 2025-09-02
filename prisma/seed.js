const { prisma } = require("../src/db/prisma_connect.js");

async function main() {
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

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
