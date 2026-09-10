// 210042112

function Pow(x, n) {
  return x ** n;
}

function Modulo(a, b) {
  return a % b;
}

function GCD(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);

  while (b !== 0) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }

  return a;
}

console.log(Pow(2, 3));
console.log(Modulo(10, 3));
console.log(GCD(48, 18));

module.exports = {
  Pow,
  Modulo,
  GCD,
};

//-_- N4M154-_-
