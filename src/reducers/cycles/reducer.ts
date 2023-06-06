import { produce } from 'immer';
import { CyclesActionsType } from './actions';

export interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  stopDate?: Date | null;
}

interface IState {
  cycles: ICycle[];
  currentCycle: ICycle | null;
}

export function cyclesReducer(state: IState, actions: any) {
  switch (actions.type) {
    case CyclesActionsType.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(actions.payload.data);
        draft.currentCycle = actions.payload.data;
      });
    case CyclesActionsType.STOP_CYCLE: {
      const index = state.cycles.findIndex(
        (cycle: ICycle) => cycle.id === state.currentCycle?.id
      );

      return index >= 0
        ? produce(state, (draft) => {
            draft.cycles[index].stopDate = null;
            draft.currentCycle = null;
          })
        : state;
    }
    case CyclesActionsType.MARK_DONE_CYCLE: {
      const index = state.cycles.findIndex(
        (cycle: ICycle) => cycle.id === state.currentCycle?.id
      );

      return index >= 0
        ? produce(state, (draft) => {
            draft.cycles[index].stopDate = new Date();
            draft.currentCycle = null;
          })
        : state;
    }
    default:
      return state;
  }
}
