import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  LOAD_ROOMS,
  FETCH_ROOMS_SUCCEEDED,
  CREATE_ROOM_REQUESTED,
  CREATE_ROOM_SUCCEEDED,
  DELETE_ROOM_REQUESTED,
  DELETE_ROOM_SUCCEEDED
} from '../actions/room';
import { ERROR_API_RESPONSE } from '../actions/error';
import fetchBackend from '../../utilities/backend';

export function* fetchRooms(action) {
  try {
    console.log(action.token)
    const response = yield call(fetchBackend, {
      url: process.env.REACT_APP_GAME_SERVER + action.url,
      token: action.token
    });
    if (response.ok) {
      const data = yield response.json();

      data.game = action.game;
      yield put({ type: FETCH_ROOMS_SUCCEEDED, data: data });
    } else {
      yield put({
        type: ERROR_API_RESPONSE,
        error: {
          status: response.status,
          text: response.statusText,
          url: response.url
        }
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    action.setFetching(false);
  }
}

export function* createRoom(action) {
  try {
    const response = yield call(fetchBackend, {
      url: process.env.REACT_APP_GAME_SERVER + action.url,
      token: action.token,
      method: 'POST',
      data: action.data || {}
    });
    if (response.ok) {
      let data = yield response.json();
      yield put({ type: CREATE_ROOM_SUCCEEDED, data: data });
    } else {
      yield put({
        type: ERROR_API_RESPONSE,
        error: {
          status: response.status,
          text: response.statusText,
          url: response.url
        }
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    action.setFetching(false);
  }
}

export function* deleteRoom(action) {
  try {
    const response = yield call(fetchBackend, {
      url: process.env.REACT_APP_GAME_SERVER + action.url,
      token: action.token,
      method: 'DELETE'
    });
    if (response.ok) {
      let data = yield response.json();
      data = { ...data, roomName: action.roomName };
      yield put({ type: DELETE_ROOM_SUCCEEDED, data: data });
    } else {
      yield put({
        type: ERROR_API_RESPONSE,
        error: {
          status: response.status,
          text: response.statusText,
          url: response.url
        }
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    action.setFetching(false);
  }
}

export function* loadRooms() {
  yield takeEvery(LOAD_ROOMS, fetchRooms);
}

export function* createRoomRequested() {
  yield takeEvery(CREATE_ROOM_REQUESTED, createRoom);
}

export function* deleteRoomRequested() {
  yield takeEvery(DELETE_ROOM_REQUESTED, deleteRoom);
}

export default function* rootSaga() {
  yield all([loadRooms(), createRoomRequested(), deleteRoomRequested()]);
}
