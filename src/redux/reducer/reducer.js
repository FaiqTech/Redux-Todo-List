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
    case "REMOVE_LIST":
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
