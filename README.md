# Podcaster App

## Table of Contents

- [Requirements](#requirements)
- [Running the app](#running-the-app)
  - [Locally](#locally)
  - [In a devcontainer](#in-a-devcontainer)
- [Testing](#testing)
- [Linting and formatting](#linting-and-formatting)
- [Architecture](#architecture)
  - [Technologies used](#Technologies-used)
  - [Project structure](#project-structure)
  - [Data retrieval and responsibilities](#data-retrieval-and-responsibilities)
  - [Conventions](#conventions)

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

## Architecture

The app is a Single Page Application (SPA) built with React. It uses the React Router library for navigation and Vite as a build tool and development server.

### Technologies used

- [React Router](https://reactrouter.com/): For the router.
- [Zustand](https://github.com/pmndrs/zustand): For the store and global state management.
- [Tailwind CSS](https://tailwindcss.com/): For the styling.
- [PostCSS](https://postcss.org/): As the CSS processor (used for Tailwind CSS).
- [clsx](https://github.com/lukeed/clsx): For conditional class names.
- [Vitest](https://vitest.dev/): As the testing framework.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/): For testing React components.
- [lint-staged](https://github.com/okonet/lint-staged): For running linters on staged git files.
- [Prettier](https://prettier.io/): For code formatting.
- [ESLint](https://eslint.org/): For linting.
- [pnpm](https://pnpm.io/): As the package manager.
- [Vite](https://vitejs.dev/): As the build tool and development server.

### Project structure

Folders and files are organized as follows:

- `src/`
  - `components/`
    - `common/`: Contains components that can be used across the app.
    - `podcast/`: Podcast-related components (more tightly coupled to the domain).
  - `pages/`: Page components used by the router (views).
  - `store/`: Contains global state management logic.
  - `services/`:Contains services that communicate with the API using native browser APIs (`fetch`).
  - `types/`: Type definitions for the API and the app (e.g., podcasts, episodes).
  - `utils/`: Utility functions and helpers.
  - `router.tsx`: Configures the app’s routes, along with the loader and page components used to render each route.
  - `app.tsx`: The entry point of the app, which mounts the providers (only the router in this case).
  - `main.tsx`: The top-level component that mounts the app into the DOM.
- `public/`: Static assets (e.g., images).
- `test-support/`: Configuration files and utilities for testing.

### Data retrieval and responsibilities

#### iTunes API and proxy server (CORS workaround)

Data is retrieved from the iTunes Search API and RSS feeds.

To prevent CORS policy blocks by the browser, a Vite proxy server is used to forward client requests from `/api` to `https://itunes.apple.com`. This requires the production build to be run with Vite's server using `pnpm preview`.

#### Responsibilities

The logic for data retrieval and caching is handled by the page loaders. Each page or route has its own loader, responsible for fetching data if it is not cached or has expired, storing it in the store, and returning it to the component.

The router is responsible for rendering the page components and passing the loaders to them.

The store uses Zustand to manage the app’s global state. It is responsible for storing data in `localStorage` and providing actions to modify it. These actions can be used outside of React components to update the state, enabling their use by the page loaders.

### Conventions

- **File and folder naming**: Files and folders are named in lowercase, with dashes separating words (e.g., `search-input.tsx`). This prevents issues with case sensitivity across different operating systems and ensures consistency. An ESLint rule enforces this convention.
- **Test files**: Test files are named the same as the file being tested, but with a `.test` suffix (e.g., `date.test.ts`, `card.test.tsx`).
- **Imports**: Import paths (e.g., `@/components`, `@/utils`) are relative to the `src` folder. This shortens import paths and prevents the need for updates when the project structure changes.
- **File extensions**: Files that use JSX have a `.tsx` extension. The `.ts` extension is used for all other TypeScript files, except for certain configuration files that use `.js`.
