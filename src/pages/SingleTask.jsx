import { useEffect, useState } from "react";
import '../styles/singleTask.scss'
import { useNavigate, useParams } from "react-router-dom";
import { getRequest, postRequest } from "../services";
const SingleTask = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({});
 

const navigate = useNavigate();
  const {id} =useParams();
  const handleSave = () => {
postRequest(`/task/update/${id}`,formData).then(()=>{
setData(formData)
  alert("Task has been successfully updated.");
})
setIsEditing(false);
   
   
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
    getRequest(`/task/delete/${id}`).then(() => {

      alert("Task has been successfully deleted.");
      navigate("/");
    })
    }
  };

  const handleForm=(key,value)=>{
    const newData={...formData};
    newData[key]=value;
    setFormData(newData);

  }
const onCancel=()=>{
  setIsEditing(false);
  setFormData(data);
}

  useEffect(() => {
    getRequest(`/task/getSingleTask/${id}`).then((res) => {
      setFormData(res.data.data);
      setData(res.data.data);
    })
  }, [id]);

  return (
    <div className="single-task-page w-full h-full flex justify-center align-center">
      {isEditing ? ( data &&
        <div className="single-task-container-editable flex justify-center " >
          <p>Title</p>
          <input
           required
            type="text"
            value={formData.title}
            onChange={(e) => handleForm('title',e.target.value)}
          />
          <p>Description</p>
          <textarea
            required
            value={formData.description}
            onChange={(e) =>  handleForm('description',e.target.value)}
          />
          <p>Priority</p>
<select
            required
            value={formData.priority}
            onChange={(e) =>  handleForm('priority',e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
<p>Status</p>
          <select
            required
            value={formData.status}
            onChange={(e) =>  handleForm('status',e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
<p>Due Date</p>
          <input
          
              type="date"
              name="dueDate"
              value={formData.dueDate?.split("T")[0]}
              onChange={e=> handleForm('dueDate',e.target.value)}
              required
              
            />
          <span>
          <button onClick={handleSave}>
            Save
          </button>
          <button  onClick={onCancel}>
            Cancel
          </button>
          </span>
          
        </div>
      ) : (
        data &&
        <div className="single-task-container">
          <h3>{data.title}</h3>
          <p>{data.description}</p>
          <div ><b>Priority:</b>  {data.priority}</div>
          <div ><b>Status:</b>  {data.status}</div>
          <div ><b>Due Date:</b>  {data.dueDate?.split("T")[0]}</div>
          <button  onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button  onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleTask;
