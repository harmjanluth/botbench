
# BotBench

**BotBench** is a Node.js client for sending event data to the BotBench service, which stores and analyzes AI bot and user conversation threads.

## Key Features

- Simple Integration: Easy methods to interact with BotBench.
- Event Logging: Log bot and user interactions.
- Accurate Timestamps: Captures client-side timestamps to minimize latency impact.

## Installation

	npm install botbench

## Beta Access

BotBench is in closed beta. To participate, email beta@botbench.io for an API key.

## Getting Started

### 1. Initialize the Client

#### Using `require()` (CommonJS)
	const BotBench = require('botbench');
	const botBenchClient = new BotBench('YOUR_API_KEY'); // Replace with your API key

#### Using `import` (ES Modules)
	import BotBench from 'botbench';
	const botBenchClient = new BotBench('YOUR_API_KEY'); // Replace with your API key

### 2. Send Events

You can send either user or bot events by specifying the event type and thread (or conversation) ID.

#### Non-blocking Example

	botBenchClient.track({
	  message: 'Hello, World!',
	  type: 'user', // 'user' or 'bot'
	  threadId: 'YOUR_THREAD_ID',  // Replace with actual thread ID
	});

#### Blocking Example (with Promise Handling)

	botBenchClient.track({
	  message: 'Hello, World!',
	  type: 'user',
	  threadId: 'YOUR_THREAD_ID',
	})
	.then(response => console.log('Event sent:', response.data))
	.catch(error => console.error('Error:', error.message));

## Example Usage

	const BotBench = require('botbench');

	// Initialize with your API key
	const botBenchClient = new BotBench('YOUR_API_KEY'); 

	async function simulateConversation() {
	  const threadId = 'YOUR_THREAD_ID';

	  // User message
	  await botBenchClient.track({
	    message: 'Hello, bot!',
	    type: 'user',
	    threadId,
	  });

	  // Your response generation code here
	  const botResponse = await generateBotResponse('Hello, bot!'); // Example

	  // Bot response
	  await botBenchClient.track({
	    message: botResponse,
	    type: 'bot',
	    threadId,
	  });

	  console.log('Conversation logged successfully.');
	}

	simulateConversation().catch(error => console.error('Error:', error.message));

## Important Note
- All incoming messages are **anonymized** to remove any personal data. We ensure that no personal identifying information (PII) is stored or processed.

## Notes
- API Key and Thread ID: Replace 'YOUR_API_KEY' and 'YOUR_THREAD_ID' with your actual values.
- Timestamp Handling: The track method automatically captures client-side timestamps to ensure event timing accuracy.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
