import { assertEquals } from "@std/assert";
import { rotateLeft, rotateRight } from "./main.ts";

Deno.test("Number of times the dial is left pointing at 0 (1st puzzle)", () => {
  // Examples from https://adventofcode.com/2025/day/1

  assertEquals(rotateLeft(68, 50).value, 82);
  assertEquals(rotateLeft(30, 82).value, 52);
  assertEquals(rotateLeft(5, 0).value, 95);
  assertEquals(rotateLeft(55, 55).value, 0);
  assertEquals(rotateLeft(1, 0).value, 99);
  assertEquals(rotateLeft(99, 99).value, 0);
  assertEquals(rotateLeft(82, 14).value, 32);

  assertEquals(rotateRight(48, 52).value, 0);
  assertEquals(rotateRight(60, 95).value, 55);
  assertEquals(rotateRight(14, 0).value, 14);

  // My examples
  assertEquals(rotateLeft(100, 14).value, 14);
  assertEquals(rotateLeft(220, 50).value, 30);

  assertEquals(rotateRight(100, 14).value, 14);
  assertEquals(rotateRight(220, 50).value, 70);
});

Deno.test("Number of times any click causes the dial to point at 0 (2nd puzzle)", () => {
  // Examples from https://adventofcode.com/2025/day/1
  assertEquals(rotateLeft(68, 50).resetCount, 1);
  assertEquals(rotateLeft(55, 55).resetCount, 1);
  assertEquals(rotateLeft(99, 99).resetCount, 1);
  assertEquals(rotateLeft(82, 14).resetCount, 1);

  assertEquals(rotateRight(48, 52).resetCount, 1);
  assertEquals(rotateRight(60, 95).resetCount, 1);

  // My examples
  assertEquals(rotateLeft(201, 0).resetCount, 2); // This one where we start with dial = 0 is important
  assertEquals(rotateLeft(175, 75).resetCount, 2);

  assertEquals(rotateRight(175, 75).resetCount, 2);
  assertEquals(rotateRight(201, 0).resetCount, 2);
});
