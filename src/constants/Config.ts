const APPCONFIG = {
  DEFAULT_ITEM_ART: "/assets/images/defaults/song_art.png",
  DEFAULT_USER_AVATAR: "/assets/images/defaults/user_avatar.jpg",
  SmartContractAddress: "0xCe4C8b5B7C080D0C7067007B3b96A147FF19d8CF",
  TOKEN_BASE_URL: process.env.NEXT_PUBLIC_ENV_BASE_URL + "metadata/tokens",
  ITEM_BASE_URL: process.env.NEXT_PUBLIC_ENV_BASE_URL + "metadata",
  ENV_BASE_URL: process.env.NEXT_PUBLIC_ENV_BASE_URL,
  API_BASE_URL: process.env.NEXT_PUBLIC_ENV_BASE_URL + "api/",
  IPFS_ENDPOINT: "https://ipfs.infura.io:5001",
  IPFS_URL: "https://cloudax.infura-ipfs.io/ipfs/",
  OPENSEA_STORE_BASE_URL:
    process.env.NEXT_PUBLIC_ENV_BASE_URL + "metadata/contracts/", // E.g. https://cloudax.xyz/metadata/contracts/cloudax
};

export default APPCONFIG;
