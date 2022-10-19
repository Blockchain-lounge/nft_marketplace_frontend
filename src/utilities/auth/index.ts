import axios from "axios";
import { ethers } from "ethers";

const infuraId = "9b05e0c5512547158db49730e2b19609";

const baseUrl = "https://cloudax-api.herokuapp.com";

// for metamask
// check if metamask is available

// connect Metamask
export const getAccountAddress = async () => {
  if (!window.ethereum) {
    return;
  }

  // go ahead
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://goerli.infura.io/v3/${infuraId}`
    );

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const signer = provider.getSigner();

    const message = `Hello NO NAME, Welcome to Cloudax!
Please approve this transaction to securely sign-in to Cloudax.
Feel free to checkout out our Terms of use & Privacy Policy: https://opensea.io/tos
This is a totally free request and will not cost you any gas fees.
You will automatically be logged out after 24 hours.
Selected wallet address:
${accounts[0]}
Nonce:
34`;

    if (accounts.length > 0) {
      const signature = await signer.signMessage(message);

      const response = await axios.post(
        `${baseUrl}/api/user/auth/connected_address`,
        {
          address: accounts[0],
        }
      );

      const { result } = await response.data;

      if (result) {
        const response = await axios.get(
          `${baseUrl}/api/user/auth/address_details/${accounts[0]}`
        );

        const data = await response.data;

        // 3. verify signature
        const resp = await axios.post(
          `${baseUrl}/api/user/auth/verify_signature`,
          {
            message,
            signature,
            address: accounts[0],
          }
        );
        console.log(data);
      }
      console.log(signature);
    } else {
      console.log("error getting signature");
    }

    
  } catch (error: any) {
    console.log("Error occured!...", error.message);
  }
};
