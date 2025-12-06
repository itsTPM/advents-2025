const FULL_CIRCLE = 100;
const INITIAL_DIAL = 50;
const INPUT_PATH = "input.txt";

export function rotateLeft(rotation: number, dial: number) {
  if (rotation < 0 || dial < 0) {
    throw new Error("Invalid input data!");
  }

  const normalizedDial = normalize(dial);
  const normalizedRotation = normalize(rotation);
  const subtraction = normalizedDial.value - normalizedRotation.value;
  const fullCircles = normalizedDial.fullCircles +
    normalizedRotation.fullCircles;
  let value = subtraction;
  let resetCount = fullCircles;

  if (dial === 0) {
    // Subtraction will always be negative when starting from 0,
    // but we don't need to add 1 to reset count because it's only
    // needed when we enter 0 but not when we start from it
    value = subtraction + FULL_CIRCLE;
  } else if (subtraction < 0) {
    resetCount = fullCircles + 1;
    value = subtraction + FULL_CIRCLE;
  } else if (subtraction === 0) {
    resetCount = fullCircles + 1;
  }

  return {
    value,
    resetCount,
  };
}

export function rotateRight(rotation: number, dial: number) {
  if (rotation < 0 || dial < 0) {
    throw new Error("Invalid input data!");
  }

  const normalizedDial = normalize(dial);
  const normalizedRotation = normalize(rotation);
  const addition = normalizedDial.value + normalizedRotation.value;
  const fullCircles = normalizedDial.fullCircles +
    normalizedRotation.fullCircles;
  let value = addition;
  let resetCount = fullCircles;

  if (addition >= FULL_CIRCLE) {
    value = addition - FULL_CIRCLE;
    resetCount = fullCircles + 1;
  }

  return {
    value,
    resetCount,
  };
}

function normalize(dial: number) {
  const fullCircles = Math.floor(dial / FULL_CIRCLE);

  return {
    value: dial - FULL_CIRCLE * fullCircles,
    fullCircles,
  };
}

function main() {
  const input = Deno.readTextFileSync(INPUT_PATH);
  const entries = input.split("\n");
  let dialPosition = INITIAL_DIAL;
  let countFirst = 0;
  let countSecond = 0;

  for (const entry of entries) {
    if (!entry) {
      continue;
    }

    const operation = entry.charAt(0);
    const rotation = Number(entry.replace(operation, ""));
    let result;

    if (operation === "R") {
      result = rotateRight(rotation, dialPosition);
    } else if (operation === "L") {
      result = rotateLeft(rotation, dialPosition);
    } else {
      throw new Error("Unknown operation");
    }

    dialPosition = result.value;

    if (dialPosition === 0) {
      countFirst++;
    }

    countSecond += result.resetCount;
  }

  console.log(`[1st puzzle]: Final count: ${countFirst}`);
  console.log(`[2nd puzzle]: Final count: ${countSecond}`);
}

if (import.meta.main) {
  main();
}
