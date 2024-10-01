const axios = require('axios');
const BotBench = require('../index'); 
const config = require('../config');     

jest.mock('axios'); 

describe('BotBench', () => {
  const apiKey = 'test-api-key';
  let botBench;

  beforeEach(() => {
    axios.create.mockReturnValue({
      post: jest.fn(() => Promise.resolve()), 
    });
    botBench = new BotBench(apiKey);
  });

  it('should initialize BotBench with the correct baseURL from config', () => {
    expect(botBench.baseURL).toBe(config.baseURL);
  });

  it('should allow overriding the baseURL in options', () => {
    const customBaseURL = 'https://custom-url.com';
    botBench = new BotBench(apiKey, { baseURL: customBaseURL });
    expect(botBench.baseURL).toBe(customBaseURL);
  });

  it('should send an event with the correct data', () => {
    const event = { message: 'Hello, world!', type: 'user', threadId: 'abc123' };
    const timestamp = new Date().toISOString();
  
    jest.spyOn(global, 'Date').mockImplementationOnce(() => ({
      toISOString: jest.fn().mockReturnValue(timestamp),
    }));
  
    botBench.send(event);
  
    expect(botBench.client.post).toHaveBeenCalledWith('/events', {
      message: 'Hello, world!',
      type: 'user',
      threadId: 'abc123',
      clientTimestamp: timestamp,
    });
  });
});
