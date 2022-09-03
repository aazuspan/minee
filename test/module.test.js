import test from "ava";
import { fs, vol } from "memfs";
import * as errors from "../dist/errors.js";
import { loadModule } from "../dist/module.js";

test.afterEach(() => {
  vol.reset();
});

test("throws loading module from invalid paths", async (t) => {
  const invalidPaths = [
    "users/johnny:script",
    "users/johnny/module:",
    "users/johnny:module:script",
    "users/johnny/module/script",
    "dfjkasdfa",
  ];

  for await (let p of invalidPaths) {
    t.throwsAsync(() => loadModule(p, { showProgress: false }), {
      instanceOf: errors.InvalidModulePathError,
    });
  }
});

// Run tests serially to avoid conflicting memfs files
test.serial("throws if module not in cloned repository", async (t) => {
  fs.mkdirSync("/mockRepo");
  await t.throwsAsync(() =>
    loadModule("users/HorstNordfink/mockRepo:mockModule")
  ),
    {
      instanceOf: errors.ModuleNotFoundError,
    };
});

test.serial("loads all data from a module", async (t) => {
  fs.mkdirSync("/mockRepo");
  fs.writeFileSync("/mockRepo/mockModule", "var a = 4;");

  const loaded = await loadModule("users/HorstNordfink/mockRepo:mockModule", {
    loadDependencies: false,
  });

  t.is(loaded.code, "var a = 4;");
  t.is(loaded.commit, "Unknown");
  t.is(loaded.path, "users/HorstNordfink/mockRepo:mockModule");
  t.is(loaded.repository.path, "users/HorstNordfink/mockRepo");
  t.is(loaded.repository.name, "mockRepo");
  t.is(loaded.repository.username, "HorstNordfink");
  t.is(
    loaded.repository.url,
    "https://earthengine.googlesource.com/users/HorstNordfink/mockRepo"
  );
  t.is(loaded.repository.localPath, "/mockRepo");
  t.is(loaded.stats.size, 10);
  t.is(loaded.dependencies, undefined);
});

test("loads license from a module", async (t) => {
  const code = `
  /**
   * @license
   * My fake license
   */
  `;
  // vol.reset();
  fs.mkdirSync("/mockRepo");
  fs.writeFileSync("/mockRepo/mockModule", code);

  const loaded = await loadModule("users/HorstNordfink/mockRepo:mockModule");

  t.true(loaded.license.includes("My fake license"));
});

test.serial("loads dependencies from code", async (t) => {
  vol.reset();
  fs.mkdirSync("/mockRepo");
  fs.writeFileSync(
    "/mockRepo/mockModule",
    "require('users/HorstNordfink/mockRepo:mockModule2');"
  );
  fs.writeFileSync("/mockRepo/mockModule2", "var a = 4;");

  const loaded = await loadModule("users/HorstNordfink/mockRepo:mockModule");
  t.is(loaded.dependencies.length, 1);
  t.is(loaded.dependencies[0].code, "var a = 4;");
});

test.serial("throws on circular dependency", async (t) => {
  vol.reset();
  fs.mkdirSync("/mockRepo");
  fs.writeFileSync(
    "/mockRepo/mockModule",
    "require('users/HorstNordfink/mockRepo:mockModule2');"
  );
  fs.writeFileSync(
    "/mockRepo/mockModule2",
    "require('users/HorstNordfink/mockRepo:mockModule');"
  );

  await t.throwsAsync(
    () => loadModule("users/HorstNordfink/mockRepo:mockModule"),
    {
      instanceOf: errors.CircularDependencyError,
    }
  );
});

test.serial("ignores circular dependency if allowed", async (t) => {
  vol.reset();
  fs.mkdirSync("/mockRepo");
  fs.writeFileSync(
    "/mockRepo/mockModule",
    "require('users/HorstNordfink/mockRepo:mockModule2');"
  );
  fs.writeFileSync(
    "/mockRepo/mockModule2",
    "require('users/HorstNordfink/mockRepo:mockModule');"
  );

  const loaded = await loadModule("users/HorstNordfink/mockRepo:mockModule", {allowCircular: true});
  t.is(loaded.dependencies[0].path, "users/HorstNordfink/mockRepo:mockModule2");
  t.is(loaded.dependencies[0].dependencies.length, 0);
});