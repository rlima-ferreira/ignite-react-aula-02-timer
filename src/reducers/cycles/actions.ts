import { ICycle } from './reducer';

export enum CyclesActionsType {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  STOP_CYCLE = 'STOP_CYCLE',
  MARK_DONE_CYCLE = 'MARK_DONE_CYCLE',
}

export const addNewCycleAction = (data: ICycle) => ({
  type: CyclesActionsType.ADD_NEW_CYCLE,
  payload: {
    data,
  },
});

export const stopCycleAction = () => ({
  type: CyclesActionsType.STOP_CYCLE,
});

export const markDoneCycleAction = () => ({
  type: CyclesActionsType.MARK_DONE_CYCLE,
});
