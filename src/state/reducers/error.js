import { ERROR_API_RESPONSE } from '../actions/error';

const initialState = {
  errors: []
};

export function errorReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_API_RESPONSE:
      let newErrors = [
        ...state.errors,
        {
          ...action.error
        }
      ];
      return {
        ...state,
        errors: newErrors
      };
    default: {
      return state;
    }
  }
}
