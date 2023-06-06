import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useContext } from 'react';
import { CycleContext } from '../../contexts/CycleContext';
import { HistoryContainer, HistoryList, Status } from './styles';

export default function History() {
  const { cycles } = useContext(CycleContext);

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.stopDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}
                    {cycle.stopDate === null && (
                      <Status statusColor="red">Interrompido</Status>
                    )}
                    {cycle.stopDate === undefined && (
                      <Status statusColor="yellow">Em Execução</Status>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
