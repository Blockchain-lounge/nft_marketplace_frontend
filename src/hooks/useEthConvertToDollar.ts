import { useEffect, useState } from "react";
import axios from "axios";

export const UseConvertEthToDollar = () => {
  const [dollarRate, setDollarRate] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=true&precision=2"
      )
      .then((res) => setDollarRate(res.data.ethereum.usd))
      .catch((err) => {
        return;
      });
  }, []);

  return [dollarRate];
};

export default UseConvertEthToDollar;
