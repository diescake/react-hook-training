import { FETCH_TODOS, fetchTodosFailure, fetchTodosSuccess } from '@/app/actions/todo'
import { RootState } from '@/app/models/Todo'
import axios, { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'

const TODOS_JSON_URL = 'https://raw.githubusercontent.com/diescake/react-hook-training/master/data/todos.json'

function* fetchTodos() {
  const res: AxiosResponse<RootState> = yield call(axios.get, TODOS_JSON_URL)

  if (res.data) {
    yield put(fetchTodosSuccess(res.data.todos))
  } else {
    yield put(fetchTodosFailure(res.statusText))
  }
}

export default function*() {
  yield takeLatest(FETCH_TODOS, fetchTodos)
}
