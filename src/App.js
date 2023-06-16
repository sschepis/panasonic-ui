import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import SearchContainer from './components/SearchContainer';
import Categories from './components/Categories';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { sendRequestToGPT4 } from './helpers/gpt4api';

//import '../styles/Plane.css';
const planeManual = `
# Aircra� Maintenance Manual 
 
## Chapter 1: Engine Systems 
 
**Common Issue: Engine Overhea�ng** 
 
*Symptoms:* High engine temperatures, loss of power, oil temperature above normal. 
 
*Resolu�on:* 
 
1. Verify that the engine oil levels are appropriate. Refill as necessary. 
2. Check for any obstruc�ons in the air intake and exhaust. 
3. Inspect the cooling system for any leaks or malfunc�ons. 
4. If the issue persists, consult with an experienced aircra� mechanic or the aircra� manufacturer for 
further troubleshoo�ng. 
 
**Service Parts:** Engine Oil, Air Filters 
 
----- 
 
## Chapter 2: Landing Gear System 
 
**Common Issue: Nose Gear Doesn't Extend** 
 
*Symptoms:* Warning light for nose gear, nose gear fails to extend during pre-landing checks. 
 
*Resolu�on:* 
 
1. Verify that the landing gear lever is in the down posi�on. 
2. Check hydraulic pressure levels. If insufficient, refill as necessary. 
3. Atempt to manually extend the landing gear following the aircra�'s specific procedures for manual 
gear extension. 
4. If the gear fails to extend, plan for a belly landing, following all established emergency protocols. 
 
**Service Parts:** Hydraulic Fluid 
 
----- 
 
## Chapter 3: Avionics System 
 
**Common Issue: Communica�on Radio Failure** 
 
*Symptoms:* No audio, or sta�c only, from communica�on radio. Unable to transmit or receive 
communica�ons. 
 
*Resolu�on:* 
 
1. Verify that the radio is turned on and tuned to the correct frequency. 
2. Check the circuit breakers for the avionics system. If any are popped, reset them. 
3. Test the aircra�'s headset and the auxiliary audio systems to isolate the problem. 
4. If the radio s�ll fails to work, plan for non-radio naviga�on and communica�on as per established 
procedures. 
 
**Service Parts:** Aircra� Headset 
 
 
# Aircra� Maintenance Manual 
 
## Chapter 4: Propeller Systems 
 
**Common Issue: Propeller Vibra�on** 
 
*Symptoms:* Excessive vibra�on while the propeller is engaged. 
 
*Resolu�on:* 
 
1. Inspect the propeller for any obvious damage like nicks or dents. 
2. Verify that the propeller is properly balanced. 
3. If vibra�on con�nues, seek assistance from a cer�fied technician. 
 
**Service Parts:** Propeller, Propeller balancing weights 
 
--- 
 
## Chapter 5: Fuel System 
 
**Common Issue: Fuel Leakage** 
 
*Symptoms:* Fuel odor, visible fuel leakage, inconsistent fuel gauge readings. 
 
*Resolu�on:* 
 
1. Check fuel caps for proper seal. 
2. Inspect fuel lines and connec�ons for leaks. 
3. If leakage con�nues, discon�nue aircra� use and consult with a cer�fied technician. 
 
**Service Parts:** Fuel caps, Fuel lines 
 
--- 
 
## Chapter 6: Electrical System 
 
**Common Issue: Batery Discharging Rapidly** 
 
*Symptoms:* Low batery voltage, loss of electrical power. 
 
*Resolu�on:* 
 
1. Verify proper opera�on of the alternator or generator. 
2. Inspect the batery for any visible damage or corrosion. 
3. Check all electrical connec�ons. 
4. If the issue persists, the batery may need to be replaced. 
 
**Service Parts:** Batery, Electrical cables, Alternator 
 
--- 
 
## Chapter 7: Hydraulic System 
 
**Common Issue: Hydraulic System Pressure Loss** 
 
*Symptoms:* Difficulty controlling the aircra�, landing gear and flaps fail to operate. 
 
*Resolu�on:* 
 
1. Check the hydraulic fluid level. Refill if necessary. 
2. Inspect hydraulic lines and connec�ons for leaks. 
3. If pressure loss con�nues, consult with a cer�fied technician. 
 
**Service Parts:** Hydraulic Fluid, Hydraulic lines 
 
--- 
 
## Chapter 8: Oxygen System 
 
**Common Issue: Oxygen System Failure** 
 
*Symptoms:* Oxygen system warning light, oxygen masks fail to deploy. 
 
*Resolu�on:* 
 
1. Verify the oxygen tank pressure and refill if necessary. 
2. Check the oxygen masks and lines for any damage. 
3. If failure persists, consult with a cer�fied technician. 
 
**Service Parts:** Oxygen tanks, Oxygen masks, Oxygen lines 
 
--- 
 
## Chapter 9: Naviga�on System 
 
**Common Issue: GPS Not Func�oning** 
 
*Symptoms:* Inaccurate or no posi�on informa�on on GPS. 
 
*Resolu�on:* 
 
1. Check the GPS unit's power and connec�ons. 
2. Perform a system reboot. 
3. If the GPS s�ll doesn't func�on, the unit may need to be serviced or replaced. 
 
**Service Parts:** GPS unit 
 
--- 
 
## Chapter 10: Pressuriza�on System 
 
**Common Issue: Cabin Depressuriza�on** 
 
*Symptoms:* Cabin al�tude warning, rapid temperature decrease. 
 
*Resolu�on:* 
 
1. Follow emergency procedures for rapid depressuriza�on. 
2. On the ground, check the door seals and pressuriza�on system for any faults. 
3. If the issue persists, consult with a cer�fied technician. 
 
**Service Parts:** Door seals 
 
--- 
 
## Chapter 11: Brake System 
 
**Common Issue: Brake Failure or Reduced Braking** 
 
*Symptoms:* Aircra� fails to decelerate properly during ground opera�ons. 
 
*Resolu�on:* 
 
1. Inspect the brake pads for wear. 
2. Check hydraulic lines to the brakes for any leaks. 
3. If brakes are not func�oning correctly, consult with a cer�fied technician. 
 
**Service Parts:** Brake pads, Brake fluid 
 
--- 
 
## Chapter 12: An�-Icing and Deicing System 
 
**Common Issue: Ice Accumula�on** 
 
*Symptoms:* Ice warning light, visible ice accumula�on. 
 
*Resolu�on:* 
 
1. Verify the opera�on of the deicing or an�-icing system. 
2. Check the condi�on of the hea�ng elements, if applicable. 
`;

function getPrompt(question) {
  const searchAndPresentData =  `given the following data: \n\n${planeManual}\n\nrespond to the question: ${question} with an appropriate answer.`
  return searchAndPresentData;
}


const App = () => {
  const [response, setResponse] = useState('');
  const [detailsVisible, setDetailsVisible] = useState(true);

  const handleButtonClick = async (valu) => {
    const conversation = {
      // Fill with appropriate values for your use case
      model: 'gpt-4',
      temperature: 1,
      max_tokens: 2048,
      messages: [
        {
          role: 'system',
          content: getPrompt(valu),
        }
      ],
      top_p: 1,
    };

    const openAIKey = process.env.REACT_APP_OPENAI_API;

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
        {detailsVisible && <FAQ />}
        {!detailsVisible && <div id="gpt4-response">
          <p>{response}</p>
        </div>}
      </main>
      <Footer />
    </div>
  );
};

export default App;

