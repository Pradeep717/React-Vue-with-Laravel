import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const StudentEdit = () => {
  let { id } = useParams();

  const [student, setStudent] = useState({});
  const [inputErrorList, setInputErrorList] = useState({});
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/students/${id}/edit`)
      .then((response) => {
        setStudent(response.data.student);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            alert("Student not found");
            setLoading(false);
          }
          if (error.response.status === 500) {
            alert("Internal server error");
            setLoading(false);
          }
        }
      });
  }, [id]);

  const handleInput = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const updateStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: student.name,
      course: student.course,
      email: student.email,
      phone: student.phone,
    };

    axios
      .put(`http://127.0.0.1:8000/api/students/${id}/edit`, data)
      .then((response) => {
        alert("Student updated successfully");
        setInputErrorList({});
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 422) {
          setInputErrorList(error.response.data.errors);
        }
        if (error.response.status === 404) {
          alert("Student not found");
        }
        if (error.response.status === 500) {
          alert("Internal server error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (Object.keys(student).length === 0) {
    return <h2>Student not found</h2>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Edit Student
                <Link to="/students" className="btn btn-danger float-end">
                  Back
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={updateStudent}>
                <div className="form-group mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={student.name}
                    onChange={handleInput}
                  />
                  <span className="text-danger">{inputErrorList.name}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Course</label>
                  <input
                    type="text"
                    className="form-control"
                    name="course"
                    value={student.course}
                    onChange={handleInput}
                  />
                  <span className="text-danger">{inputErrorList.course}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={student.email}
                    onChange={handleInput}
                  />
                  <span className="text-danger">{inputErrorList.email}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={student.phone}
                    onChange={handleInput}
                  />
                  <span className="text-danger">{inputErrorList.phone}</span>
                </div>
                <div className="form-group mb-3">
                  <button type="submit" className="btn btn-primary">
                    {loading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEdit;
