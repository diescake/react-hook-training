import words from '@/assets/strings'
import * as React from 'react'
import { useReducer, useState } from 'react'
import { AnyAction } from 'redux'
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

const reducer = (state: TODO[] = initialTodos, action: AnyAction) => {
  switch (action.type) {
    case 'TOGGLE_CHECKBOX':
      return state.map((todo: TODO) => {
        if (todo.id !== action.id) {
          return todo
        }

        return {
          ...todo,
          done: !todo.done,
        }
      })
    case 'ADD_TODO':
      return [...state, { id: uuidv4(), message: action.message, done: false }]
    default:
      console.error(`Unexpected type: ${action.type}`)

      return state
  }
}

const persistReducer = (state: TODO[] = initialTodos, action: AnyAction) => {
  const nextState = reducer(state, action)
  localStorage.setItem('todos', JSON.stringify(nextState))

  return nextState
}

const TODO = ({ todo, onChange }: { todo: TODO; onChange: any }) => (
  <li>
    <input type="checkbox" defaultChecked={todo.done} onChange={onChange} />
    <span className={style.todoMessage}>{todo.done ? <s>{todo.message}</s> : todo.message}</span>
  </li>
)

export default () => {
  const [state, dispatch] = useReducer(
    persistReducer,
    (() => {
      const serializedTodos = localStorage.getItem('todos')
      if (!serializedTodos) {
        return initialTodos
      }

      return JSON.parse(serializedTodos)
    })()
  )
  const [message, setMessage] = useState<string>('')

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
        type="text"
        value={message}
        placeholder="Enter new TODO message."
        onChange={(e: any) => setMessage(e.target.value)}
      />
      <button
        onClick={() => {
          if (!message) {
            return
          }
          dispatch({ type: 'ADD_TODO', message })
          setMessage('')
        }}
      >
        {words.todo.add}
      </button>
    </div>
  )
}
