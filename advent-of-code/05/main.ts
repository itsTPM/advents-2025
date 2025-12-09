type Range = {
  start: number;
  end: number;
};

function isProductFresh(product: string, ranges: Range[]) {
  for (const range of ranges) {
    if (Number(product) >= range.start && Number(product) <= range.end) {
      return true;
    }
  }

  return false;
}

function countTotalFreshProducts(ranges: Range[]) {
  let count = 0;
  const sortedRanges = ranges.sort((a, b) => a.start - b.start);
  const newRanges: Range[] = [];

  for (let i = 0; i < sortedRanges.length; i++) {
    const currentRange = sortedRanges[i];

    if (i === 0) {
      newRanges.push(currentRange);
      continue;
    }

    const lastRange = newRanges[newRanges.length - 1];

    if (lastRange.end >= currentRange.start) {
      lastRange.end = Math.max(lastRange.end, currentRange.end);
    } else {
      newRanges.push(currentRange);
    }
  }

  for (const range of newRanges) {
    const rangeCount = (range.end - range.start) + 1;
    count += rangeCount;
  }

  return count;
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("input.txt").trim();
  const freshRanges = input.split("\n\n")[0].split("\n").map((range) => ({
    start: Number(range.split("-")[0]),
    end: Number(range.split("-")[1]),
  }));
  const availableProducts = input.split("\n\n")[1].split("\n");
  const freshCountFirst = availableProducts.reduce(
    (currentSum, currentProduct) =>
      currentSum += Number(isProductFresh(currentProduct, freshRanges)),
    0,
  );
  const freshCountSecond = countTotalFreshProducts(freshRanges);

  console.log(`Fresh product count (1st puzzle): ${freshCountFirst}`);
  console.log(`Fresh product count (2nd puzzle): ${freshCountSecond}`);
}
