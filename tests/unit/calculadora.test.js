const calculadora = require("../../models/calculadora");

test("somar 2+2 deveria retornar 4", () => {
  const resultado = calculadora.sum(2, 3);
  expect(resultado).toBe(5);
});

test("somar 5 + 100 deveria retornar 105", () => {
  const resultado = calculadora.sum(5, 100);
  expect(resultado).toBe(105);
});

test("somar 'banana' + 100 deveria retornar 105", () => {
  const resultado = calculadora.sum("banana", 100);
  expect(resultado).toBe("Erro");
});

test("executando a função somar sem nenhum parâmetro deveria retornar Eroo", () => {
  const resultado = calculadora.sum();
  expect(resultado).toBe("Insira dois números válidos");
});
