import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getList } from "./redux/actions/actions";

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
    console.log(inputValue);
    setInputValue("");
    await fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
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
        return <p key={item.id}>{item.name}</p>;
      })}
    </>
  );
}

export default App;
