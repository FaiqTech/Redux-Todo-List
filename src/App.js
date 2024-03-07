// App.js

import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addList, getList } from "./redux/actions/actions";

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>TODO-LIST</h1>
      <form>
        <input
          type="text"
          placeholder="Enter your list"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" onClick={handleAdd}>
          ADD
        </button>
      </form>
      {list.map((item) => {
        return (
          <div key={item.id} className="list-item">
            {item.name}
          </div>
        );
      })}
    </div>
  );
}

export default App;
