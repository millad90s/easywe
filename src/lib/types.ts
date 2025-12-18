export type Property = {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  amenities: string[];
  imageIds: string[];
  owner: {
    name:string;
    avatarId: string;
  };
};
