# Discord Bot Boilerplate

![Node.js](https://img.shields.io/badge/node.js-v20-green)
![Discord.js](https://img.shields.io/badge/discord.js-v14-blue)
![TypeScript](https://img.shields.io/badge/typescript-v4.5-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Issues](https://img.shields.io/github/issues/DFanso/discord-bot-boilerplate)
![Forks](https://img.shields.io/github/forks/DFanso/discord-bot-boilerplate)
![Stars](https://img.shields.io/github/stars/DFanso/discord-bot-boilerplate)

A boilerplate for building Discord bots using TypeScript, Discord.js, and Node.js.

## Table of Contents

- [Discord Bot Boilerplate](#discord-bot-boilerplate)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
  - [Commands and Events](#commands-and-events)
    - [Example Command (`src/commands/exampleCommand.ts`)](#example-command-srccommandsexamplecommandts)
    - [Example Event (`src/events/ready.ts`)](#example-event-srceventsreadyts)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/DFanso/discord-bot-boilerplate.git
   cd your-repo
   ```

2. Install the dependencies:
   ```sh
   yarn install
   ```

3. Compile the TypeScript code:
   ```sh
   yarn build
   ```

## Configuration

Create a `config.json` file in the `src` directory with the following structure:

```json
{
  "token": "YOUR_BOT_TOKEN",
  "clientId": "YOUR_CLIENT_ID"
}
```

Replace `YOUR_BOT_TOKEN` and `YOUR_CLIENT_ID` with your actual Discord bot token and client ID.

## Usage

To start the bot, run:

```sh
yarn start
```

This will use `nodemon` to watch for file changes and automatically restart the bot.

## Project Structure

```
my-project/
├── src/
│   ├── commands/
│   │   └── exampleCommand.ts
│   ├── events/
│   │   └── ready.ts
│   ├── services/
│   │   └── roleManager.ts
│   ├── config.json
│   └── index.ts
├── package.json
├── tsconfig.json
└── nodemon.json
```

- **commands/**: Directory for command files.
- **events/**: Directory for event files.
- **services/**: Directory for additional services.
- **config.json**: Configuration file containing the bot token and client ID.
- **index.ts**: Entry point of the bot.

## Commands and Events

- Commands are stored in the `src/commands` directory and must export a `data` property with command metadata and an `execute` function.
- Events are stored in the `src/events` directory and must export a `name` and `execute` function.

### Example Command (`src/commands/exampleCommand.ts`)

```typescript
import { CommandInteraction } from 'discord.js';

module.exports = {
  data: {
    name: 'example',
    description: 'Example command'
  },
  async execute(interaction: CommandInteraction) {
    await interaction.reply('Hello from the example command!');
  }
};
```

### Example Event (`src/events/ready.ts`)

```typescript
import { Client } from 'discord.js';

module.exports = {
  name: 'ready',
  once: true,
  execute(client: Client) {
    console.log(`${client.user?.tag} is online!`);
  }
};
```

## Contributing

Contributions are welcome! Please create a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
