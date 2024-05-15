import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';

function Editstudent() {
  const [values, setValues] = useState({
    coursename:'',
    firstName: '',
    lastName: '',
    gender: '',
    fatherName: '',
    phoneNumber1: '',
    phoneNumber2: '',
    motherName: '',
    emailId: '',
    age: '',
    houseNo: '',
    streetName: '',
    areaName: '',
    pincode: '',
    state: '',
    nationality: '',

  });


  const {id} = useParams();
  function handleInput(event) {
      setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }
  const navigate = useNavigate();
  useEffect(() => {
		const isAuthenticated = localStorage.getItem('authenticatedAdmin');
		if (isAuthenticated !== 'true') {
		  navigate('/login');
		}
	  }, []);
    function HandleLogout(){
      navigate('/login');
      localStorage.removeItem('authenticatedUser');
      localStorage.removeItem('authenticatedAdmin');
    }

  useEffect(()=> {
      axios.get('http://localhost:8081/getstudents/'+id)
      .then(res => {
        const {
          coursename,
          firstName ,
          lastName ,
          gender ,
          fatherName ,
          phoneNumber1 ,
          phoneNumber2 ,
          motherName ,
          emailId ,
          age ,
          houseNo ,
          streetName ,
          areaName ,
          pincode ,
          state ,
          nationality ,
        } = res.data.Result[0];
          setValues({
            coursename,
            firstName ,
            lastName ,
            gender ,
            fatherName ,
            phoneNumber1 ,
            phoneNumber2 ,
            motherName ,
            emailId ,
            age ,
            houseNo ,
            streetName ,
            areaName ,
            pincode ,
            state ,
            nationality ,
          })
      })
      .catch(err =>console.log(err));
  }, [id])

  const handleSubmit = (event) => {
      event.preventDefault();
      axios.put('http://localhost:8081/updatestudents/'+id, values)
      .then(res => {
          if(res.data.Status === "Success") {
              navigate('/adminstudents')
          }
      })
      .catch(err => console.log(err));
  }
  return (
    <div className="body">
      <div>
        <br />
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
          <div className="container-fluid">
            <a className="navbar-brand">Boxing academy</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link to="/academy" className="nav-link active" id='adminAcademy' aria-current="page">Academy</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Admincourse" className="nav-link" id='adminCourse'>Course</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Adminstudents" className="nav-link" id='adminStudents'>Students</Link>
                </li>
              </ul>
              <Link to="/login">
                <a className="logout" id='logout' onClick={HandleLogout}>Logout</a>    
              </Link>
            </div>                
          </div>
          <Outlet />
        </nav>
      <br></br>
      <br></br>
      <br></br><br></br>
      <div className="d-flex justify-content-center align-items-center addpage">
        <div className="p-1 rounded w-50 border addform">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
              <div className="mb-3">
                  <input
                    type="text"
                    value={values.coursename}
                    className="form-control"
                    id="editcoursename"
                    name="coursename"
                    placeholder="Enter course name"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={values.firstName}
                    className="form-control"
                    id="editFirstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value = {values.lastName}
                    className="form-control"
                    id="editLastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value = {values.gender}
                    className="form-control"
                    id="editGender"
                    name="gender"
                    placeholder="Enter male or female"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value = {values.fatherName}
                    className="form-control"
                    id="editFatherName"
                    name="fatherName"
                    placeholder="Enter your father's name"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value = {values.phoneNumber1}
                    className="form-control"
                    id="editPhoneNumber1"
                    name="phoneNumber1"
                    placeholder="Enter phone number"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value = {values.phoneNumber2}
                    className="form-control"
                    id="editPhoneNumber2"
                    name="phoneNumber2"
                    placeholder="Enter alternate number"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value = {values.motherName}
                    className="form-control"
                    id="editMotherName"
                    name="motherName"
                    placeholder="Enter your mother's name"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value = {values.emailId}
                    className="form-control"
                    id="editEmailId"
                    name="emailId"
                    placeholder="Enter email Id"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value = {values.age}
                    className="form-control"
                    id="editAge"
                    name="age"
                    placeholder="Enter your age"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="col">
                <h4>Address information</h4>
                <div className="mb-3">
                  House No:
                  <input
                    type="text"
                    value = {values.houseNo}
                    className="form-control"
                    id="editHouseNo"
                    name="houseNo"
                    placeholder=""
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  Street Name:
                  <input
                    type="text"
                    value = {values.streetName}
                    className="form-control"
                    id="editStreetName"
                    name="streetName"
                    placeholder=""
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  Area Name:
                  <input
                    type="text"
                    values = {values.areaName}
                    className="form-control"
                    id="editAreaName"
                    name="areaName"
                    placeholder=""
                    autoComplete="off"
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  Pin Code:
                  <input
                    type="text"
                    value = {values.pincode}
                    className="form-control"
                    id="editPincode"
                    name="pincode"
                    placeholder=""
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  State:
                  <input
                    type="text"
                    value = {values.state}
                    className="form-control"
                    id="editState"
                    name="state"
                    placeholder=""
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  Nationality:
                  <input
                    type="text"
                    value = {values.nationality}
                    className="form-control"
                    id="editNationality"
                    name="nationality"
                    placeholder=""
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <center>
              <button type="submit" id="enrollNowButton" className="btn btn-success ">
                Update Student
              </button>
              </center>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editstudent;
