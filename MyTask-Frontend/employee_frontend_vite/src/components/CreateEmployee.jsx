import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../redux/axiosInstance";
import swal from "sweetalert";
import Header from "./Header";
import photo from "../photos/d.png";

function CreateEmployee() {
  const { instance } = useAxiosInstance();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState(""); // Fixed field name
  const [priority, setPriority] = useState("");
  const form = useRef();
  const navigate = useNavigate();

  // Handlers
  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeDescription = (e) => setDescription(e.target.value);
  const onChangeDueDate = (e) => setDueDate(e.target.value);
  const onChangePriority = (e) => setPriority(e.target.value);

  // Submit Handler
  const handleEmployee = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("authToken"); // Assuming you store a token

    try {
      const response = await instance.post(
        "/api/task/createTaskForUser",
        {
          title,
          description,
          due_date,
          priority,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
        }
      );

      swal({
        title: "Success",
        text: response.data.message,
        icon: "success",
        buttons: true,
      }).then((willNavigate) => {
        if (willNavigate) {
          navigate("/employeeList");
          setTitle("");
          setDescription("");
          setDueDate("");
          setPriority("");
        }
      });
    } catch (error) {
      console.error("Error creating task:", error);
      swal({
        title: "Error",
        text: error.response?.data?.message || "Failed to create task",
        icon: "error",
      });
    }
  };

  return (
    <>
      <div>
        <div>
          <Header />
        </div>
        <img
          src={photo}
          className="card-img-top rounded-3"
          alt="..."
          style={{ width: "1700px", height: "980px", background: "inherit" }}
        />
        <form
          className="employeeEnter"
          onSubmit={handleEmployee}
          ref={form}
          style={{
            backgroundImage: `url(${photo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            padding: "50px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            opacity: 0.9,
          }}
        >
          <h3 style={{ textAlign: "center", color: "#000" }}>
            <b>Create Task</b>
          </h3>

          <div className="form-outline mb-2">
            <label className="form-label" style={{ color: "#000" }}>
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Enter your Task Title"
              value={title}
              required
              onChange={onChangeTitle}
            />
          </div>

          <div className="form-outline mb-2">
            <label className="form-label" style={{ color: "#000" }}>
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="Enter Task Description"
              required
              value={description}
              onChange={onChangeDescription}
            />
          </div>

          <div className="form-outline mb-2">
            <label className="form-label" style={{ color: "#000" }}>
              Due Date
            </label>
            <input
              type="date" // Better UX for date
              className="form-control"
              name="due_date"
              required
              value={due_date}
              onChange={onChangeDueDate}
            />
          </div>

          <div className="form-outline mb-2">
            <label className="form-label" htmlFor="priority" style={{ color: "#000" }}>
              Priority
            </label>
            <select
              className="form-control"
              name="priority"
              value={priority}
              onChange={onChangePriority}
              required
            >
              <option value="" disabled>
                Select Task Priority
              </option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="text-center pt-1 mb-2 pb-1">
            <button className="btn btn-success btn-block fa-lg mb-3" type="submit">
              <span>Save Task</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateEmployee;
