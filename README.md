# Podcaster App

## Requirements

- Node.js 20 (Check `.npmrc` to see the exact version used for the project)
- pnpm 9 ([Installation instructions](https://pnpm.io/installation))

Alternatively, you can run the app in a devcontainer using the Dev Containers extension in VS Code. Check the section about [running in a devcontainer](#in-a-devcontainer) for more information.

## Running the app

### Locally

Install dependencies:

```bash
pnpm install
```

Development mode:

```bash
pnpm dev
```

Production mode:

```bash
pnpm build && pnpm preview
```

> **Important:** For the Vite proxy server to work, the production build needs to be run with `pnpm preview` instead of any other static file server like `http-server` or similar.

### In a devcontainer

There is a devcontainer configuration that can be used to run the app without the need to install Node.js and pnpm locally.

To use it, you need to have the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed in VS Code and Docker Desktop running. The project can be opened in a remote container selecting `Remote-Containers: Reopen in Container` from the command palette.

Once the container is running, the app can be started using `pnpm dev` or `pnpm build && pnpm preview` from the container shell.

## Testing

The following commands are available:

- `pnpm test:watch` Runs unit tests in watch mode
- `pnpm test` Runs unit tests once
- `pnpm test:coverage` Runs unit tests and generates a coverage report

## Linting and formatting

The following commands are available:

- `pnpm lint` Runs ESLint (`--fix` flag can be added to fix lint errors automatically)
- `pnpm format` Formats the code with Prettier
