import React, { useState } from "react";
import { IData } from "../module/data.module";
import "../styles/toDoList.css";
import { BulkAction } from "./BulkAction";
import { TodoItem } from "./TodoItem";

interface IProps {
  data?: Array<IData>;
  setData: Function;
}

export const TodoList = ({ data, setData }: IProps) => {
  const [searchValue, setSearchValue] = useState("");
  const handleChangeSearchValue = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target as any).value) {
      const getData = JSON.parse(localStorage.getItem("data") as string);
      setData(getData);
    } else {
      setSearchValue((e.target as any).value);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      const results = (data || []).filter((el) => el.title === searchValue);
      setData(results);
    }
  };

  return (
    <>
      <div className="content-todo-list">
        <h2>To Do List</h2>
        <input
          className="search-bar"
          type="text"
          placeholder="Search..."
          onChange={handleChangeSearchValue}
          onKeyDown={handleKeyDown}
        />
        {(data || [])
          .sort((a: IData, b: IData) => {
            return +new Date(b.date) - +new Date(a.date);
          })
          .map((item, index) => (
            <TodoItem item={item} key={index} setData={setData} />
          ))}
      </div>
      <BulkAction setData={setData} />
    </>
  );
};
