# FluentFocus Clock

Minimal Electron + Vite + React clock with Fluent/Acrylic styling.

## 🛠️ Development & Building

First, ensure you have installed all dependencies:

```bash
npm install
```

### Run in Development Mode

Starts the Vite development server and automatically opens the Electron app with hot-reloading enabled.

```bash
npm run electron:dev
```

### Build and Package for Production

Compiles the React frontend and packages the Electron app into a highly compressed, standalone installer (`.exe`).  

```bash
npm run electron:build
```

*Note: The final executable and unpacked application will be output to the `release/` folder.*
