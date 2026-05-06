type NumberArray = number[];

function largestNumber(nums: NumberArray): number {
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]! > max) {
      max = nums[i]!;
    }
  }
  return max;
}

console.log(largestNumber([1, 2, 3, 4]));
