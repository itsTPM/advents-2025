export function solveLineProblems(text: string) {
  const csv = text.replaceAll(/(?<=\n) +/g, "").replaceAll(/ +/g, " ")
    .replaceAll(
      / +/g,
      ",",
    );
  const lines: string[][] = csv.split("\n").map((line) => line.split(","));
  const maxLineLength = calculateMaxLineLength(lines);
  let answer = 0;

  for (let i = 0; i < maxLineLength; i++) {
    const problemOperation = lines.at(-1)!.at(i);
    let problemResult = null;

    for (const line of lines) {
      const currentString = line[i];

      if (!currentString) {
        continue;
      }

      if (problemResult === null) {
        problemResult = currentString;
        continue;
      }

      if (isOperationSymbol(currentString)) {
        continue;
      }

      const expression = `${problemResult}${problemOperation}${
        Number(currentString)
      }`;
      problemResult = eval(expression);
    }

    answer += problemResult;
  }

  return answer;
}

export function solveColumnProblems(text: string) {
  const lines = text.split("\n");
  const maxLineLength = calculateMaxLineLength(lines);
  let problemOperation = "";
  let problemResult = null;
  let answer = 0;

  for (let i = 0; i < maxLineLength; i++) {
    let problemNumber = null;

    for (const line of lines) {
      const currentCharacter = line[i];

      if (currentCharacter === undefined || currentCharacter === " ") {
        continue;
      }

      if (isOperationSymbol(currentCharacter)) {
        problemOperation = currentCharacter;
        continue;
      }

      if (problemNumber === null) {
        problemNumber = currentCharacter;
        continue;
      }

      problemNumber = Number(String(problemNumber) + currentCharacter);
    }

    if (problemNumber === null) {
      answer += problemResult;
      problemResult = null;
      continue;
    }

    if (problemResult === null) {
      problemResult = problemNumber;
      continue;
    }

    const expression = `${problemResult}${problemOperation}${problemNumber}`;
    problemResult = eval(expression);
  }

  answer += problemResult;
  problemResult = null;

  return answer;
}

function isOperationSymbol(string: string) {
  return ["+", "*"].includes(string);
}

function calculateMaxLineLength(lines: any[]) {
  return lines.reduce(
    (currentMax, currentLine) => Math.max(currentLine.length, currentMax),
    0,
  );
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("input.txt").trim();
  const firstSum = solveLineProblems(input);
  const secondSum = solveColumnProblems(input);

  console.log(`Problem result sum (1st puzzle): ${firstSum}`);
  console.log(`Problem result sum (2nd puzzle): ${secondSum}`);
}
