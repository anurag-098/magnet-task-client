import { useEffect, useState } from "react";
import "../styles/list.scss";
import Form from "../comps/Form";
import { getRequest } from "../services";
import { Link } from "react-router-dom";
const List = () => {
  const [tasks, setTasks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [atOnce, setAtOnce] = useState(10);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const getRowStyle = (priority) => {
    switch (priority) {
      case "High":
        return { backgroundColor: "#FFEBEE", color: "#C62828" }; // Light red with dark red text
      case "Medium":
        return { backgroundColor: "#FFF3E0", color: "#EF6C00" }; // Light orange with dark orange text
      case "Low":
        return { backgroundColor: "#E8F5E9", color: "#2E7D32" }; // Light green with dark green text
      default:
        return {};
    }
  };

  const setOnce = (e) => {
    setAtOnce(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    getRequest(
      `/task/getTasks/${sessionStorage.getItem(
        "userId"
      )}?page=${currentPage}&limit=${atOnce}`
    ).then((res) => {
      console.log(res.data.data);
      setTotalPages(res.data.data.totalPages);
      setTasks(res.data.data.tasks);
    });
  }, [currentPage, atOnce]);

  return (
    <div className="list-page h-full">
      <h1>Task Management System</h1>

      <button className="add-task-button" onClick={toggleForm}>
        {isFormOpen ? "Close Form" : "Add New Task"}
      </button>
      {isFormOpen && <Form setIsFormOpen={setIsFormOpen} setTasks={setTasks} />}

      <table>
        <thead>
          <tr style={{ backgroundColor: "#F5F5F5" }}>
            <th>#</th>
            <th>Title</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <Link style={{textDecoration:'none'}} to={`/single/${task._id}`}>
            <tr className="listItem" key={task._id} style={{ ...getRowStyle(task.priority) }}>
              <td>{index + 1}</td>
              <td>
                {task.title}
              </td>
              <td>{task.dueDate?.split("T")[0]}</td>
              <td>{task.status}</td>
            </tr>
            </Link>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          page {currentPage}/{totalPages}
        </span>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
        At once <input type="number" style={{width:'4rem'}} value={atOnce} onChange={setOnce} />
      </div>
    </div>
  );
};

export default List;
