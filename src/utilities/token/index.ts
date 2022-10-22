import ethers from 'ethers'
import abi from '@/src/utilities/token/marketplace.json'

const contractAddress = "0xbC9F9dF16c9ca1E5A8e753B514EA680a9380A95A";

const provider = new ethers.providers.JsonRpcProvider(
  `https://goerli.infura.io/v3/${infuraId}`
);
// connect to contract abi
const createToken = new ethers.Contract(contractAddress, abi, provider);