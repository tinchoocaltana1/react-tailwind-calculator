import React, { useEffect, useState } from 'react';

const Calculator = () => {
    const [show, setShow] = useState('');
    const [numbers, setNumbers] = useState(0);
    const [empty, setEmpty] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setEmpty(prevEmpty => !prevEmpty);
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const click = (pressedKey) => {
        const sound = new Audio('/sounds/key.mp3');
        sound.play().catch(error => {
            console.error('Error al reproducir el sonido: ', error);
        });

        switch (pressedKey) {
            case 'C':
                setShow('');
                setNumbers(0);
                break;

            case '←':
                setShow(prevShow => prevShow.slice(0, -1));
                setNumbers(parseInt(numbers.toString().slice(0, -1)));
                break;
        
            case '=':
                try {
                    const result = evaluateExpression(show); // Evalúa la expresión
                    setShow(result.toString()); // Actualiza la pantalla con el resultado
                    setNumbers(result); // Actualiza el estado de números si es necesario
                } catch (error) {
                    console.error('Error en la evaluación de la expresión: ', error);
                    alert('Error al calcular: ' + error);
                }
                break;

            default:
                if (show.length < 13) {
                    setShow(prevShow => prevShow + pressedKey);
                    setNumbers(prevNumbers => prevNumbers + parseInt(pressedKey));
                } else {
                    alert(`No puedes ingresar tantos caracteres!`);
                }
                break;
        }
    };

    const evaluateExpression = (expression) => {
        const regex = /[+\-*\/]/;
        const parts = expression.split(regex).map(part => parseInt(part, 10));
        const operators = expression.split('').filter(char => regex.test(char));
        let result = parts[0];

        for (let i = 0; i < operators.length; i++) {
            switch (operators[i]) {
                case '+':
                    result += parts[i + 1];
                    break;
                case '-':
                    result -= parts[i + 1];
                    break;
                case '*':
                    result *= parts[i + 1];
                    break;
                case '/':
                    result /= parts[i + 1];
                    break;
                default:
                    throw new Error(`Unrecognized operator: ${operators[i]}`);
            }
        }
        
        return ( isNaN(result) ? 'Error :/' : result );
    };

    const greenStyle = "w-full h-12 bg-[#52796F] rounded border-[8px] border-[#3a5a5d] active:border-[2px] active:cursor-grabbing transition-all";
    const redStyle = "w-full h-12 bg-red-500 rounded border-[8px] border-red-900 active:border-[2px] active:cursor-grabbing transition-all";
    const equalsStyle = "w-32 h-12 bg-red-500 col-span-2 rounded border-[8px] border-red-900 active:border-[2px] active:cursor-grabbing transition-all";
    const zeroStyle = "w-32 h-12 bg-[#52796F] col-span-2 rounded border-[8px] border-[#3a5a5d] active:border-[2px] active:cursor-grabbing transition-all";

     return(
        <div className='flex flex-col justify-center items-center p-5 bg-[#CAD2C5] rounded-lg gap-3 hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-basic transition-all'>
            <div className='w-full h-20 bg-[#2F3E46] hover:bg-[#43525a] rounded p-5 flex justify-left items-center'>
                <p className='text-[30px] text-[#f4f4f4] leading-none'>
                    { show === '' ? ( empty ? '|' : '' ) : ( show.length > 13 && show !== 'Error :/' ? '≈ ' + show.slice(0, 13) : show.slice(0, 13) ) }
                </p>
            </div>
            <div className="grid grid-cols-4 gap-3 place-content-center text-[#fff]">
            <button className={zeroStyle} onClick={() => click('C')}>C</button>
            <button className={greenStyle} onClick={() => click('←')}>←</button>
            <button className={redStyle} onClick={() => click('/')}>/</button>

            <button className={greenStyle} onClick={() => click('7')}>7</button>
            <button className={greenStyle} onClick={() => click('8')}>8</button>
            <button className={greenStyle} onClick={() => click('9')}>9</button>
            <button className={redStyle} onClick={() => click('*')}>×</button>

            <button className={greenStyle} onClick={() => click('4')}>4</button>
            <button className={greenStyle} onClick={() => click('5')}>5</button>
            <button className={greenStyle} onClick={() => click('6')}>6</button>
            <button className={redStyle} onClick={() => click('-')}>−</button>

            <button className={greenStyle} onClick={() => click('1')}>1</button>
            <button className={greenStyle} onClick={() => click('2')}>2</button>
            <button className={greenStyle} onClick={() => click('3')}>3</button>
            <button className={redStyle} onClick={() => click('+')}>+</button>

            <button className={zeroStyle} onClick={() => click('0')}>0</button>
            <button className={equalsStyle} onClick={() => click('=')}>=</button>
            </div>
        </div>
    );
};

export default Calculator;