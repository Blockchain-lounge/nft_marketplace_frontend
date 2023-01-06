const APPCONFIG = {
  DEFAULT_ITEM_ART: "/assets/images/defaults/song_art.png",
  DEFAULT_USER_AVATAR: "/assets/images/defaults/user_avatar.jpg",
  SmartContractAddress: "0xF1b35899695f360a20e4e7ba708DfE481c988C24",
  wEthAddress_testnet: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
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
