import axios from "axios";
import { ethers } from "ethers";

const infuraId = "9b05e0c5512547158db49730e2b19609";

const baseUrl = "https://cloudax-api.herokuapp.com";

export const handleProvider = () => {
  const provider = new ethers.providers.JsonRpcProvider(
  `https://goerli.infura.io/v3/${infuraId}`
)
return provider
}

const message = "Helloo... Nigga";

// 1. connect wallet
export const connectWallet = async (): Promise<string | any> => {
  if (!window.ethereum) {
    const failMessage = "Kindly Install Metamask and connect your wallet";
    alert(failMessage);
    console.log(failMessage);
    return;
  }

  // pop-up metamask and connect user wallet

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const walletAddress = accounts[0];

  if (walletAddress) {
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/user/auth/connected_address`,
        {
          address: walletAddress,
        }
      );

      console.log("connect address successful : ", data);
      console.log(walletAddress);

      // should return true.
      return walletAddress;
    } catch (e: any) {
      console.log("error connecting to address : ", e.message);
      return e.message;
    }
  }
};

export const getAddressProfile = async () => {
  const walletAddress = await connectWallet();

  if (walletAddress) {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/user/auth/address_details/${walletAddress}`
      );

      console.log("get address profile successful : ", data);
      console.log(data);
    } catch (e: any) {
      console.log("error getting address profile : ", e.message);
      return e.message;
    }
  }
};

export const signMessage = async (address: string) => {
  if (window.ethereum !== undefined) {
    const ethereum = window.ethereum;
    const provider = new ethers.providers.Web3Provider(ethereum as any);

    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    console.log("signature : ", signature);

    return signature;
  }
};

export const verifySignature = async () => {
  const walletAddress = await connectWallet();
  const signature = await signMessage(walletAddress);
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/user/auth/verify_signature`,
      {
        message,
        signature,
        address: walletAddress,
      }
    );
    const { success, token, message: verifyMessage } = data;

    if (token) {
      // save token to localStorage
      if (window !== undefined) {
        const loginToken = token.split(" ");
        window.localStorage.setItem("token", loginToken[1]);
      }
    }
    console.log(data);
    return data;
  } catch (e: any) {
    console.log("e", e.message);
  }
};
