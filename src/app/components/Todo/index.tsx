import words from '@/assets/strings'
import * as React from 'react'
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
]

export default () => {
  const todos = initialTodos

  return (
    <div className={style.container}>
      <h1>{words.todo.header}</h1>
      <ul>
        {todos.map((todo: TODO) => (
          <li key={key(todo)}>{todo.message}</li>
        ))}
      </ul>
      <input onChange={() => console.log('changed')} type="text" placeholder="Enter your new TODO !!" />
      <button onClick={() => console.log('clicked')}>{words.todo.add}</button>
    </div>
  )
}
