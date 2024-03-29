module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
        "release",
      ],
    ],
    "scope-enum": [
      2,
      "always",
      ["config", "deps", "eslint", "prettier", "tsconfig"],
    ],
    "scope-empty": [1, "never"],
  },
};
