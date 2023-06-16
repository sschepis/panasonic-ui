import React from 'react';
import { useState } from 'react';
import Header from '../components/Header';
import SearchContainer from '../components/SearchContainer';
import Categories from '../components/Categories';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import { sendRequestToGPT4 } from '../helpers/gpt4api';

import '../App.css';
import WaitSpinner from '../components/WaitSpinner';


const Plane = () => {
  const [response, setResponse] = useState('');
  const [detailsVisible, setDetailsVisible] = useState(true);

  const handleButtonClick = async () => {
    const conversation = {
      // Fill with appropriate values for your use case
      model: 'gpt-4',
      temperature: 1,
      max_tokens: 2048,
      messages: [
        // Add message conversation
      ],
      top_p: 1,
    };

    const openAIKey = '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';

    try {
      const responseText = await sendRequestToGPT4(conversation, openAIKey);
      setGpt4Response(responseText);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const setGpt4Response = (responseText) => {
    setDetailsVisible(false);
    setResponse(responseText);
  }
  return (
    <div>
      <Header />
      <main>
        <SearchContainer handleButtonClick={handleButtonClick} />
        {detailsVisible && <Categories />}
        {!detailsVisible && <WaitSpinner />}
        {detailsVisible && <FAQ />}
        {!detailsVisible && <div id="gpt4-response">
          <p>{response}</p>
        </div>}
      </main>
      <Footer />
    </div>
  );
};

export default Plane;
