import { Footer } from '@/app/components/Footer'
import diescakePng from '@/assets/images/diescake.png'
import words from '@/assets/strings'
import * as React from 'react'
import style from './style.scss'

export namespace SFC {
  export interface Props {}
  export interface State {}
}

export default () => (
  <>
    <h1 className={style.header}>{words.sfc.hello}</h1>
    <img className={style.image} src={diescakePng} />
    <Footer />
  </>
)
