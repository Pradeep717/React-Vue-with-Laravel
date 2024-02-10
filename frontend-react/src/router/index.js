import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import StudentList from "../pages/Student";
import StudentCreate from "../components/StudentCreate";
import StudentEdit from "../components/StudentEdit";

const MyRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/students" element={<StudentList />} />
      <Route path="/students/create" element={<StudentCreate />} />
      <Route path="/students/:id/edit" element={<StudentEdit />} />
    </Routes>
  );
};

export default MyRouter;
