const axios = require('axios');
const config = require('./config'); 

class BotBench {
  /**
   * Initialize the BotBench client.
   * @param {string} apiKey - Your API key for authentication.
   * @param {object} [options] - Optional configurations.
   * @param {string} [options.baseURL] - Base URL of the BotBench service.
   */
  constructor(apiKey, options = {}) {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    this.apiKey = apiKey;
    this.baseURL = options.baseURL || config.baseURL;
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'API-Key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Send an event to the BotBench service without blocking code execution.
   * @param {object} event - The event data.
   * @param {string} event.message - The message content.
   * @param {string} event.type - The type of the message ('user' or 'bot').
   * @param {string} event.threadId - The thread ID.
   */
  track(event) {
    const { message, type, threadId } = event;
    if (!message || !type || !threadId) {
      throw new Error('Missing message, type, or threadId');
    }

    const clientTimestamp = new Date().toISOString();

    this.client
      .post('/events', {
        message,
        type,
        threadId,
        clientTimestamp,
      })
      .catch((error) => {
        console.error(
          `Error sending event: ${error.response?.data?.error || error.message}`
        );
      });
  }
}

module.exports = BotBench;
