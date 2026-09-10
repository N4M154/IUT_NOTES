//210042112

const calculator = require("../src/basic");

//addition
describe("Add", () => {
  var BVAdata = [
    [1, 2, 3],
    [4, 5, 9],
    [3, 12, 15],
    [4, 6, 10],
  ];
  describe.each(BVAdata)("BVA: add(%i, %i), Expected: %i", (a, b, expected) => {
    test(`returns ${calculator.add(a, b)}`, () => {
      expect(calculator.add(a, b)).toBe(expected);
    });
  });

  var DTdata = [
    [0, 89, 89],
    [-17, -35, -52],
    [65, -12, 53],
    [-78, 24, -54],
  ];

  describe.each(DTdata)("DT: add(%i, %i), Expected: %i", (a, b, expected) => {
    test(`returns ${calculator.add(a, b)}`, () => {
      expect(calculator.add(a, b)).toBe(expected);
    });
  });
});

//subtration
describe("Subtract", () => {
  var BVAdata = [
    [1, 2, -1],
    [4, 5, -1],
    [3, 12, -9],
    [4, 6, -2],
  ];
  describe.each(BVAdata)(
    "BVA: subtract(%i, %i), Expected: %i",
    (a, b, expected) => {
      test(`returns ${calculator.subtract(a, b)}`, () => {
        expect(calculator.subtract(a, b)).toBe(expected);
      });
    },
  );

  var DTdata = [
    [0, 89, -89],
    [-17, -35, 18],
    [65, -12, 77],
    [-78, 24, -102],
  ];

  describe.each(DTdata)(
    "DT: subtract(%i, %i), Expected: %i",
    (a, b, expected) => {
      test(`returns ${calculator.subtract(a, b)}`, () => {
        expect(calculator.subtract(a, b)).toBe(expected);
      });
    },
  );
});

//Multiplication

describe("Multiply", () => {
  var BVAdata = [
    [1, 2, 2],
    [4, 5, 20],
    [3, 12, 36],
    [4, 6, 24],
  ];
  describe.each(BVAdata)(
    "BVA: multiply(%i, %i), Expected: %i",
    (a, b, expected) => {
      test(`returns ${calculator.multiply(a, b)}`, () => {
        expect(calculator.multiply(a, b)).toBe(expected);
      });
    },
  );

  var DTdata = [
    [0, 89, 0],
    [-17, -35, 595],
    [65, -12, -780],
    [-78, 24, -1872],
  ];

  describe.each(DTdata)(
    "DT: multiply(%i, %i), Expected: %i",
    (a, b, expected) => {
      test(`returns ${calculator.multiply(a, b)}`, () => {
        expect(calculator.multiply(a, b)).toBe(expected);
      });
    },
  );
});

//Division
describe("Divide", () => {
  var BVAdata = [
    [0, 0, NaN],
    [1, 2, 0.5],
    [4, 5, 0.8],
    [3, 12, 0.25],
    [4, 16, 0.25],
  ];
  describe.each(BVAdata)(
    "BVA: divide(%i, %i), Expected: %i",
    (a, b, expected) => {
      test(`returns ${calculator.divide(a, b)}`, () => {
        expect(calculator.divide(a, b)).toBe(expected);
      });
    },
  );

  var DTdata = [
    [0, 89, 0],
    [-17, -35, 0.4857142857142857],
    [65, -12, -5.416666666666667],
    [-78, 24, -3.25],
  ];

  describe.each(DTdata)(
    "DT: divide(%i, %i), Expected: %i",
    (a, b, expected) => {
      test(`returns ${calculator.divide(a, b)}`, () => {
        expect(calculator.divide(a, b)).toBe(expected);
      });
    },
  );
});

// -_- N4M154 -_-
