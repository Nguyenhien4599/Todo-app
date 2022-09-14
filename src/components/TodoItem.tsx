import React, { useState } from "react";
import { EFormAddAndUpdateMode, IData } from "../module/data.module";
import "../styles/toDoItem.css";
import { FormAddAndUpdate } from "./FormAddAndUpdate";

interface IProps {
  setData: Function;
  item: IData;
}

export const TodoItem = ({ setData, item }: IProps) => {
  const [active, setActive] = useState(false);
  const handleDetail = () => {
    setActive(!active);
  };
  const handleDelete = (id: number) => () => {
    const data = [...JSON.parse(localStorage.getItem("data") as string)];
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
  };
  return (
    <div className="wrapper-content-todo-item">
      <div className="wrapper-todo-item">
        <div className="wrapper-todo-item__title">
          <input type="checkbox" defaultChecked />
          <p>{item.title}</p>
        </div>
        <div className="wrapper-todo-item__wrap-btn">
          <button onClick={handleDetail} className="btn btn-details">
            Detail
          </button>
          <button onClick={handleDelete(item.id)} className="btn btn-remove">
            Remove
          </button>
        </div>
      </div>
      {active ? (
        <div className="wrapper-todo-item__detail">
          <FormAddAndUpdate
            mode={EFormAddAndUpdateMode.update}
            dataEdit={item}
            setData={setData}
            setActive={setActive}
          />
        </div>
      ) : null}
    </div>
  );
};
