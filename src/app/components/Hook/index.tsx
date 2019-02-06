import { Footer } from '@/app/components/Footer'
import words from '@/assets/strings'
import * as React from 'react'
import { useEffect, useState } from 'react'
import * as key from 'weak-key'

export namespace SFC {
  export interface Props {}
  export interface State {}
}

interface TODO {
  subject: string
  text: string
  done: boolean
}

const createTodo = () => [
  {
    subject: `HOGE FOO ${Math.random()}`,
    text: `TEXT ${Math.random()}`,
    done: false,
  },
]

export default () => {
  const [count, setCount] = useState<number>(0)
  const [todos] = useState<TODO[]>(createTodo)

  useEffect(() => {
    document.title = `${count} times`

    return () => (document.title = 'HOGE')
  })

  return (
    <div>
      <h1>{words.hook.hello}</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>inclement</button>
      <br />
      <label>Subject:</label>
      <input type="text" />
      <br />
      <label>Text:</label>
      <input type="text" />
      <ul>
        {todos.map((todo: TODO) => (
          <li key={key(todo)}>{`${todo.subject}: ${todo.text}`}</li>
        ))}
      </ul>
      <Footer />
    </div>
  )
}
