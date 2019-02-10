import words from '@/assets/strings'
import * as React from 'react'
import style from './style.scss'

export default () => {
  return (
    <div className={style.container}>
      <h1>{words.todo.header}</h1>
    </div>
  )
}
