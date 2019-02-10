import words from '@/assets/strings'
import * as React from 'react'
import { useState } from 'react'
import * as uuidv4 from 'uuid'
import * as key from 'weak-key'
import style from './style.scss'

interface TODO {
  id: string
  message: string
  done: boolean
}

const initialTodos: TODO[] = [
  {
    id: uuidv4(),
    message: 'Eat awesome boiled rice.',
    done: false,
  },
  {
    id: uuidv4(),
    message: 'Read and learn React Hooks document.',
    done: true,
  },
  {
    id: uuidv4(),
    message: 'Sleep for 14 hours.',
    done: true,
  },
]

const toggleTargetDone = (id: string, todos: TODO[]) => {
  const targetTodo = todos.find((todo: TODO) => todo.id === id)
  if (!targetTodo) {
    return todos
  }

  return [
    ...todos.filter((todo: TODO) => todo.id !== id),
    {
      ...targetTodo,
      done: !targetTodo.done,
    },
  ]
}

const reducer = (state: TODO[] = initialTodos, action: any) => {
  switch (action.type) {
    case 'TOGGLE_CHECKBOX':
      return toggleTargetDone(action.id, state)
    case 'ADD_TODO':
      return [...state, { id: uuidv4(), message: action.message, done: false }]
    default:
      console.error(`Unexpected type: ${action.type}`)

      return state
  }
}

const TODO = ({ todo, onChange }: { todo: TODO; onChange: any }) => (
  <li>
    <input type="checkbox" defaultChecked={todo.done} onChange={onChange} />
    <span className={style.todoMessage}>{todo.message}</span>
  </li>
)

export default () => {
  const [state, dispatch] = React.useReducer(reducer, initialTodos)
  const [todoMessage, setTodoMessage] = useState<string>('')

  return (
    <div className={style.container}>
      <h1>{words.todo.header}</h1>
      <ul>
        {state.map((todo: TODO) => (
          <TODO key={key(todo)} todo={todo} onChange={() => dispatch({ type: 'TOGGLE_CHECKBOX', id: todo.id })} />
        ))}
      </ul>
      <input
        className={style.inputTodo}
        onChange={(e: any) => setTodoMessage(e.target.value)}
        type="text"
        placeholder="Enter new TODO message."
        value={todoMessage}
      />
      <button onClick={() => dispatch({ type: 'ADD_TODO', message: todoMessage })}>{words.todo.add}</button>
    </div>
  )
}
