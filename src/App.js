// App.js

import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addList, getList, removeList } from "./redux/actions/actions";

function App() {
  const [inputValue, setInputValue] = useState("");
  const list = useSelector((state) => state.listReducer.list);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users`);
      dispatch(getList(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setInputValue("");

    try {
      const response = await axios.post(`http://localhost:3000/users`, {
        id: list.length + 1,
        name: inputValue,
      });
      dispatch(addList(response.data));
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      dispatch(removeList(id));
    } catch (error) {
      console.error("Error removing data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>TODO-LIST</h1>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Enter your list"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">ADD</button>
      </form>
      {list.map((item) => (
        <div key={item.id} className="list-item">
          <span>{item.name}</span>
          <button
            className="remove-button"
            onClick={() => handleRemove(item.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
