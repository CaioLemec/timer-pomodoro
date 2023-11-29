import { createContext, useState } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewTaskCycleForm } from './components/NewTaskCycleForm'
import { Countdown } from './components/Countdown'
interface TaskCycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  stopDate?: Date
}

const newTaskValidationSchema = zod.object({
  task: zod.string().min(5),
  minutesAmount: zod.number().min(1).max(60),
})

type newTaskFormData = zod.infer<typeof newTaskValidationSchema>

interface CyclesContextType {
  activeCycle: TaskCycle | undefined
  activeCycleId: string | null
  amoutSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
  const [taskCycle, setTaskCycle] = useState<TaskCycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amoutSecondsPassed, setAmoutSecondsPassed] = useState<number>(0)

  const newCycleForm = useForm<newTaskFormData>({
    resolver: zodResolver(newTaskValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm
  const activeCycle = taskCycle.find((task) => task.id === activeCycleId)
  const task = watch('task')
  const isSubmitDisabled = !task

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

  function handleCreateNewTask(data: newTaskFormData) {
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
    reset()
  }

  function handleStopCycle() {
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
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTask)} action="">
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            amoutSecondsPassed,
            markCurrentCycleAsFinished,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewTaskCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>
        {activeCycle ? (
          <StopCountdownButton onClick={handleStopCycle} type="button">
            <HandPalm /> Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play /> Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
