const calculadora = () => {
  return 2 + 3;
};
let a = 0;
if ((a = calculadora() !== 5)) {
  throw new Error("Teste falhou: 2 + 3 deveria ser igual a 5");
} else {
  console.log("Teste passou: 2 + 3 é igual a 5");
}
