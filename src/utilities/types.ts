export interface INftProps {
  _id: string;
  item_title: string;
  item_token_id: number;
  item_description: string;
  item_base_url: string;
  item_price: string;
  item_art_url: string;
  item_supply: string;
  user_id: string;
  collection_id: ICollectionID;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ICollectionID {
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

export interface ICategories {
  _id: string;
  name: string;
  description: string;
  icon_image: string;
  cover_image: string;
}

export interface IListProps {
  _id: string;
  listing_price: number;
  listing_quantity: number;
  item: ItemProps;
  listed_by: IListedByProps;
  owned_by: null | IListedByProps;
}

export interface ItemProps {
  _id: string;
  item_title: string;
  item_description: string;
  item_art_url: string;
  collection: Collection;
  creator: IListedByProps;
}

export interface Collection {
  _id: string;
  name: string;
  cover_image: string;
  featured_image: string;
  logo_image: string;
}

export interface IListedByProps {
  _id: string;
  username: string;
  userBannerImg: string;
  userProfileImg: string;
}

export interface IListedNFt {
  createdAt: string;
  item_id: string;
  listing_price: number;
  listing_quantity: number;
  listing_remaining: number;
  listing_royalty: number;
  updatedAt: string;
  user_id: string;
  __v: number;
  _id: string;
}

export interface ITransactionCard {
  activity_type: "newly_created_item" | "newly_listed_item";
  createdAt: string;
  created_item: null | Omit<
    INftProps,
    "item_token_id" | "item_base_url" | "item_price"
  >;
  listed_item: null | IListedNFt;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
}

// export interface ICreatedNft {
//   collection_id: string;
//   createdAt: string;
//   item_art_url: string;
//   item_description: string;
//   item_remaining: number;
//   item_supply: number;
//   item_title: string;
//   updatedAt: string;
//   user_id: string;
//   __v: number;
//   _id: string;
// }

export interface ICollection {
  category_id: string;
  collectionFeaturedImage: string;
  collectionLogoImage: string;
  cover_image_id: string;
  createdAt: string;
  description: string;
  name: string;
  updatedAt: string;
  user_id: string;
  _id: string;
}
