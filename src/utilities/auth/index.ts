import axios from "axios";
import { ethers } from "ethers";

const infuraId = "9b05e0c5512547158db49730e2b19609";

export const baseUrl = "https://cloudax-api.herokuapp.com";

const message = "Hello world";

const provider = new ethers.providers.JsonRpcProvider(
  `https://goerli.infura.io/v3/${infuraId}`
);

export const getAddress = async () => {
  if (!window.ethereum) {
    const failMessage = "Kindly Install Metamask and connect your wallet";
    alert(failMessage);
    console.log(failMessage);
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const walletAddress = accounts[0];

    // 1. Connect address
    if (accounts.length) {
      try {
        const { data } = await axios.post(
          `${baseUrl}/api/user/auth/connected_address`,
          {
            address: walletAddress,
          }
        );

        console.log("connect address successful : ", data);

        if (data) {
          const signature = await signMessage(walletAddress);
          // 2. get address profile
          try {
            const { data } = await axios.get(
              `${baseUrl}/api/user/auth/address_details/${walletAddress}`
            );

            console.log("get address profile successful : ", data);
            console.log(walletAddress);

            if (data) {
              // 3. verify signature
              const signer = provider.getSigner(walletAddress);
              const signedMessage = await signer.signMessage(message);

              try {
                const { data } = await axios.post(
                  `${baseUrl}/api/user/auth/verify_signature`,
                  {
                    message: "Hello World",
                    signature:
                      "0xe8ea7d0c7c12f0c4a55cf5eff254fc103ef8703bbf31d1cb565153b69e6f99063b8f73d80de1b9189951c0844c75e7c660626b9b1e785dcabb4078df5f5135b21b",
                    address: "0x079456f158db4090e9e67d063b97ec19f9674bb9",
                  }
                );

                console.log("verify signature successful : ", data);
                return data;
              } catch (e: any) {
                return console.error("error verifying signature : ", e.message);
              }
            }
            return data;
          } catch (e: any) {
            return console.error("error getting address profile : ", e.message);
          }
        }
        return data;
      } catch (e: any) {
        return console.error("error connecting address : ", e.message);
      }
    }
    console.log(accounts);
  } catch (e: any) {
    console.error("error occured", e.message);
  }
};

const verifyMessage = async (
  message: string,
  address: string,
  signature: string
) => {
  try {
    const signerAddr = ethers.utils.verifyMessage(message, signature);
    if (signerAddr.toLowerCase() !== address.toLowerCase()) {
      console.log("Invalid signature");
    }

    console.log("signer address: ", signerAddr);
    console.log("address: ", address);
    return signerAddr;
  } catch (e: any) {
    console.log("error verifying message: ", e.message);
  }
};

export const signMessage = async (address: string) => {
  try {
    // const provider = new ethers.providers.JsonRpcProvider(
    //   `https://goerli.infura.io/v3/${infuraId}`
    // );
    // const message = "Hello World";

    if (window.ethereum !== undefined) {
      const ethereum = window.ethereum;
      const provider = new ethers.providers.Web3Provider(ethereum as any);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      console.log("signature", signature);
      // console.log('message', message)
      if (message !== undefined && message !== null) {
        const verificationResponse = verifyMessage(message, address, signature);
        console.log("verifcation response", verificationResponse);
        return verificationResponse;
      }

      console.log("signer: ", signer);
    }
  } catch (e: any) {
    console.log("error signing message: ", e.message);
  }
};

const sign2 =
  "0xe3c6d9bdddf2cd5aaa6bf32f721597e4e961489f80e556d07080081b8d6bd7044146cc86322ba12343144ab360dc08a56049b5335ea41497a646c6fe37769d7a1c";

export const verifySignature = async () => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/user/auth/verify_signature`,
      {
        message: "Hello World",
        signature:
          "0xe8ea7d0c7c12f0c4a55cf5eff254fc103ef8703bbf31d1cb565153b69e6f99063b8f73d80de1b9189951c0844c75e7c660626b9b1e785dcabb4078df5f5135b21b",
        address: "0x079456f158db4090e9e67d063b97ec19f9674bb9",
      }
    );

    console.log("successfully verified signature. ", data);
    return;
  } catch (e: any) {
    console.log("error occured while verifying signature", e.message);
    return;
  }
};

// localStorage.setItem("", {})
// localStorage.getItem("")
