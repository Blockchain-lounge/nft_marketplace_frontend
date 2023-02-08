import { useEffect, useState } from "react";
import axios from "axios";

export const UseConvertEthToDollar = () => {
  const [dollarRate, setDollarRate] = useState(null);

  const fetchDollarRate = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=true&precision=2"
      );

      setDollarRate(res.data.ethereum.usd);
    } catch (error) {
      //@ts-ignore
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDollarRate();
  }, []);

  return [dollarRate];
};

export default UseConvertEthToDollar;
