import { differenceInSeconds } from 'date-fns';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { addNewCycleAction, stopCycleAction } from '../reducers/cycles/actions';
import { ICycle, cyclesReducer } from '../reducers/cycles/reducer';

interface IProps {
  children: ReactNode;
}

interface ICycleContext {
  cycles: ICycle[];
  currentCycle: ICycle | null;
  secondsPassed: number;
  setSecondsPassed: Dispatch<SetStateAction<number>>;
  createCycle: (data: Omit<ICycle, 'id' | 'startDate' | 'stopDate'>) => void;
  stopCycle: () => void;
  markDoneCycle: () => void;
}

export const CycleContext = createContext({} as ICycleContext);

export default function CycleProvider({ children }: IProps) {
  const [secondsPassed, setSecondsPassed] = useState(() => {
    if (cycleState.currentCycle) {
      return differenceInSeconds(
        new Date(),
        new Date(cycleState.currentCycle.startDate)
      );
    }
    return 0;
  });
  const [cycleState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      currentCycle: null,
    },
    (initialState) => {
      const stateJSON = localStorage.getItem('@ignite-time:cycles-state-1.0.0');
      if (stateJSON) return JSON.parse(stateJSON);
      return initialState;
    }
  );

  useEffect(() => {
    const stateJSON = JSON.stringify(cycleState);
    localStorage.setItem('@ignite-time:cycles-state-1.0.0', stateJSON);
  }, [cycleState]);

  function createCycle(data: Omit<ICycle, 'id' | 'startDate' | 'stopDate'>) {
    const cycle: ICycle = {
      ...data,
      id: String(new Date().getTime()),
      startDate: new Date(),
      stopDate: undefined,
    };
    dispatch(addNewCycleAction(cycle));
    setSecondsPassed(0);
  }

  function stopCycle() {
    if (cycleState.currentCycle) {
      dispatch(stopCycleAction());
      setSecondsPassed(0);
    }
  }

  function markDoneCycle() {
    if (cycleState.currentCycle) {
      dispatch(markDoneCycle());
      setSecondsPassed(0);
    }
  }

  return (
    <CycleContext.Provider
      value={{
        cycles: cycleState.cycles,
        currentCycle: cycleState.currentCycle,
        secondsPassed,
        setSecondsPassed,
        createCycle,
        stopCycle,
        markDoneCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}
