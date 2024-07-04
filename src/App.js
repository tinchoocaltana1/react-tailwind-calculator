import './App.css';
import Spinner from './Spinner';
import Calculator from './Calculator';
import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="bg-gradient-to-l from-[#2F3E46] to-[#354F52] w-screen h-screen flex justify-center items-center">
      {loading ? <Spinner /> : <Calculator />}

      <h2 className='absolute bottom-10 left-[50%] translate-x-[-50%] text-[#f4f4f4] text-[12px] font-medium'>by Martín Caltana</h2>
    </div>
  );
}

export default App;
