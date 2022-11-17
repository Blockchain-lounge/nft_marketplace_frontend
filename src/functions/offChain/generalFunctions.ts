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

// export function floorPr(url: string) {
//   window.location.href = url;
// }
