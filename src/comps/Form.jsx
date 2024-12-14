/* eslint-disable react/prop-types */
import { useState } from "react";
import { postRequest } from "../services";

const Form = ({ setIsFormOpen, setTasks }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "Pending",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    postRequest("/task/create", {
      title: formValues.title,
      description: formValues.description,
      dueDate: formValues.dueDate,
      priority: formValues.priority,
      status: formValues.status,
      user: sessionStorage.getItem("userId"),
    }).then((res) => {
      if (res.status === 201) {
        setTasks((prevTasks) => [...prevTasks, res.data.data]);
      }
    });
    setFormValues({
      title: "",
      description: "",
      dueDate: "",
      priority: "Low",
      status: "Pending",
    });
    setIsFormOpen(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div style={{ marginBottom: "15px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={formValues.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Description:
        </label>
        <textarea
          name="description"
          value={formValues.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Due Date:
        </label>
        <input
          type="date"
          name="dueDate"
          value={formValues.dueDate}
          onChange={handleInputChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Priority:
        </label>
        <select
          name="priority"
          value={formValues.priority}
          onChange={handleInputChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Status:
        </label>
        <select
          name="status"
          value={formValues.status}
          onChange={handleInputChange}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button type="submit">Save Task</button>
    </form>
  );
};

export default Form;
