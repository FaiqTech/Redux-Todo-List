//actions.js
export const getList = (data) => {
  return {
    type: "GET_LIST",
    payload: data,
  };
};

export const addList = (item) => {
  return {
    type: "ADD_LIST",
    payload: item,
  };
};

export const removeList = (id) => {
  return {
    type: "REMOVE_LIST",
    payload: id,
  };
};
