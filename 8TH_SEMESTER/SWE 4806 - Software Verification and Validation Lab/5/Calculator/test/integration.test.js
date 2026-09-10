//210042112

const basic = require("../src/basic");
const advanced = require("../src/advanced");
const custom = require("../src/custom");

describe("Unit Tests of custom calculator", () => {
  describe("calculateGrowthFactor", () => {
    test("calculates correct growth factor", () => {
      expect(custom.calculateGrowthFactor(10, 2)).toBeCloseTo(1.21, 2);
    });

    test("returns 1 when rate is 0", () => {
      expect(custom.calculateGrowthFactor(0, 5)).toBeCloseTo(1, 2);
    });

    test("returns 1 when time is 0", () => {
      expect(custom.calculateGrowthFactor(15, 0)).toBeCloseTo(1, 2);
    });
  });

  describe("calculateAmount", () => {
    test("multiplies principal by growth factor", () => {
      expect(custom.calculateAmount(1000, 1.21)).toBeCloseTo(1210, 2);
    });

    test("returns 0 when principal is 0", () => {
      expect(custom.calculateAmount(0, 1.21)).toBe(0);
    });
  });

  describe("calculateInterest", () => {
    test("returns the difference between amount and principal", () => {
      expect(custom.calculateInterest(1210, 1000)).toBeCloseTo(210, 2);
    });

    test("returns 0 when amount equals principal", () => {
      expect(custom.calculateInterest(500, 500)).toBe(0);
    });
  });

  describe("compoundInterest", () => {
    test("calculates correct amount and interest", () => {
      const result = custom.compoundInterest(1000, 10, 2);
      expect(result.amount).toBeCloseTo(1210, 2);
      expect(result.interest).toBeCloseTo(210, 2);
    });

    test("returns zero interest when rate is 0", () => {
      const result = custom.compoundInterest(500, 0, 5);
      expect(result.amount).toBeCloseTo(500, 2);
      expect(result.interest).toBeCloseTo(0, 2);
    });

    test("returns principal as amount when time is 0", () => {
      const result = custom.compoundInterest(800, 15, 0);
      expect(result.amount).toBeCloseTo(800, 2);
      expect(result.interest).toBeCloseTo(0, 2);
    });
  });
});

describe("Integration Tests", () => {
  test("Compound Interest should use both basic and advanced modules", () => {
    const addSpy = jest.spyOn(basic, "add");
    const divideSpy = jest.spyOn(basic, "divide");
    const multiplySpy = jest.spyOn(basic, "multiply");
    const subtractSpy = jest.spyOn(basic, "subtract");
    const powSpy = jest.spyOn(advanced, "Pow");

    custom.compoundInterest(1000, 10, 2);

    expect(divideSpy).toHaveBeenCalled();
    expect(addSpy).toHaveBeenCalled();
    expect(powSpy).toHaveBeenCalled();
    expect(multiplySpy).toHaveBeenCalled();
    expect(subtractSpy).toHaveBeenCalled();

    addSpy.mockRestore();
    divideSpy.mockRestore();
    multiplySpy.mockRestore();
    subtractSpy.mockRestore();
    powSpy.mockRestore();
  });

  test("calculateGrowthFactor should use functions from both basic and advanced modules", () => {
    const addSpy = jest.spyOn(basic, "add");
    const divideSpy = jest.spyOn(basic, "divide");
    const powSpy = jest.spyOn(advanced, "Pow");

    custom.calculateGrowthFactor(10, 2);

    expect(divideSpy).toHaveBeenCalledWith(10, 100);
    expect(addSpy).toHaveBeenCalled();
    expect(powSpy).toHaveBeenCalled();

    addSpy.mockRestore();
    divideSpy.mockRestore();
    powSpy.mockRestore();
  });

  test("Stub that replaces the Basic Calculator module during testing", () => {
    const multiplyStub = jest.spyOn(basic, "multiply").mockReturnValue(1212);

    const result = custom.compoundInterest(1000, 10, 2);

    expect(multiplyStub).toHaveBeenCalled();
    expect(result.amount).toBe(1212);

    multiplyStub.mockRestore();
  });
});

// -_- N4M154 -_-
