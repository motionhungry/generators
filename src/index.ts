#!/usr/bin/env node

import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { program } from "commander";
import { $, ExecaReturnValue } from "execa";

type PackageManager = "bun" | "npm" | "pnpm" | "yarn";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copyTemplateFile = async (
  srcFile: string,
  destFile: string
): Promise<ExecaReturnValue> => {
  console.log(`Adding ${destFile}...`);
  const source = path.join(__dirname, `templates/${srcFile}`);
  const dest = path.join(process.cwd(), destFile);
  return await $`cp ${source} ${dest}`;
};

const fileExists = (filename: string) => {
  return fs.existsSync(path.join(process.cwd(), filename));
};

const installPackages = async (
  packages: string[],
  isDev: boolean = false
): Promise<ExecaReturnValue> => {
  console.log(`Installing ${packages.join(' ')}...`);
  const args = [];

  const command: PackageManager = (() => {
    if (fileExists("pnpm-lock.yaml")) {
      return "pnpm";
    }
    if (fileExists("yarn.lock")) {
      return "yarn";
    }
    if (fileExists("bun.lockb")) {
      return "bun";
    }
    return "npm";
  })();

  if (isDev) {
    if (["pnpm", "yarn"].includes(command)) {
      args.push("-D");
    } else if (command === "bun") {
      args.push('-d');
    } else {
      " --save-dev "
    }
  }

  return await $`${command} add ${[...args, ...packages]}`;
};

const itemMap: Record<string, () => Promise<void>> = {
  prettier: async () => {
    copyTemplateFile("prettier/.prettierrc", ".prettierrc");
    installPackages(["@motionhungry/style-policy"], true);
  },
};

program
  .command("generate")
  .argument("<item>", "item that you want to generate")
  .action((item: keyof typeof itemMap) => {
    const func = itemMap[item];
    if (func) {
      func();
    }
  });

program.parse();
