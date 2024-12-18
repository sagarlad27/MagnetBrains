import { useState,useRef,useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useAxiosInstance from "../redux/axiosInstance";
import swal from "sweetalert";
import Header from "./Header";
import photo from "../photos/c.jpg"

function UpdateEmployee() {

    
    const{instance}=useAxiosInstance();
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    const form = useRef();
    const navigate = useNavigate();
    const[duedate,setDuedate]=useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const { state } = useLocation(); // Access the passed state
    
   
    //const [id,setId]=useState("");

    const { itemId }=useParams();

    


    useEffect(() => {
      if (state?.task) {
          const { title, description, due_date, priority, status } = state.task;
          setTitle(title);
          setDescription(description);
          setDuedate(due_date);
          setPriority(priority);
          setStatus(status);
      }
    },[]);

    const onChangePriority = (e) => {
        setPriority(e.target.value);
    };

    const onChangeStatus = (e) => {
      setStatus(e.target.value);
  };

    const onChangeTitle=(e)=>{
        setTitle(e.target.value);
    }

    const onChangeDescription=(e)=>{
        setDescription(e.target.value);
    }

    const onChangeDuedate=(e)=>{
        setDuedate(e.target.value);
    }

    // const handleEmployee= async(e)=>{
    //     e.preventDefault();

    //     const formData=new FormData();
    //     formData.append("title",title);
    //     formData.append("description",description);
    //     formData.append("due_date",duedate);
    //     formData.append("priority",priority);
    //     formData.append("status",status)

        
    //       await instance.patch(`/api/task/updateTask/${itemId}`,formData,
    //         { 
    //             headers:{"Content-Type":"application/json"}
    //         }).then((response)=>{
    //             console.log(response.data);

    //             swal({
    //               title: "Success",
    //               text: response.data.message,
    //               icon: "success",
    //               buttons: true,
    //             }).then((willNavigate) => {
    //               if (willNavigate) {
    //                 navigate("/employeeList");
    //                 setTitle("");
    //                 setDescription("");
    //                 setDuedate("");
    //                 setPriority("");
    //               }
    //             });
    //         }).catch((err)=>{
    //             console.log(err);
    //         })
        
        
    // }
    const handleEmployee = async (e) => {
      e.preventDefault();
    
      const updatedTask = {
        title,
        description,
        due_date: duedate,
        priority,
        status,
      };
     
      try {
        console.log("itemId : " + itemId);
        const response = await instance.patch(`/api/task/updateTask/${itemId}`, updatedTask, {
          headers: { "Content-Type": "application/json" },
        });
    
        console.log(response.data);
    
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
            setDuedate("");
            setPriority("");
          }
        });
      } catch (err) {
        console.log(err);
        swal({
          title: "Error",
          text: "An error occurred while updating the task.",
          icon: "error",
          buttons: true,
        });
      }
    };
    
    return ( <>
            <div>
                <div><Header/></div>
        {/* <img src={image}  className="card-img-top rounded-3" alt="..." /> */}
        <img src={photo} className="card-img-top rounded-3 " alt="..." style={{width:"1700px",height:"980px",background:"inherit"}}/>
        <form className="employeeEnter" onSubmit={handleEmployee} ref={form}>
          <h3 style={{textAlign:"center"}}>
            <b>Update Task details</b>
          </h3>

          
  
          <div className="form-outline mb-2">
            <label className="form-label">
              Title
            </label>
            <input
              type="text"
              id="form2"
              className="form-control"
              name="title"
              placeholder="Enter Task Title"
              value={title}
              required
              onChange={onChangeTitle}
            />
          </div>
          
          <div className="form-outline mb-2">
            <label className="form-label">
              Description
            </label>
            <input
              type="text"
              id="form4"
              className="form-control"
              name="description"
              placeholder="Enter Task Description"
              required
              value={description}
              onChange={onChangeDescription}
            />
          </div>
          
          <div className="form-outline mb-2">
            <label className="form-label">
              Due Date
            </label>
            <input
              type="text"
              id="form5"
              className="form-control"
              name="text"
              placeholder="Enter Task Due Date"
              required
              value={duedate}
              onChange={onChangeDuedate}
            />
          </div>

          <div className="form-outline mb-2">
            <label className="form-label" htmlFor="designation">
                    Priority
            </label>
            <select
                    id="priority"
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

        <div className="form-outline mb-2">
            <label className="form-label" htmlFor="designation">
                    Status
            </label>
            <select
                    id="status"
                    className="form-control"
                    name="status"
                    value={status}
                    onChange={onChangeStatus}
                    required
            >
                    <option value="" disabled>
                        Select Task Status
                    </option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    
            </select>
        </div>
        
          <div className="text-center pt-1 mb-2 pb-1">
            <button className="btn btn-success btn-block fa-lg mb-3" >
              
              <span>Update Employee</span>
            </button>
            
          </div>
        </form>
      </div>
    </> );
}

export default UpdateEmployee;