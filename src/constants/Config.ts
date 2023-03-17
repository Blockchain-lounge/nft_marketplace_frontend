const APPCONFIG = {
  DEFAULT_ITEM_ART: "/assets/images/defaults/song_art.png",
  DEFAULT_USER_AVATAR: "/default/user_avatar.jpg",
  DEFAULT_NFT_ART: "/default/collection_banner_placeholder.jpg",
  DEFAULT_COLLECTION_ART: "/default/collection_banner_placeholder.jpg",
  SmartContractAddress: "0xAE274AB82C5C34fcBff6B40A4bE156a4ED10aBCF",
  wEthAddress_testnet: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
  TOKEN_BASE_URL: process.env.NEXT_PUBLIC_ENV_BASE_URL + "metadata/tokens",
  ITEM_BASE_URL: process.env.NEXT_PUBLIC_ENV_BASE_URL + "metadata",
  ENV_BASE_URL: process.env.NEXT_PUBLIC_ENV_BASE_URL,
  API_BASE_URL: process.env.NEXT_PUBLIC_ENV_BASE_URL + "api/",
  IPFS_ENDPOINT: "https://ipfs.infura.io:5001",
  IPFS_URL: "https://cloudax.infura-ipfs.io/ipfs/",
  OPENSEA_STORE_BASE_URL:
    process.env.NEXT_PUBLIC_ENV_BASE_URL + "metadata/contracts/", // E.g. https://cloudax.xyz/metadata/contracts/cloudax
  APP_NETWORK: process.env.NEXT_PUBLIC_APP_NETWORK,
  APP_NETWORK_CHAIN_ID: process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID,
  SPACES_API_KEY: process.env.NEXT_PUBLIC_ENV_SPACES_API_KEY,
  SPACES_API_SECRET: process.env.NEXT_PUBLIC_ENV_SPACES_API_SECRET,
  SPACES_ENDPOINT: process.env.NEXT_PUBLIC_ENV_SPACES_ENDPOINT,
  SPACES_HOSTNAME: process.env.NEXT_PUBLIC_ENV_SPACES_HOSTNAME,
  SPACES_BUCKET: process.env.NEXT_PUBLIC_SPACES_BUCKET,
};

export default APPCONFIG;
