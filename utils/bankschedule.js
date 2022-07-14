import vn2w from "v-number-to-words";
export function getRandomBSID(length) {
  var randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

export function sumOfNumberToWords(amount) {
  let result;
  const amountString = String(amount);
  result = vn2w.numberToWords(amountString);
  return result;
}
