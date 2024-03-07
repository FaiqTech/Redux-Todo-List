export const addList = (data) => {
  return {
    type: "ADD_LIST",
    payload: data,
  };
};

export const getList = (data) => {
  return {
    type: "GET_LIST",
    payload: data,
  };
};
