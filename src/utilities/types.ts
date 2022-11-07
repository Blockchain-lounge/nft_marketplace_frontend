export interface INftProps {
  _id: string;
  item_title: string;
  item_token_id: number;
  item_description: string;
  item_base_url: string;
  item_price: string;
  item_art_url: string;
  item_quantity: string;
  user_id: string;
  collection_id: CollectionID;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface CollectionID {
  _id: string;
  name: string;
  description: string;
  cover_image_id: string;
  collectionFeaturedImage: string;
  collectionLogoImage: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
