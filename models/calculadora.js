function sum(number1, number2) {
  console.log(number1, number2);
  if (typeof number1 === "number" && typeof number2 === "number") {
    return number1 + number2;
  } else if (number1 === undefined || number2 === undefined) {
    return "Insira dois números válidos";
  } else if (typeof number1 === "string" || typeof number2 === "string") {
    return "Erro";
  }
}

exports.sum = sum;
