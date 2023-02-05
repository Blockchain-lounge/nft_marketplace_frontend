const APPCONFIG = {
  DEFAULT_ITEM_ART: "/assets/images/defaults/song_art.png",
  DEFAULT_USER_AVATAR: "/assets/images/defaults/user_avatar.jpg",
  SmartContractAddress: "0xcCF468f0f239Be7BC59EEB39046039b810131dF2",
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
  
};

export default APPCONFIG;
