import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from 'phosphor-react';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';
import Countdown from '../../components/Countdown';
import FormNewCycle from '../../components/FormNewCycle';
import { CycleContext } from '../../contexts/CycleContext';
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles';

const formValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
});

type FormData = zod.infer<typeof formValidationSchema>;

export default function Home() {
  const { currentCycle, stopCycle, createCycle } = useContext(CycleContext);
  const formCycle = useForm<FormData>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: undefined,
    },
  });
  const { handleSubmit, watch, reset } = formCycle;
  const task = watch('task');
  const isSubmitDisabled = !task;

  function handleCreateCycle(formData: FormData) {
    createCycle(formData);
    reset();
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateCycle)}>
        <FormProvider {...formCycle}>
          <FormNewCycle />
        </FormProvider>
        <Countdown />
        {currentCycle ? (
          <StopCountdownButton type="button" onClick={stopCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
