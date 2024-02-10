import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const StudentCreate = () => {
  const [student, setStudent] = useState({
    name: "",
    course: "",
    email: "",
    phone: "",
  });
  const [inputErrorList, setInputErrorList] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const saveStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: student.name,
      course: student.course,
      email: student.email,
      phone: student.phone,
    };

    axios
      .post(`http://127.0.0.1:8000/api/students`, data)
      .then((response) => {
        alert("Student added successfully");
        setStudent({ name: "", course: "", email: "", phone: "" });
        setInputErrorList({});
        navigate("/students");
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 422) {
          setInputErrorList(error.response.data.errors);
        }
        if (error.response.status === 500) {
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

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Add Student
                <Link to="/students" className="btn btn-danger float-end">
                  Back
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={saveStudent}>
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
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Save Student
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

export default StudentCreate;
