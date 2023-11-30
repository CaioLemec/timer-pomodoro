import { useContext } from 'react'
import {
  HistoryContainer,
  HistoryList,
  Status,
  NoDataContainer,
} from './styles'
import { CyclesContext } from '../../contexts/CyclesContext'
import { formatDistanceToNow } from 'date-fns'
import { Scroll } from 'phosphor-react'

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>History</h1>
      {cycles.length !== 0 ? (
        <HistoryList>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Duration</th>
                <th>Start</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cycles.map((cycle) => {
                return (
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount} min</td>
                    <td>
                      {formatDistanceToNow(new Date(cycle.startDate), {
                        addSuffix: true,
                      })}
                    </td>
                    <td>
                      {cycle.finishedDate && (
                        <Status statusColor="green">Concluído</Status>
                      )}
                      {cycle.stopDate && (
                        <Status statusColor="red">Interrompido</Status>
                      )}
                      {!cycle.finishedDate && !cycle.stopDate && (
                        <Status statusColor="yellow">Em andamento</Status>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </HistoryList>
      ) : (
        <NoDataContainer>
          <Scroll size={40} />
          <span>
            <strong>You don't have a time log yet.</strong>Create a timer and
            start tracking your progress using the Pomodoro methodology.
          </span>
        </NoDataContainer>
      )}
    </HistoryContainer>
  )
}
