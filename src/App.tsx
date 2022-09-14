import { useState } from "react";
import { FormAddAndUpdate } from "./components/FormAddAndUpdate";
import { TodoList } from "./components/TodoList";
import { EFormAddAndUpdateMode, IData } from "./module/data.module";
import "./styles/responsive.css";
import "./styles/style.css";

function App() {
  const [data, setData] = useState<IData[]>(
    (JSON.parse(localStorage.getItem("data") as string) as IData[]) || []
  );
  return (
    <div className="grid wide">
      <div className="row">
        <div className="col l-4 m-4 c-12 boder-col-form">
          <div>
            <FormAddAndUpdate
              mode={EFormAddAndUpdateMode.add}
              setData={setData}
              data={data}
            />
          </div>
        </div>
        <div className="col l-8 m-8 c-12 custom-col">
          <TodoList data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
}

export default App;
