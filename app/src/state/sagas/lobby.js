import { all, call, put, takeEvery } from 'redux-saga/effects';
import { LOAD_ROOMS, RENDER_ROOMS } from '../actions/lobby';
import { fetchBackend } from '../../utilities/backend';

export function* fetchRooms(action) {
  const endpoint = process.env.REACT_APP_GAME_SERVER + '/games/' + action.game;
  const response = yield call(fetchBackend, endpoint);
  console.log(response);
  //const data = yield response.json();
  yield put({ type: RENDER_ROOMS, rooms: [] });
}

export function* loadRooms() {
  yield takeEvery(LOAD_ROOMS, fetchRooms);
}

export default function* rootSaga() {
  yield all([loadRooms()]);
}
