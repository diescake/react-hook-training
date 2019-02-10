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

const TODO = ({ todo, onChange }: { todo: TODO; onChange: any }) => (
  <li>
    <input type="checkbox" defaultChecked={todo.done} onChange={onChange} />
    <span className={style.todoMessage}>{todo.message}</span>
  </li>
)

export default () => {
  const [todos, setTodos] = useState<TODO[]>(initialTodos)
  const [todoMessage, setTodoMessage] = useState<string>('')

  return (
    <div className={style.container}>
      <h1>{words.todo.header}</h1>
      <ul>
        {todos.map((todo: TODO) => (
          <TODO key={key(todo)} todo={todo} onChange={() => setTodos(toggleTargetDone(todo.id, todos))} />
        ))}
      </ul>
      <input
        className={style.inputTodo}
        onChange={(e: any) => setTodoMessage(e.target.value)}
        type="text"
        placeholder="Enter new TODO message."
        value={todoMessage}
      />
      <button onClick={() => setTodos([...todos, { id: uuidv4(), message: todoMessage, done: false }])}>{words.todo.add}</button>
    </div>
  )
}
