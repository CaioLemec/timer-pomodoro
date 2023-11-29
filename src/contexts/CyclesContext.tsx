import { ReactNode, createContext, useState } from 'react'

interface CreateCycleDate {
  task: string
  minutesAmount: number
}

interface TaskCycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  stopDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  taskCycle: TaskCycle[]
  activeCycle: TaskCycle | undefined
  activeCycleId: string | null
  amoutSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleDate) => void
  stopCurrentCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [taskCycle, setTaskCycle] = useState<TaskCycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amoutSecondsPassed, setAmoutSecondsPassed] = useState<number>(0)
  const activeCycle = taskCycle.find((task) => task.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmoutSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setTaskCycle((prevState) =>
      prevState.map((task) => {
        if (task.id === activeCycleId) {
          return { ...task, finishedDate: new Date() }
        } else {
          return task
        }
      }),
    )
  }

  function createNewCycle(data: CreateCycleDate) {
    const id = String(new Date().getTime())

    const newTaskCycle: TaskCycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setTaskCycle((prevState) => [...prevState, newTaskCycle])
    setActiveCycleId(id)
    setAmoutSecondsPassed(0)
  }

  function stopCurrentCycle() {
    setTaskCycle((prevState) =>
      prevState.map((task) => {
        if (task.id === activeCycleId) {
          return { ...task, stopDate: new Date() }
        } else {
          return task
        }
      }),
    )
    document.title = `Pomodoro Timer`
    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        taskCycle,
        activeCycle,
        activeCycleId,
        amoutSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        stopCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
