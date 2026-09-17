import { demoListings } from "./demo-listings";
import type { Listing } from "./types";

interface GetListingsOptions {
  limit?: number;
  area?: string;
  status?: string;
}

export async function getListings({
  limit,
  area,
  status,
}: GetListingsOptions = {}): Promise<Listing[]> {
  let listings = [...demoListings];

  if (area) {
    listings = listings.filter(
      (listing) =>
        listing.area?.toLowerCase() === area.toLowerCase()
    );
  }

  if (status) {
    listings = listings.filter(
      (listing) =>
        listing.status.toLowerCase() === status.toLowerCase()
    );
  }

  if (limit) {
    listings = listings.slice(0, limit);
  }

  return listings;
}

export async function getFeaturedListings(
  limit = 6
): Promise<Listing[]> {
  return getListings({
    limit,
    status: "Active",
  });
}

export async function getListing(
  id: string
): Promise<Listing | null> {
  return (
    demoListings.find(
      (listing) =>
        listing.id === id ||
        listing.mlsNumber === id
    ) ?? null
  );
}