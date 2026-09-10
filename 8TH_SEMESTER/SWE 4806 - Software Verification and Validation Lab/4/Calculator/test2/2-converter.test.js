//210042112

const { LengthConverter } = require("../src2/2-converter");

describe("LengthConverter", () => {
  // measurement = feets, inches, miles
  // val = 0 to 1 mile in that unit[0-5280 feets, 0-63360 inches, 0-1 miles]
  // measurement fixed, vary val across its min (0) and max (1 mile in that unit)
  var BVAdata = [
    ["feets", 0, ["0.00 inches", "0.00 miles"]],
    ["feets", 5280, ["63360.00 inches", "1.00 miles"]],
    ["inches", 0, ["0.00 feets", "0.00 miles"]],
    ["inches", 63360, ["5280.00 feets", "1.00 miles"]],
    ["miles", 0, ["0.00 feets", "0.00 inches"]],
    ["miles", 1, ["5280.00 feets", "63360.00 inches"]],
  ];
  describe.each(BVAdata)(
    "BVA: LengthConverter(%p, %p), Expected: %p",
    (measurement, val, expected) => {
      test(`returns ${JSON.stringify(expected)}`, () => {
        expect(LengthConverter(measurement, val)).toEqual(expected);
      });
    },
  );

  var DTdata = [
    ["feets", 3, ["36.00 inches", "0.00 miles"]],
    ["inches", 12, ["1.00 feets", "0.00 miles"]],
    ["miles", 2, ["10560.00 feets", "126720.00 inches"]],
    ["kilometers", 5, "wrong input"],
    ["", 5, "wrong input"],
  ];
  describe.each(DTdata)(
    "DT: LengthConverter(%p, %p), Expected: %p",
    (measurement, val, expected) => {
      test(`returns ${JSON.stringify(expected)}`, () => {
        expect(LengthConverter(measurement, val)).toEqual(expected);
      });
    },
  );
});

//-_-N4M154-_-
