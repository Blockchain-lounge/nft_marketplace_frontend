// @ts-nocheck
export function signInMessage(
  username: string,
  nounce: number,
  address: string
) {
  var msg = `Please sign this connection to continue on Cloudax Marketplace.\n\nThis is totally free and secure. No gas fee would be charged.\n\nSelected wallet address:\n${address}\n\nNonce:\n${nounce}`;
  return msg;
}

export function shortenAddress(address: string) {
  return (
    address.substring(0, 6) + "0x0" + "..." + address.substring(38, 42) + "0x0"
  );
}
export function ucFirst(str: string) {
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str.replace("_", " ");
}

export function redirectUrl(url: string) {
  window.location.href = url;
}

interface PurchasedItem {
  amount: number;
}
// export function floorPrice(purchasedItems: Array<number|string>) {
export function floorPrice(purchasedItems: Array<PurchasedItem>) {
  // @ts-nocheck
  let price: number = purchasedItems[0].amount;
  for (let i = 0; i < purchasedItems.length; i++) {
    if (purchasedItems[i].amount < price) {
      price = purchasedItems[i].amount;
    }
  }
  return price;
}

const items = [
  { amount: 0.71 },
  { amount: 0.01 },
  { amount: 0.002 },
  { amount: 0.5 },
  { amount: 0.71 },
];

// console.log(floorPrice(items));

//   let rating: number[ ] = [ 5, 5,  4.5, 1, 3];
//   let totalRating: number = 0;
//   let averageRating: number =0;
//   for( let i=0; i<rating.length; i++){
//   totalRating = totalRating +rating[i];
//   }
//  averageRating = totalRating/rating.length;
//  console.log("Average Rating is "+averageRating);

// export function tradingVolume(purchasedItems: []) {
//   // purchasedItems.forEach(amount => {

//   // });
//   let price = ""
//   for(var i = 0; i <= purchasedItems.length; i++)
//       {
//         purchasedItems[i].amount + price;
//       }
// }
