import { test } from "node:test";
import assert from "node:assert/strict";
import { bookingPolicy } from "./booking-policy";

test("the owner does not impose a fixed minimum hire duration", () => {
  assert.equal(bookingPolicy.minimumHours, null);
});