function calculateAccessiblePapers(rows: string[][]) {
  const modifiedRow = structuredClone(rows);
  let count = 0;

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];

    for (let elementIndex = 0; elementIndex < row.length; elementIndex++) {
      const element = row[elementIndex];

      if (!isPaper(element)) {
        continue;
      }

      if (isPaperAccessible(rowIndex, elementIndex, rows)) {
        modifiedRow[rowIndex][elementIndex] = "x";
        count++;
      }
    }
  }

  return { modifiedRow, count };
}

function isPaperAccessible(
  paperRow: number,
  paperIndex: number,
  rows: string[][],
) {
  const neighbours = [
    rows[paperRow - 1]?.[paperIndex - 1],
    rows[paperRow - 1]?.[paperIndex],
    rows[paperRow - 1]?.[paperIndex + 1],

    rows[paperRow][paperIndex - 1],
    rows[paperRow][paperIndex + 1],

    rows[paperRow + 1]?.[paperIndex - 1],
    rows[paperRow + 1]?.[paperIndex],
    rows[paperRow + 1]?.[paperIndex + 1],
  ];
  const neighourPaperCount = neighbours.filter((el) => el !== undefined).reduce(
    (currentSum, currentElement) =>
      currentSum + Number(isPaper(currentElement)),
    0,
  );

  return neighourPaperCount < 4;
}

function isPaper(element: string) {
  if (element === "@") {
    return true;
  }

  return false;
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("input.txt").trim();
  const rows = input.split("\n").map((row) => row.split(""));
  const counts: number[] = [];
  let modifiedRows: string[][] = [...rows];

  while (counts[counts.length - 1] !== 0) {
    const result = calculateAccessiblePapers(modifiedRows);
    counts.push(result.count);
    modifiedRows = result.modifiedRow;
  }

  const countSum = counts.reduce(
    (currentSum, currentValue) => currentSum + currentValue,
    0,
  );

  console.log(`Count of accessible papers (1st puzzle): ${counts[0]}`);
  console.log(`Count of accessible papers (2nd puzzle): ${countSum}`);
}
