export function calculateBatteryCombinations(
  batteryBank: string,
  combinationLength: number,
) {
  const batteries: string[] = batteryBank.split("");
  let combination = "";
  let startIndex = 0;
  let endIndex = batteries.length - (combinationLength - 1);

  function iterate() {
    let selectedIndex = undefined;

    for (let i = startIndex; i < endIndex; i++) {
      const currentValue = Number(batteries[i]);
      if (selectedIndex === undefined) {
        selectedIndex = i;
      }

      const previousValue = Number(
        batteries[selectedIndex],
      );

      if (currentValue > previousValue) {
        selectedIndex = i;
      }

      if (currentValue === 9) {
        break;
      }
    }

    if (selectedIndex === undefined) {
      return;
    }

    combination += batteries[selectedIndex];
    startIndex = selectedIndex + 1;
    endIndex = endIndex + 1;
  }

  for (let i = 0; i < combinationLength; i++) {
    iterate();
  }

  return combination;
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("input.txt").trim();
  const batteryPacks = input.split("\n");
  const combinationsFirst = batteryPacks.map((batteryPack) =>
    calculateBatteryCombinations(batteryPack, 2)
  );
  const combinationsSecond = batteryPacks.map((batteryPack) =>
    calculateBatteryCombinations(batteryPack, 12)
  );
  const combinationSumFirst = combinationsFirst.reduce(
    (currentSum, currentValue) => Number(currentSum) + Number(currentValue),
    0,
  );
  const combinationSumSecond = combinationsSecond.reduce(
    (currentSum, currentValue) => Number(currentSum) + Number(currentValue),
    0,
  );

  console.log(`Total output joltage (1st puzzle): ${combinationSumFirst}`);
  console.log(`Total output joltage (2nd puzzle): ${combinationSumSecond}`);
}
