import { test } from "node:test";
import assert from "node:assert/strict";
import { caretAfterDigits, formatPhone } from "../src/app/apply/phone.ts";

test("adds dashes as digits are typed", () => {
  assert.equal(formatPhone("7"), "7");
  assert.equal(formatPhone("714"), "714");
  assert.equal(formatPhone("7145"), "714-5");
  assert.equal(formatPhone("714555"), "714-555");
  assert.equal(formatPhone("7145550"), "714-555-0");
  assert.equal(formatPhone("7145550199"), "714-555-0199");
});

test("drops anything that isn't a digit", () => {
  assert.equal(formatPhone("(714) 555.0199"), "714-555-0199");
  assert.equal(formatPhone("abc"), "");
});

test("stops at 10 digits", () => {
  assert.equal(formatPhone("71455501999999"), "714-555-0199");
});

test("drops a leading 1 country code from a pasted 11-digit number", () => {
  assert.equal(formatPhone("+1 (714) 555-0199"), "714-555-0199");
});

test("keeps the caret after the same digit once dashes move", () => {
  assert.equal(caretAfterDigits("714-5", 4), 5);
  assert.equal(caretAfterDigits("714-555-0199", 3), 3);
  assert.equal(caretAfterDigits("714-555-0199", 6), 7);
  assert.equal(caretAfterDigits("714", 0), 0);
});
