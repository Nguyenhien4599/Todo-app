import { ChangeEvent, useEffect, useState } from "react";
import {
  EFormAddAndUpdateMode,
  EValueoptionsPiority,
  IData,
} from "../module/data.module";
import "../styles/FormAddAndUpdate.css";

interface IProps {
  mode: EFormAddAndUpdateMode;
  setData?: Function;
  data?: Array<IData>;
  dataEdit?: IData;
  setActive?: Function;
}

export const FormAddAndUpdate = ({
  mode,
  setData,
  data,
  dataEdit,
  setActive,
}: IProps) => {
  const [state, setState] = useState<IData>({
    id: 0,
    date: "",
    description: "",
    title: "",
    piority: "",
  });

  useEffect(() => {
    if (mode === EFormAddAndUpdateMode.update && dataEdit)
      setState({ ...dataEdit });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (mode === EFormAddAndUpdateMode.add) {
      let newData: Array<IData> = [];
      if (!state?.piority) {
        const obj = { ...state, piority: EValueoptionsPiority.normal };
        if (data) newData = [obj, ...data];
      } else {
        if (data) newData = [state, ...data];
      }
      if (setData) setData(newData);
      localStorage.setItem("data", JSON.stringify(newData));
    } else {
      const newData = [...JSON.parse(localStorage.getItem("data") as string)];
      const idx = newData.findIndex((el) => el.id === dataEdit?.id);
      newData.splice(idx, 1, state);
      if (setData) setData(newData);
      localStorage.setItem("data", JSON.stringify(newData));
      if (setActive) setActive(false);
    }
    setState({
      id: 0,
      date: "",
      description: "",
      title: "",
      piority: "",
    });
  };

  const handleChange = (event: ChangeEvent<HTMLElement>) => {
    const name = (event.target as any).name;
    const value = (event.target as any).value;
    setState({ ...state, [name]: value, id: Math.random() });
  };

  return (
    <div className="wrapper-form">
      {mode === "add" ? <h2>New Task</h2> : null}
      <form onSubmit={handleSubmit}>
        <input
          value={state.title}
          className="wrapper-form__title"
          type="text"
          placeholder="Add new task..."
          name="title"
          onChange={handleChange}
        />
        <div className="warpper-des">
          <label>Description</label>
          <textarea
            value={state.description}
            name="description"
            rows={6}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="warpper-timeAndStatus">
          <div>
            <label>Due Date</label>
            <input
              value={state.date}
              type="date"
              name="date"
              onChange={handleChange}
              min={new Date().toISOString().slice(0, 10)}
            />
          </div>
          <div>
            <label>Piority</label>
            <select
              value={state.piority || EValueoptionsPiority.normal}
              onChange={handleChange}
              name="piority"
              className="warpper-timeAndStatus__status"
            >
              <option value={EValueoptionsPiority.low}>low</option>
              <option value={EValueoptionsPiority.normal} selected>
                normal
              </option>
              <option value={EValueoptionsPiority.high}>high</option>
            </select>
          </div>
        </div>
        <button className="btn">{mode === "add" ? "Add" : "Update"}</button>
      </form>
    </div>
  );
};
