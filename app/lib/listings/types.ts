export interface ListingImage {
  url: string;
  alt?: string | null;
}

export interface ListingAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Listing {
  id: string;
  mlsNumber: string;

  status: string;
  badge?: string | null;

  price: number;
  propertyType: string;

  address: ListingAddress;

  bedrooms: number | null;
  bathrooms: number | null;
  sqft: number | null;

  fullBathrooms?: number | null;
  halfBathrooms?: number | null;

  lotAcres?: number | null;
  yearBuilt?: number | null;

  area?: string | null;
  neighborhood?: string | null;

  description?: string | null;

  images: ListingImage[];

  brokerage?: string | null;

  daysOnSite?: number | null;

  url: string;
}