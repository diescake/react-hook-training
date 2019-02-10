import words from '@/assets/strings'
import * as React from 'react'
import { useState } from 'react'
import * as key from 'weak-key'
import style from './style.scss'

interface TODO {
  message: string
  done: boolean
}

const initialTodos: TODO[] = [
  {
    message: 'Eat awesome boiled rice.',
    done: false,
  },
  {
    message: 'Read and learn React Hooks document.',
    done: false,
  },
  {
    message: 'Sleep for 14 hours.',
    done: false,
  },
]

export default () => {
  const [todos, setTodos] = useState<TODO[]>(initialTodos)
  const [todoMessage, setTodoMessage] = useState<string>('')

  return (
    <div className={style.container}>
      <h1>{words.todo.header}</h1>
      <ul>
        {todos.map((todo: TODO) => (
          <li key={key(todo)}>{todo.message}</li>
        ))}
      </ul>
      <input
        onChange={(e: any) => setTodoMessage(e.target.value)}
        type="text"
        placeholder="Enter new TODO message."
        value={todoMessage}
      />
      <button onClick={() => setTodos([...todos, { message: todoMessage, done: false }])}>{words.todo.add}</button>
    </div>
  )
}
