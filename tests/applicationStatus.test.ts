import { test } from "node:test";
import assert from "node:assert/strict";
import { getApplicationStatus } from "../src/lib/applicationStatus.ts";
import { getRegistrationState, isValidPreviewToken } from "../src/lib/registrationGate.ts";

function withEnv(vars: Record<string, string | undefined>, fn: () => void) {
  const saved: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(vars)) {
    saved[key] = process.env[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    fn();
  } finally {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test("only the open state offers the apply action", () => {
  assert.equal(getApplicationStatus("open").canApply, true);
  assert.equal(getApplicationStatus("open").href, "/apply");
  for (const state of ["hidden", "closed"] as const) {
    assert.equal(getApplicationStatus(state).canApply, false, state);
    assert.equal(getApplicationStatus(state).href, null, state);
  }
});

test("the FAQ answer always agrees with the apply action", () => {
  assert.doesNotMatch(getApplicationStatus("open").faqAnswer, /aren't open|closed/);
  assert.match(getApplicationStatus("hidden").faqAnswer, /aren't open yet/);
  assert.match(getApplicationStatus("closed").faqAnswer, /closed/);
});

test("registration is hidden unless REGISTRATION_ENABLED is exactly 'true'", () => {
  withEnv({ REGISTRATION_ENABLED: undefined, REGISTRATION_CLOSES_AT: undefined }, () => assert.equal(getRegistrationState(), "hidden"));
  withEnv({ REGISTRATION_ENABLED: "yes", REGISTRATION_CLOSES_AT: undefined }, () => assert.equal(getRegistrationState(), "hidden"));
  withEnv({ REGISTRATION_ENABLED: "true", REGISTRATION_CLOSES_AT: undefined }, () => assert.equal(getRegistrationState(), "open"));
});

test("registration closes once REGISTRATION_CLOSES_AT has passed", () => {
  withEnv({ REGISTRATION_ENABLED: "true", REGISTRATION_CLOSES_AT: "2000-01-01T00:00:00Z" }, () => assert.equal(getRegistrationState(), "closed"));
  withEnv({ REGISTRATION_ENABLED: "true", REGISTRATION_CLOSES_AT: "2999-01-01T00:00:00Z" }, () => assert.equal(getRegistrationState(), "open"));
  withEnv({ REGISTRATION_ENABLED: "true", REGISTRATION_CLOSES_AT: "not a date" }, () =>
    assert.throws(() => getRegistrationState(), /not a valid date/)
  );
});

test("preview tokens must be long and match exactly", () => {
  const token = "a".repeat(40);
  withEnv({ REGISTRATION_PREVIEW_TOKEN: token }, () => {
    assert.equal(isValidPreviewToken(token), true);
    assert.equal(isValidPreviewToken(token.slice(1)), false);
    assert.equal(isValidPreviewToken(undefined), false);
  });
  withEnv({ REGISTRATION_PREVIEW_TOKEN: "short" }, () => assert.equal(isValidPreviewToken("short"), false));
});
