import fetch from 'cross-fetch';


export const sendRequestToGPT4 = async (
  conversation,
  openAIKey
) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openAIKey}`,
      },
      body: JSON.stringify(conversation),
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      throw new Error('No completion found');
    }
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};