import { ethers } from "ethers";

// import contract address
import contractAbi from "./cloudaxNFT.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

const infuraId = "9b05e0c5512547158db49730e2b19609";

export const createNFT = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const { ethereum } = window;
    const contractAddress = "0xbC9F9dF16c9ca1E5A8e753B514EA680a9380A95A";

    if (ethereum) {
      const nftContract = new ethers.Contract(
        contractAddress,
        contractAbi.abi,
        signer
      );

      let nftTx = await nftContract.signer;
      // console.log("Mining ....", nftTx.getBalance())
    }
  } catch (e: any) {
    // console.log("....error while creating nft.", e.message)
  }
};
