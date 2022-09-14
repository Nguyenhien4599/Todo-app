import "../styles/bulkAction.css";

interface IProps {
  setData: Function;
}

export const BulkAction = ({ setData }: IProps) => {
  const handldeDeleteAll = () => {
    setData([]);
    localStorage.setItem("data", JSON.stringify([]));
  };
  return (
    <div className="content-bulk-action">
      <p>Bulk Action</p>
      <div className="wrapper-btn-bulk-action">
        <button className="btn btn-done">Done</button>
        <button className="btn btn-remove" onClick={handldeDeleteAll}>
          Remove
        </button>
      </div>
    </div>
  );
};
