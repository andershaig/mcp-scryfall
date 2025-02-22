# MCP Scryfall

An MCP server for Scryfall's Magic: The Gathering card search that lets you search cards directly in Claude using Scryfall's powerful search syntax.

## 🚀 Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```

## 🎴 Using the Card Search Tool

The search tool supports Scryfall's full search syntax. Here are some example queries:

- `c:red t:dragon` - Find red dragons
- `f:standard r:mythic` - Find mythic rares in Standard
- `o:flying pow>3` - Find creatures with flying and power greater than 3

### Advanced Search Options

You can customize your search with these optional parameters:

- `unique`: How to handle duplicates ('cards', 'art', or 'prints')
- `order`: Sort results by ('name', 'set', 'rarity', etc.)
- `dir`: Sort direction ('asc' or 'desc')

## 🛠️ Setting up with Claude Desktop

1. Build the project:

   ```bash
   npm run build
   ```

2. Add to your Claude Desktop config:
   ```json
   {
     "mcpServers": {
       "scryfall": {
         "command": "/path/to/your/project/dist/main.js"
       }
     }
   }
   ```

### Installing from npm (after publishing)

Alternatively, you can install directly from npm:

```json
{
  "mcpServers": {
    "scryfall": {
      "command": "npx",
      "args": ["-y", "mcp-scryfall"]
    }
  }
}
```

## ✨ Key Features

- Bun for fast testing and development
- Biome for linting and formatting
- Automated version management with standard-version
- Clean, maintainable project structure

## 📂 Project Structure

```
mcp-scryfall/
├── src/
│   ├── tools/          # MCP tools implementation
│   ├── utils/          # Shared utilities
│   ├── main.ts         # Server entry point
│   └── types.ts        # Shared type definitions
├── tests/              # Test files
├── biome.json          # Linting configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## ⚙️ Configuration

### Creating New Tools

The project includes a script to help create new MCP tools:

```bash
npm run scripts/create-tool.ts <tool-name>
```

This will:

1. Create a new tool directory under `src/tools/<tool-name>`
2. Generate the basic tool structure including:
   - index.ts (main implementation)
   - schema.ts (JSON schema for tool parameters)
   - test.ts (test file)
3. Update the tools index file to export the new tool

Example:

```bash
npm run scripts/create-tool.ts weather
```

## 🛠️ Development

- **Run tests**: `npm test`
- **Format code**: `npm run format`
- **Lint code**: `npm run lint`
- **Build project**: `npm run build`

## 📜 Version Management

This project uses [standard-version](https://github.com/conventional-changelog/standard-version) for automated version management. Run `npm run release` to create a new version.

### Commit Message Format

- `feat`: New feature (bumps minor version)
- `fix`: Bug fix (bumps patch version)
- `BREAKING CHANGE`: Breaking change (bumps major version)

## 📦 Publishing to npm

1. Ensure you're logged in to npm:
   ```bash
   npm login
   ```
2. Build the project:
   ```bash
   npm run build
   ```
3. Publish the package:
   ```bash
   npm publish
   ```
   Remember to update the version number using `npm run release` before publishing new versions.
