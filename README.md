
# BotBench

[](https://github.com/yourusername/botbench/blob/main/LICENSE)

**BotBench** is a Node.js client that allows you to send events to the BotBench service using your API key. The service stores threads for AI bots and users, enabling analysis of conversations.

## Features

-   **Easy Integration**: Simple methods to interact with the BotBench service.
-   **Event Logging**: Send events of AI bot and user interactions.
-   **Client-side Timestamps**: Captures event timestamps to avoid network latency issues.

## Installation

`npm install botbench` 

## BETA
BotBench is currently in closed beta, if you want to join please send a message to beta@botbench.io to get your API-key.

1. Obtain an API-key.
2. Implement the tracking code

### Initialization

    const BotBench = require('botbench');
    const botBenchClient = new BotBench('YOUR_API_KEY');` 

### Sending Events

    `// Construct message
	const event = {
	  message: 'Hello, World!',
	  type: 'user', // 'user' or 'bot'          
	  threadId: 'THREAD_ID',
	};
	
	// Non-blocking 
	botBenchClient.track({ message: 'Hello, World!', type: 'user', threadId: 'YOUR_THREAD_ID', });

	// Blocking 
	botBenchClient.track({ message: 'Hello, World!', type: 'user', threadId: 'YOUR_THREAD_ID', }) 
	.then((response) => { console.log('Event sent successfully:', response.data); })
	.catch((error) => { console.error('Error sending event:', error.message); });

**Note:** The `track` method automatically captures the client-side timestamp.

## Example Usage

	const BotBench = require('botbench');

	// Initialize the client
	const botBenchClient = new BotBench('YOUR_API_KEY');

	// Simulate a conversation
	async function simulateConversation() {
	  const threadId = 'YOUR_THREAD_ID';

	  // User message
	  await botBenchClient.track({
	    message: 'Hello, bot!',
	    type: 'user',
	    threadId,
	  });

   	  /* ASSISTANT RESPONSE GENERATION CODE */

	  // Bot response
	  await botBenchClient.track({
	    message: 'Hello! How can I assist you today?',
	    type: 'bot',
	    threadId,
	  });

	  console.log('Conversation events sent successfully.');
	}

	simulateConversation().catch((error) => {
	  console.error('Error:', error.message);
	});` 

## Notes

-   Replace `'YOUR_API_KEY'` and `'YOUR_THREAD_ID'` with your actual API key and thread ID.
-   The `track` method captures the timestamp when called to avoid network latency in event timing.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
