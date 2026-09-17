import type { Listing } from "./types";

export const demoListings: Listing[] = [
  {
    id: "demo-1",
    mlsNumber: "36616401",

    status: "Active",
    badge: "Featured",

    price: 300000,
    propertyType: "Single Family",

    address: {
      street: "14219 Swanfield Drive",
      city: "Houston",
      state: "TX",
      zip: "77083",
    },

    bedrooms: 3,
    bathrooms: 2,
    fullBathrooms: 2,
    halfBathrooms: 0,

    sqft: 1886,
    lotAcres: 0.1584,
    yearBuilt: 1982,

    area: "Houston",

    description:
      "Beautiful Houston property represented by Jennifer Espinosa and The Hometown Team.",

    images: [
      {
        url: "/demo/listing-1.webp",
        alt: "14219 Swanfield Drive",
      },
    ],

    brokerage: "RE/MAX Integrity",

    url: "/properties/14219-swanfield-drive-houston-tx-77083",
  },

  {
    id: "demo-2",
    mlsNumber: "DEMO002",

    status: "Active",
    badge: "",

    price: 465000,
    propertyType: "Single Family",

    address: {
      street: "Demo Property Two",
      city: "Tomball",
      state: "TX",
      zip: "77375",
    },

    bedrooms: 4,
    bathrooms: 3,
    sqft: 2450,

    area: "Tomball",

    images: [
      {
        url: "/demo/listing-2.webp",
        alt: "Demo home in Tomball",
      },
    ],

    brokerage: "RE/MAX Integrity",

    url: "#",
  },

  {
    id: "demo-3",
    mlsNumber: "DEMO003",

    status: "Active",

    price: 599000,
    propertyType: "Single Family",

    address: {
      street: "Demo Property Three",
      city: "Spring",
      state: "TX",
      zip: "77379",
    },

    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3100,

    area: "Spring / Klein",

    images: [
      {
        url: "/demo/listing-3.webp",
        alt: "Demo home in Spring",
      },
    ],

    brokerage: "RE/MAX Integrity",

    url: "#",
  },

  {
    id: "demo-4",
    mlsNumber: "DEMO004",

    status: "Active",

    price: 725000,
    propertyType: "Single Family",

    address: {
      street: "Demo Property Four",
      city: "Magnolia",
      state: "TX",
      zip: "77354",
    },

    bedrooms: 5,
    bathrooms: 4,
    sqft: 3750,

    area: "Magnolia",

    images: [
      {
        url: "/demo/listing-4.webp",
        alt: "Demo home in Magnolia",
      },
    ],

    brokerage: "RE/MAX Integrity",

    url: "#",
  },
  
];