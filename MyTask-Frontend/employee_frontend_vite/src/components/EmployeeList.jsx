import Header from "./Header";
import useAxiosInstance from "../redux/axiosInstance";
import { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Swal from "sweetalert2";
import './login.css';

function EmployeeList() {

    const { instance } = useAxiosInstance();
    const[task,setTask]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Assuming the API provides the total number of pages
        
    useEffect(() => {
      // Get the userId from local storage
      const userId = localStorage.getItem('userId');
      
      // Check if userId exists before making the request
      if (userId) {
        instance.get(`/api/task/getAllTask`, {
          params: {
            user_id: userId, // Pass userId as a query parameter
            page: currentPage
          },
        })
          .then(response => {
            setTask(response.data.tasks); // Update the state with the fetched task
            setTotalPages(response.data.totalPages || 1); // Use totalPages if provided by API
            
          })
          .catch(error => {
            console.error('Error fetching task:', error);
          });
      } else {
        console.error('User ID not found in local storage');
      }
    }, [currentPage]);
    
    const deleteItem = async (itemId) => {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });
  
        if (result.isConfirmed) {
          const response = await instance.delete(
            `/api/task/deleteTask/${itemId}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
          if (response.status === 200) {
            Swal.fire("Deleted!", "Your task has been deleted.", "success");
            setTask((prevTasks) =>
              prevTasks.filter((task) => task._id !== itemId)
            );
          } else {
            Swal.fire("Error", "Failed to delete the task.", "error");
          }
        }
      } catch (error) {
        Swal.fire("Error", `An error occurred: ${error.message}`, "error");
      }
    };

    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    };

    return ( <>
    <div><Header/></div>
    
    <div className="container-fluid " style={{ width: '1500px', border:'1px solid black' }} >
           

            {/* Data Rows */}
<div className="row justify-content-center">
  {task.map((item) => (
    <div className="col-md-6 col-lg-4 mb-4" key={item._id}>
      <div className="card shadow border-0">
        <div className="card-body">
          <h5 className="card-title text-primary">{item.title}</h5>
          <p className="card-text">
            <strong>Description:</strong> {item.description}
          </p>
          <p className="card-text">
            <strong>Due Date:</strong>{" "}
            {new Date(item.due_date).toLocaleDateString()}
          </p>
          <p className="card-text">
            <strong>Status:</strong> 
            <span className={`ms-2 badge bg-${item.status === 'Completed' ? 'success' : 'warning'}`}>
              {item.status}
            </span>
          </p>
          <p className="card-text">
            <strong>Priority:</strong>{" "}
            <span className={`badge bg-${item.priority.toLowerCase() === 'high' ? 'danger' : item.priority.toLowerCase() === 'medium' ? 'warning' : 'success'}`}>
              {item.priority}
            </span>
          </p>

          {/* Action Buttons */}
          <div className="d-flex justify-content-between mt-3">
            <Link
              to={`/taskDetails/${item._id}`}
              state={{ task: item }}
              className="btn btn-primary btn-sm"
            >
              View
            </Link>
            <Link
              to={`/updateEmployee/${item._id}`}
              state={{ task: item }}
              className="btn btn-warning btn-sm"
            >
              Update
            </Link>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteItem(item._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


            
        </div>
        {/* Pagination */}
        <div className="pagination-container">
          <div className="pagination">
              <Button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </Button>
              <span className="mx-3">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
          </div>
        </div>
        
    </> );
}

export default EmployeeList;