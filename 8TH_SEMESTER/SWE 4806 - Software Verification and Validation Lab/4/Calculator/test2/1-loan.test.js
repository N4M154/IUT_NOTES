//210042112

const { calculateLoan } = require("../src2/1-loan");

describe("calculateLoan", () => {
  var BVAdata = [
    // loanamount, interest rate, monthtopay,expected
    //loan amount = 0-5000, interest rate = 0-10, month to pay = 0-24
    // loanAmount = 1000 (nominal), vary interestRate x monthToPay
    [1000, 0, 0, "NaN"],
    [1000, 0, 24, "41.67"],
    [1000, 10, 0, "Infinity"],
    [1000, 10, 24, "45.83"],
    // interestRate = 5 (nominal), vary loanAmount x monthToPay
    [0, 5, 0, "NaN"],
    [0, 5, 24, "0.00"],
    [5000, 5, 0, "Infinity"],
    [5000, 5, 24, "218.75"],
    // monthToPay = 12 (nominal), vary loanAmount x interestRate
    [0, 0, 12, "0.00"],
    [0, 10, 12, "0.00"],
    [5000, 0, 12, "416.67"],
    [5000, 10, 12, "458.33"],
  ];
  describe.each(BVAdata)(
    "BVA: calculateLoan(%p, %p, %p), Expected: %p",
    (loanAmount, interestRate, monthToPay, expected) => {
      test(`returns ${expected}`, () => {
        expect(calculateLoan(loanAmount, interestRate, monthToPay)).toBe(
          expected,
        );
      });
    },
  );

  var DTdata = [
    [-1, 0.1, 12, "Please provide a valid loan amount"],
    ["", 0.1, 12, "Please provide a valid loan amount"],
    ["abc", 0.1, 12, "Please provide a valid loan amount"],
    [1000, -1, 12, "Please provide a valid interestRate"],
    [1000, "", 12, "Please provide a valid interestRate"],
    [1000, "abc", 12, "Please provide a valid interestRate"],
    [1000, 0.1, -1, "Please provide a valid month"],
    [1000, 0.1, "", "Please provide a valid month"],
    [1000, 0.1, "abc", "Please provide a valid month"],
  ];
  describe.each(DTdata)(
    "DT: calculateLoan(%p, %p, %p), Expected: %p",
    (loanAmount, interestRate, monthToPay, expected) => {
      test(`returns ${expected}`, () => {
        expect(calculateLoan(loanAmount, interestRate, monthToPay)).toBe(
          expected,
        );
      });
    },
  );

  test("MonthToPay of 0 divides by zero and returns Infinity", () => {
    expect(calculateLoan(1000, 5, 0)).toBe("Infinity");
  });
});

// -_-N4M154-_-
