import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { CycleContext } from '../../contexts/CycleContext';
import { FormContainer, MinutesAmountInput, TaskInput } from './styles';

export default function FormNewCycle() {
  const { currentCycle } = useContext(CycleContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestions"
        disabled={!!currentCycle}
        {...register('task')}
      />
      <datalist id="task-suggestions">
        <option value="Projeto 1">Projeto 1</option>
        <option value="Projeto 2">Projeto 2</option>
        <option value="Projeto 3">Projeto 3</option>
        <option value="Projeto 4">Projeto 4</option>
        <option value="Projeto 5">Projeto 5</option>
        <option value="Projeto 6">Projeto 6</option>
      </datalist>
      <label htmlFor="minutesAmount">Durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  );
}
