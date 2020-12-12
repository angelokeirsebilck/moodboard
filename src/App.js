import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [ledNumberList, setLedNumberList] = useState({
    list: [],
    l21: 'red',
    l20: 'red',
    l16: 'red',
    l12: 'red',
  });

  const turnOn = (e) => {
    const led = e.target.id;
    let ledName = 'l' + led;

    if (ledNumberList.list.includes(led)) {
      ledNumberList.list = ledNumberList.list.filter((ledItem) => ledItem != led);
      setLedNumberList({ ...ledNumberList, list: ledNumberList.list });
      setLedNumberList({ ...ledNumberList, [ledName]: 'red' });
    } else {
      setLedNumberList({ ...ledNumberList, list: ledNumberList.list.push(led) });
      setLedNumberList({ ...ledNumberList, [ledName]: 'green' });
    }
  };

  const sendLights = async () => {
    console.log(ledNumberList.list);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      ledNumbers: ledNumberList.list,
    });

    console.log(body);

    try {
      const res = await axios.post('http://192.168.0.138:5000/', body, config);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='App'>
      <div className='LedContainer'>
        <button
          id='12'
          className={`btnLed btnLed-${ledNumberList.l12}`}
          onClick={(e) => turnOn(e)}
        ></button>
        <button
          id='16'
          className={`btnLed btnLed-${ledNumberList.l16}`}
          onClick={(e) => turnOn(e)}
        ></button>
        <button
          id='20'
          className={`btnLed btnLed-${ledNumberList.l20}`}
          onClick={(e) => turnOn(e)}
        ></button>
        <button
          id='21'
          className={`btnLed btnLed-${ledNumberList.l21}`}
          onClick={(e) => turnOn(e)}
        ></button>
      </div>
      <div className='Controls'>
        <button className='SendLights' onClick={() => sendLights()}>
          Send Lights
        </button>
      </div>
    </div>
  );
}

export default App;
