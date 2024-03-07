//reducer.js
const initialState = {
  list: [],
};

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_LIST":
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case "GET_LIST":
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};
