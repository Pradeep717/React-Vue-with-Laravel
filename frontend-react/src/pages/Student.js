import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/students")
      .then((response) => {
        setStudents(response.data.students);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteStudent = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting...";

    axios
      .delete(`http://127.0.0.1:8000/api/students/${id}/delete`)
      .then((response) => {
        alert(response.data.message);
        thisClicked.closest("tr").remove();
      })
      .catch((error) => {
        if (error.status === 404) {
          alert("Student not found");
          thisClicked.innerText = "Delete";
        }
        if (error.status === 500) {
          alert("Internal server error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <Loading />;
  }

  var studentDetails = students.map((student) => {
    return (
      <tr key={student.id}>
        <td>{student.id}</td>
        <td>{student.name}</td>
        <td>{student.course}</td>
        <td>{student.email}</td>
        <td>{student.phone}</td>
        <td>
          <Link to={`/students/${student.id}/edit`} className="btn btn-success">
            Edit
          </Link>
        </td>
        <td>
          <button
            type="button"
            onClick={(e) => deleteStudent(e, student.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Student List
                <Link
                  to="/students/create"
                  className="btn btn-primary float-end"
                >
                  Add Student
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Reg No.</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Edit</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{studentDetails}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
