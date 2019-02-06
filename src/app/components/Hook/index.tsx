import { Footer } from '@/app/components/Footer'
import words from '@/assets/strings'
import * as React from 'react'
import { useState } from 'react'

export namespace SFC {
  export interface Props {}
  export interface State {}
}

export default () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>{words.hook.hello}</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>inclement</button>
      <Footer />
    </div>
  )
}
