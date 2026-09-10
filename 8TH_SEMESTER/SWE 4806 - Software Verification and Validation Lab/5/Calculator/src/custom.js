//210042112

const basic = require("./basic");
const advanced = require("./advanced");

//(1+rate/100)^time
function calculateGrowthFactor(rate, time) {
  const rateDecimal = basic.divide(rate, 100);
  const growthBase = basic.add(1, rateDecimal);
  return advanced.Pow(growthBase, time);
}

//A=principal*growthfactor
function calculateAmount(principal, growthFactor) {
  return basic.multiply(principal, growthFactor);
}

//interest=amount-principal
function calculateInterest(amount, principal) {
  return basic.subtract(amount, principal);
}

//calls all the above functions
function compoundInterest(principal, rate, time) {
  const growthFactor = calculateGrowthFactor(rate, time);
  const amount = calculateAmount(principal, growthFactor);
  const interest = calculateInterest(amount, principal);

  return {
    amount,
    interest,
  };
}

module.exports = {
  calculateGrowthFactor,
  calculateAmount,
  calculateInterest,
  compoundInterest,
};

// -_- N4M154 -_-
