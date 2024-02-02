# Motion Hungry Generators

Generators is a CLI tool created to streamline the initialization of projects by applying common templates that adhere to Motion Hungry's established best practices. The templates are designed to support both internal development and client project workflows, ensuring a consistent and optimized setup from the start.

## Installation

Generators can be used without global installation using `npx`. Ensure you have Node.js installed to use it.

However, if you prefer to install it globally, you can do so via npm:

```bash
npm install -g @motionhungry/generators
```

Or using Yarn:

```bash
yarn global add @motionhungry/generators
```

Or using pnpm:

```bash
pnpm add -g @motionhungry/generators
```

## Usage

To generate a template without installing the package globally, you can use `npx`:

```bash
npx @motionhungry/generators generate <template>
```

Where `<template>` is the name of the template you want to generate. Available templates include:

- `prettier` - Adds a Prettier config from [@motionhungry/style-policy](https://www.npmjs.com/package/@motionhungry/style-policy).
- `semantic-release` - Configures Semantic Release for automated version management and package publishing.
- `strapi` - Prepares a Strapi project with Docker and deployment scripts to Google Cloud Run via Github Actions.

To view a list of all available templates, run:

```bash
generators list
```

If using `npx`, prepend the command with `npx @motionhungry/generators` like so:

```bash
npx @motionhungry/generators list
```

## Development

For those looking to contribute or modify the Generators CLI, here are the instructions for setting up your development environment:

1. Clone the repository to your local machine.
2. Navigate to the cloned directory and install dependencies using `pnpm install`.

### Available Scripts

- **`pnpm build`**: Compiles the TypeScript code to JavaScript, preparing it for production use. This script is essential for creating a build of the CLI tool that can be executed in a Node.js environment.

- **`pnpm dev`**: Runs the project in development mode with a file watcher. This is useful for actively developing and testing changes to the CLI, as it automatically recompiles the TypeScript code upon file changes, facilitating immediate feedback on your development efforts.

To contribute to the project, make your changes locally and use `pnpm dev` to test them in real-time. Once you're satisfied with your changes, compile the project with `pnpm build` and submit a pull request for review.

## Contributing

Contributions are welcome! If you have a template that you believe would be beneficial for the community, feel free to fork the repository, add your template, and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE.txt file for details.
