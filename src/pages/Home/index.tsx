import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

const newTaskValidationSchema = zod.object({
  task: zod.string().min(1),
  minutesAmount: zod.number().min(5).max(60),
})

type newTaskFormData = zod.infer<typeof newTaskValidationSchema>

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<newTaskFormData>({
    resolver: zodResolver(newTaskValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewTask(data: newTaskFormData) {
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTask)} action="">
        <FormContainer>
          <label htmlFor="task">Working on</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Give an name to your project"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="project 1" />
            <option value="project 2" />
            <option value="project 3" />
          </datalist>
          <label htmlFor="minutesAmount">for</label>
          <MinutesAmountInput
            placeholder="00"
            id="minutesAmount"
            type="number"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutes.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play /> Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
