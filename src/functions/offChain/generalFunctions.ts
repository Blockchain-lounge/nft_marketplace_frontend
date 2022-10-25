export function signInMessage(username: string,nounce: number,address: string){
  var msg = `Hello ${ucFirst(username)}, Welcome to Cloudax NFT!\nPlease approve this transaction to securely sign-in to Cloudax NFT.\n\nFeel free to checkout out our Terms of use & Privacy Policy: https://cloudax.xyz/tos\n\nThis is a totally free transaction and will not cost you any gas fees.\n\nYou will automatically be logged out after 24 hours.\n\nSelected wallet address:\n${address}\n\nNonce:\n${nounce}`;
  return msg;
}

export function shortenAddress(address: string){

  return address.substring(0, 6) + '0x0'+'...'+address.substring(38, 42)+ '0x0';
  
}
export function ucFirst(str: string){
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str.replace("_", " ");
}

export function redirectUrl(url: string) {
  window.location.href = url;
}