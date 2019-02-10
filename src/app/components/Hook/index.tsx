import { Footer } from '@/app/components/Footer'
import words from '@/assets/strings'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useBattery, useIdle, useToggle } from 'react-use'
import * as key from 'weak-key'

interface TODO {
  subject: string
  text: string
  done: boolean
}

const useKeyEvent = (listener: any) => {
  useEffect(() => {
    console.log('keydown effect set')
    document.addEventListener<'keydown'>('keydown', listener)

    return () => {
      console.log('keydown effect clean up')
      document.removeEventListener('keydown', listener)
    }
  })
}

const useTitle = (name: string) => {
  const [title] = useState<string>(document.title)

  useEffect(() => {
    console.log('title effect')
    document.title = name

    return () => {
      console.log('title clean up')
      document.title = title
    }
  }, [name])
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

  useTitle(`${count} times`)
  useKeyEvent((e: KeyboardEvent) => {
    console.log(e.key)
  })

  const [on, toggle] = useToggle(false)
  const batteryState: any = useBattery()
  const isIdle = useIdle(3000)

  // tslint:disable: no-unnecessary-callback-wrapper
  return (
    <div>
      <h1>{words.hook.hello}</h1>
      <p>You clicked {count} times</p>
      <p>{`${batteryState.charging}`}</p>
      <p>{batteryState.chargingTime}</p>
      <p>{`${isIdle}`}</p>
      <button onClick={() => setCount(count + 1)}>inclement</button>
      <button onClick={() => toggle()}>{on.toString()}</button>
      <br />
      <ul>
        {todos.map((todo: TODO) => (
          <li key={key(todo)}>{`${todo.subject}: ${todo.text}`}</li>
        ))}
      </ul>
      <Footer />
    </div>
  )
}
