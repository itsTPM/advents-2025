import { assertEquals } from "@std/assert";
import { calculateBatteryCombinations } from "./main.ts";

Deno.test("find largest battery combination in battery bank", () => {
  // Examples from https://adventofcode.com/2025/day/3
  assertEquals(calculateBatteryCombinations("987654321111111", 2), "98");
  assertEquals(calculateBatteryCombinations("811111111111119", 2), "89");
  assertEquals(calculateBatteryCombinations("234234234234278", 2), "78");
  assertEquals(calculateBatteryCombinations("818181911112111", 2), "92");

  assertEquals(
    calculateBatteryCombinations("987654321111111", 12),
    "987654321111",
  );
  assertEquals(
    calculateBatteryCombinations("811111111111119", 12),
    "811111111119",
  );
  assertEquals(
    calculateBatteryCombinations("234234234234278", 12),
    "434234234278",
  );
  assertEquals(
    calculateBatteryCombinations("818181911112111", 12),
    "888911112111",
  );
});
