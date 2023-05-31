import { useState, useEffect, useRef } from 'react';

const useCountDown = (initialTime: number, interval = 1000) => {
  const [time, setTime] = useState(0);
  const [text, setText] = useState('发送验证码');
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const startCountDown = () => {
    setTime(initialTime);
    setIsRunning(true);
  };

  const stopCountDown = () => {
    setIsRunning(false);
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            stopCountDown();
            setText('重新发送');
            return prevTime;
          }
          setText(`${prevTime - 1}s`);
          return prevTime - 1;
        });
      }, interval);
    }
    return () => {
      clearInterval(timerRef.current);
    };
  }, [isRunning, interval]);

  // useEffect(()=>)

  return { time, text, startCountDown, stopCountDown };
};

export default useCountDown;
