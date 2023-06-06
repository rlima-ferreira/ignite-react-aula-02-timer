import { differenceInSeconds } from 'date-fns';
import { useContext, useEffect } from 'react';
import { CycleContext } from '../../contexts/CycleContext';
import { CountdownContainer, Separator } from './styles';

export default function Countdown() {
  const { currentCycle, markDoneCycle, secondsPassed, setSecondsPassed } =
    useContext(CycleContext);
  const totalSeconds =
    currentCycle && currentCycle.minutesAmount
      ? currentCycle.minutesAmount * 60
      : 0;
  const currentSeconds = currentCycle ? totalSeconds - secondsPassed : 0;
  const minutes = String(Math.floor(currentSeconds / 60)).padStart(2, '0');
  const seconds = String(currentSeconds % 60).padStart(2, '0');

  useEffect(() => {
    if (currentCycle) {
      const interval = setInterval(() => {
        const difference = differenceInSeconds(
          new Date(),
          new Date(currentCycle.startDate)
        );
        if (difference >= totalSeconds) {
          markDoneCycle();
        } else setSecondsPassed(difference);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [currentCycle, totalSeconds, markDoneCycle, setSecondsPassed]);

  useEffect(() => {
    document.title = currentCycle
      ? `${minutes}:${seconds} - ${currentCycle.task}`
      : `Ignite Timer`;
  }, [minutes, seconds, currentCycle]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
