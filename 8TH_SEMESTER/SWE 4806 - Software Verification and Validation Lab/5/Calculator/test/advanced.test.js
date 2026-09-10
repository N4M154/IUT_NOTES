//210042112
const calculator = require("../src/advanced");

//Power
describe("Power", () => {
  var BVAdata = [
    [1, 2, 1],
    [4, 5, 1024],
    [3, 12, 531441],
    [4, 6, 4096],
  ];
  describe.each(BVAdata)("BVA: Pow(%i, %i), Expected: %i", (x, n, expected) => {
    test(`returns ${calculator.Pow(x, n)}`, () => {
      expect(calculator.Pow(x, n)).toBe(expected);
    });
  });

  var DTdata = [
    [0, 5, 0],
    [5, 0, 1],
    [-2, 3, -8],
    [-2, 4, 16],
    [2, -1, 0.5],
  ];

  describe.each(DTdata)("DT: Pow(%i, %i), Expected: %i", (x, n, expected) => {
    test(`returns ${calculator.Pow(x, n)}`, () => {
      expect(calculator.Pow(x, n)).toBe(expected);
    });
  });
});

//Modulo
describe("Modulo", () => {
  var BVAdata = [
    [1, 2, 1],
    [4, 5, 4],
    [3, 12, 3],
    [4, 6, 4],
  ];
  describe.each(BVAdata)(
    "BVA: Modulo(%i, %i), Expected: %i",
    (a, b, expected) => {
      test(`returns ${calculator.Modulo(a, b)}`, () => {
        expect(calculator.Modulo(a, b)).toBe(expected);
      });
    },
  );

  var DTdata = [
    [0, 89, 0],
    [-17, -35, -17],
    [-7, 3, -1],
    [-7, -3, -1],
  ];

  describe.each(DTdata)(
    "DT: Modulo(%i, %i), Expected: %i",
    (a, b, expected) => {
      test(`returns ${calculator.Modulo(a, b)}`, () => {
        expect(calculator.Modulo(a, b)).toBe(expected);
      });
    },
  );
});

// -_- N4M154 -_-
