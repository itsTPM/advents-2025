export function calculateInvalidIds(
  start: number,
  end: number,
  overridingDivisors?: number[],
): number[] {
  if (!end || !start || start > end) {
    throw new Error("Invalid input data");
  }

  const invalidIds: Set<number> = new Set();
  let currentId = start;

  while (currentId <= end) {
    const currentIdLength = currentId.toString().length;
    let divisors = overridingDivisors;

    if (!divisors?.length) {
      divisors = calculateNaturalDivisors(currentIdLength).filter((
        divisor,
      ) => divisor !== 1);
    }

    for (const divisor of divisors) {
      const idParts = calculateIdParts(
        currentId,
        Number(divisor),
      );

      if (idParts.length < 2) {
        continue;
      }

      if (idParts.every((part) => part === idParts[0])) {
        invalidIds.add(currentId);
        break;
      }
    }

    currentId++;
  }

  return Array.from(invalidIds);
}

export function calculateIdParts(
  id: number | string,
  divisor: number,
): string[] {
  const stringifiedId = id.toString();
  const parts = [];

  const partLength = stringifiedId.length / divisor;

  if (partLength % 1 > 0) {
    // It would be better to throw an exception here i guess,
    // but for some reason the entire programm will slow down
    // if you do that. I haven't figured out if it's problem of
    // V8, Deno, JavaScript itself or whatever.
    return [];
  }

  for (let i = 0; i < divisor; i++) {
    const start = i * partLength;
    const end = start + partLength;

    parts.push(stringifiedId.slice(start, end));
  }

  return parts;
}

export function calculateNaturalDivisors(number: number): number[] {
  if (number < 1) {
    throw new Error("Input must be a natural number");
  }

  const naturalDivisors: Set<number> = new Set();

  for (let i = 1; i <= number; i++) {
    if (number / i % 1 === 0) {
      naturalDivisors.add(i);
    }
  }

  return Array.from(naturalDivisors);
}

if (import.meta.main) {
  const input = Deno.readTextFileSync(
    "input.txt",
  ).trim();
  const inputRanges = input.split(",");
  const handledRanges = inputRanges.map((range) => {
    const rangeParts = range.split("-");

    return {
      start: Number(rangeParts[0]),
      end: Number(rangeParts[1]),
    };
  });
  let invalidIdsSumFirst = 0;
  let invalidIdsSumSecond = 0;

  for (const range of handledRanges) {
    calculateInvalidIds(range.start, range.end, [2]).map((invalidId) =>
      invalidIdsSumFirst += invalidId
    );
    calculateInvalidIds(range.start, range.end).map((invalidId) =>
      invalidIdsSumSecond += invalidId
    );
  }

  console.log(`Invalid IDs sum (1st puzzle): ${invalidIdsSumFirst}`);
  console.log(`Invalid IDs sum (2nd puzzle): ${invalidIdsSumSecond}`);
}
