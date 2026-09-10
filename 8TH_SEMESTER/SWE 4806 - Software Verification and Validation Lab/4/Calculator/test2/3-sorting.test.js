//210042112

const { insertionSort } = require("../src2/3-sorting");

describe("insertionSort", () => {
  // array length: min = 0 (empty), max = 10
  var BVAdata = [
    [[], []],
    [[1], [1]],
    [
      [2, 1],
      [1, 2],
    ],
    [
      [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
  ];
  describe.each(BVAdata)(
    "BVA: insertionSort(%p), Expected: %p",
    (arr, expected) => {
      test(`returns ${JSON.stringify(expected)}`, () => {
        expect(insertionSort(arr)).toStrictEqual(expected);
      });
    },
  );

  var DTdata = [
    [
      [2, 1, 4, 3],
      [1, 2, 3, 4],
    ],
    [
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      [3, 3, 3],
      [3, 3, 3],
    ],
    [
      [-1, -5, 0, 3, -2],
      [-5, -2, -1, 0, 3],
    ],
  ];
  describe.each(DTdata)(
    "DT: insertionSort(%p), Expected: %p",
    (arr, expected) => {
      test(`returns ${JSON.stringify(expected)}`, () => {
        expect(insertionSort(arr)).toEqual(expected);
      });
    },
  );
});
// -_- N4M154-_-
