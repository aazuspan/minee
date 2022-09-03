import test from "ava";
import mock from "mock-fs";
import * as auth from "../dist/auth.js";
import * as errors from "../dist/errors.js";

const MOCK_COOKIE_DIR = "testfiles";
const MOCK_KEY =
  "1//1234567890123456-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MOCK_EMAIL = "HorstNordfink";
const MOCK_COOKIE = `
earthengine.googlesource.com	FALSE	/	TRUE	1654654321	o	git-${MOCK_EMAIL}.gmail.com=${MOCK_KEY}
`;

test.afterEach(mock.restore);

test("throws if credentials missing", (t) => {
  mock({
    [MOCK_COOKIE_DIR]: {},
  });

  t.throws(() => auth.loadGitCredentials(), {
    instanceOf: errors.MissingCredentialsError,
  });
});

test("throws if credentials invalid", (t) => {
  mock({
    [MOCK_COOKIE_DIR]: { ".gitcookies": "invalid credentials" },
  });

  t.throws(() => auth.loadGitCredentials(MOCK_COOKIE_DIR), {
    instanceOf: errors.InvalidCredentialsError,
  });
});

test("gets valid credentials", (t) => {
  mock({
    [MOCK_COOKIE_DIR]: { ".gitcookies": MOCK_COOKIE },
  });

  t.is(auth.loadGitCredentials(MOCK_COOKIE_DIR), MOCK_KEY);
});
