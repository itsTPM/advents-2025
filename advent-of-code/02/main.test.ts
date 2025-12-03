import { assertEquals } from "@std/assert";
import {
  calculateIdParts,
  calculateInvalidIds,
  calculateNaturalDivisors,
} from "./main.ts";

Deno.test("calculate invalid ids (1st puzzle)", () => {
  // Examples from https://adventofcode.com/2025/day/2
  assertEquals(calculateInvalidIds(11, 22, [2]), [11, 22]);
  assertEquals(calculateInvalidIds(95, 115, [2]), [99]);
  assertEquals(calculateInvalidIds(1188511880, 1188511890, [2]), [
    1188511885,
  ]);
  assertEquals(calculateInvalidIds(222220, 222224, [2]), [222222]);
  assertEquals(calculateInvalidIds(1698522, 1698528, [2]), []);
  assertEquals(calculateInvalidIds(446443, 446449, [2]), [446446]);
  assertEquals(calculateInvalidIds(38593856, 38593862, [2]), [38593859]);
  assertEquals(calculateInvalidIds(565653, 565659, [2]), []);
  assertEquals(calculateInvalidIds(824824821, 824824827, [2]), []);
  assertEquals(calculateInvalidIds(2121212118, 2121212124, [2]), []);
});

Deno.test("calculate invalid ids (2nd puzzle)", () => {
  // Examples from https://adventofcode.com/2025/day/2
  assertEquals(calculateInvalidIds(11, 22), [11, 22]);
  assertEquals(calculateInvalidIds(95, 115), [99, 111]);
  assertEquals(calculateInvalidIds(1188511880, 1188511890), [1188511885]);
  assertEquals(calculateInvalidIds(222220, 222224), [222222]);
  assertEquals(calculateInvalidIds(1698522, 1698528), []);
  assertEquals(calculateInvalidIds(446443, 446449), [446446]);
  assertEquals(calculateInvalidIds(38593856, 38593862), [38593859]);
  assertEquals(calculateInvalidIds(565653, 565659), [565656]);
  assertEquals(calculateInvalidIds(824824821, 824824827), [824824824]);
  assertEquals(calculateInvalidIds(2121212118, 2121212124), [2121212121]);
});

Deno.test("calculate natural divisors", () => {
  // My examples
  assertEquals(calculateNaturalDivisors(1), [1]);
  assertEquals(calculateNaturalDivisors(2), [1, 2]);
  assertEquals(calculateNaturalDivisors(9), [1, 3, 9]);
  assertEquals(calculateNaturalDivisors(10), [1, 2, 5, 10]);
});

Deno.test("calculate id parts with divisors", () => {
  // My examples
  assertEquals(
    calculateIdParts("123123123", 1),
    ["123123123"],
  );
  assertEquals(
    calculateIdParts("123123123", 2),
    [],
  );
  assertEquals(
    calculateIdParts("123123123", 3),
    ["123", "123", "123"],
  );
  assertEquals(
    calculateIdParts("123123123", 9),
    ["1", "2", "3", "1", "2", "3", "1", "2", "3"],
  );
});
