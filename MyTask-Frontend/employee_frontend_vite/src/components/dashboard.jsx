import Header from "./Header";
import { FaTasks, FaChartLine, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      {/* Main Container */}
      <div className="dashboard-container" style={{ padding: "2rem" }}>
        {/* Welcome Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "20vh",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontFamily: "initial",
              lineHeight: "1.5",
              color: "rgb(77, 198, 232)",
            }}
          >
            Welcome to Magnet Brains Task Management
          </h1>
          <p
            style={{
              color: "#666",
              textAlign: "center",
              marginTop: "0.5rem",
              fontSize: "1.1rem",
            }}
          >
            Stay organized, track your tasks, and boost your productivity.
          </p>
        </div>

        {/* Dashboard Content */}
        <div
          className="dashboard-content"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          {/* Card: Tasks */}
          <div
            className="card"
            style={{
              padding: "1.5rem",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              textAlign: "center",
            }}
          >
            <FaTasks style={{ fontSize: "2rem", color: "rgb(77, 198, 232)" }} />
            <h2 style={{ marginTop: "1rem", fontSize: "1.5rem" }}>Tasks</h2>
            <p style={{ color: "#666", marginTop: "0.5rem" }}>
              View, manage, and track all your tasks.
            </p>
            <button
              style={{
                marginTop: "1rem",
                padding: "0.8rem 1.5rem",
                backgroundColor: "rgb(77, 198, 232)",
                border: "none",
                borderRadius: "5px",
                color: "#fff",
                cursor: "pointer",
                fontSize: "1rem",
              }}
              onClick={() => navigate("/createEmployee")}
            >
              Create Tasks
            </button>
          </div>

          {/* Card: TaskList */}
          <div
            className="card"
            style={{
              padding: "1.5rem",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              textAlign: "center",
            }}
          >
            <FaChartLine
              style={{ fontSize: "2rem", color: "rgb(255, 159, 64)" }}
            />
            <h2 style={{ marginTop: "1rem", fontSize: "1.5rem" }}>TaskList</h2>
            <p style={{ color: "#666", marginTop: "0.5rem" }}>
              Analyze your progress and performance.
            </p>
            <button
              style={{
                marginTop: "1rem",
                padding: "0.8rem 1.5rem",
                backgroundColor: "rgb(255, 159, 64)",
                border: "none",
                borderRadius: "5px",
                color: "#fff",
                cursor: "pointer",
                fontSize: "1rem",
              }}
              onClick={() => navigate("/employeeList")}
            >
              View Task
            </button>
          </div>

        
        </div>
      </div>
    </>
  );
}

export default Dashboard;
