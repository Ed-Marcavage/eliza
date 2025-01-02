# @elizaos/plugin-bootstrap Documentation

## Overview
### Purpose
The @elizaos/plugin-bootstrap package serves as a tool for handling incoming messages, composing state, generating facts, storing them in memory, and updating goals based on conversation analysis within the context of an agent runtime.

Package Information:
- Name: @elizaos/plugin-bootstrap
- Description: N/A
- Version: 0.1.7-alpha.2
- Keywords: 

### Key Features

Code Components:

Functions:
- handler: Handles the incoming message by composing state, generating facts, and storing them in memory.
- handler: Updates goals based on conversation analysis

Based on the above components, list the key features and capabilities of this plugin:
- Feature 1: Handles incoming messages efficiently
- Feature 2: Updated goals based on conversation analysis

## Installation
### Installation Instructions:

1. **Add the plugin to your ElizaOS project:**
   - Add the following to your agent/package.json dependencies:
     ```json
     {
       "dependencies": {
         "@elizaos/plugin-bootstrap": "workspace:*"
       }
     }
     ```
   - Navigate to the agent/ directory in your terminal
   - Run `pnpm install` to install the new dependency
   - Run `pnpm build` to build the project with the new plugin

2. **Import and Use the Plugin:**
   - Import the plugin using: `import { bootstrapPlugin } from "@elizaos/plugin-bootstrap";`
   - Add it to the AgentRuntime plugins array in your code

3. **Integration Example:**
   ```typescript
   import { bootstrapPlugin } from "@elizaos/plugin-bootstrap";

   return new AgentRuntime({
       // other configuration...
       plugins: [
           bootstrapPlugin,
           // other plugins...
       ],
   });
   ```

4. **Verification Steps:**
   - Verify successful integration by ensuring you see ["✓ Registering action: <plugin actions>"] in the console

### Dependencies:
- "@elizaos/core": "workspace:*"
- "tsup": "8.3.5"

### Peer Dependencies:
- "whatwg-url": "7.1.0"

## Configuration
# Configuration Documentation

## Usage of Environment Variables

In this project, we utilize the following environment variables for configuration:

1. **DATABASE_URL**: the connection string for the database
2. **API_KEY**: the authentication token for accessing the API
3. **PORT**: the port number on which the application will run

## Required Environment Variables

The project requires the following environment variables to be set:

- **DATABASE_URL**
- **API_KEY**
- **PORT**


## Example .env File

Create a `.env` file in the root directory of your project with the following content:

```plaintext
DATABASE_URL=your_database_connection_string
API_KEY=your_api_key
PORT=3000
```

Make sure to replace `your_database_connection_string` and `your_api_key` with the actual values for your environment. 

**Note:** Ensure that the `.env` file is added to your `.gitignore` file to prevent the sensitive information from being committed to the repository.

## Features

### Actions
No actions documentation available.

### Providers
No providers documentation available.

### Evaluators
No evaluators documentation available.

## Usage Examples
### evaluators/fact.ts

### Common Use Cases
1. **Generate Facts:** The code can be used to handle incoming messages, compose state, generate facts, and store them in memory. For example:

```typescript
import { handler } from 'evaluators/fact';

const runtime: IAgentRuntime = createAgentRuntime();
const message: Memory = {
  text: "Tell me a fact",
  ...
};

handler(runtime, message).then((filteredFacts: string[]) => {
  console.log(filteredFacts);
});
```

2. **Filter Facts:** The generated facts can be further filtered or processed based on specific criteria. For example:

```typescript
import { handler } from 'evaluators/fact';

const runtime: IAgentRuntime = createAgentRuntime();
const message: Memory = {
  text: "Tell me a fact about animals",
  ...
};

handler(runtime, message).then((filteredFacts: string[]) => {
  const animalFacts = filteredFacts.filter(fact => fact.includes("animal"));
  console.log(animalFacts);
});
```

### Best Practices
- **Error Handling**: Ensure proper error handling within the code to catch and handle any exceptions that may arise during the generation or filtering of facts.
- **Optimization**: Optimize the code for performance by refactoring any inefficient logic or operations within the handler function.

### evaluators/goal.ts

### Common Use Cases
1. **Updating Goals based on Conversation Analysis:**
   ```typescript
   const updatedGoals = await handler(runtime, message, state, {onlyInProgress: true});
   ```

2. **Filtering Goals to Include Only In Progress:**
   ```typescript
   const updatedGoals = await handler(runtime, message, state, {onlyInProgress: true});
   ```

### Best Practices
- **Handle Promises with `await`:** It is best practice to await the promise returned by the `handler` function to ensure that the updated goals are processed before proceeding further.
- **Pass Relevant Options Object:** When using the `handler` function, ensure to pass the `options` object with the necessary flags or parameters for goal processing. This keeps the code organized and makes it easier to understand the behavior.

## API Reference
### File: `evaluators/fact.ts`
#### Functions

##### `handler`

```typescript
/**
 * Handles the incoming message by composing state, generating facts, and storing them in memory.
 * @param {IAgentRuntime} runtime - The agent runtime
 * @param {Memory} message - The incoming message
 * @returns {Promise<string[]>} The array of filtered facts
 */
```
### File: `evaluators/goal.ts`
#### Functions

##### `handler`

```typescript
/**
 * Handles incoming messages and updates goals based on conversation analysis
 *
 * @param {IAgentRuntime} runtime - The Agent Runtime object
 * @param {Memory} message - The incoming message
 * @param {State | undefined} state - The current state
 * @param {Object} options - Additional options
 * @param {boolean} options.onlyInProgress - Flag to indicate whether to include only in progress goals (default true)
 * @returns {Promise<Goal[]>} - The updated goals after processing
 */
```

## Development

### TODO Items
No TODO items found.

### Troubleshooting
### Common Issues
1. Plugin not loading properly
   - Cause: Incorrect installation or missing dependencies
   - Solution: Reinstall the plugin or check if all dependencies are installed correctly

### Debugging Tips
- Check for any error messages in the console
- Verify that the plugin is correctly imported and initialized in your application
- Ask your questions at https://eliza.gg/ 🚀 or in our discord

### FAQ
Q: How to handle incoming messages and update goals based on conversation analysis?
A: You can use the `handler` function in `goal.ts` file, which takes in the necessary parameters and returns the updated goals after processing. Example:
```javascript
async function handler(
    runtime: IAgentRuntime,
    message: Memory,
    state: State | undefined,
    options: { [key: string]: unknown } = { onlyInProgress: true }
): Promise<Goal[]> {
    // Your code here
}
```