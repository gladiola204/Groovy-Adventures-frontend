import { useState } from 'react';


const useCounterTravellersState = () => {
  const [numberOfTravellers, setNumberOfTravellers] = useState(1);

function countTravellers(value: -1 | 1) {
    if(numberOfTravellers <= 1 && value === -1) {
        return;
    };
    
    setNumberOfTravellers((prevState) => prevState + value);
};

  return {
    numberOfTravellers,
    countTravellers,
  };
};

export default useCounterTravellersState;