import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import {SERVER_URL} from '../constants.js'
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'

class AddAssignment extends React.Component {

    constructor(props) {
      super(props);
      this.state = {name: "", dueDate: "", courseId: "", message: ""};
    };

    handleChange = (event) =>  {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit = ( ) => {

        console.log("AddAssignment.handleSubmit");
        const token = Cookies.get('XSRF-TOKEN');
        
        // resetting message to blank
        this.setState({message: ""});

        if ( this.state.name.length === 0 ) {  
            toast.error("Adding assignment failed", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            this.setState({message: 'Please enter a name for the assignment.'});
            return;
        }
        
        fetch(`${SERVER_URL}/assignment` , 
            {  
              method: 'POST', 
              headers: { 'Content-Type': 'application/json',
                         'X-XSRF-TOKEN': token }, 
              body: JSON.stringify({assignmentName: this.state.name,  dueDate: this.state.dueDate, courseId: Number(this.state.courseId)})
            } )
        .then(res => {
            if (res.ok) {
              toast.success("Assignment successfully added", {
              position: toast.POSITION.BOTTOM_LEFT
              });
            } else {
              toast.error("Adding assignment failed", {
              position: toast.POSITION.BOTTOM_LEFT
              });
              console.error('Post http status =' + res.status);
        }})
          .catch(err => {
            toast.error("Adding assignment failed", {
              position: toast.POSITION.BOTTOM_LEFT
            });
            console.error(err);
          });
    }; 
    
    render() {   
        return (
          <div>
            <h1> Add Assignment</h1>
            <h2>Name</h2>
            <TextField autoFocus style = {{width:200}} label="Name" name="name" 
                 onChange={this.handleChange} value={this.state.name} /> 
            <br/>
            <br/>
            <h2>Due Date</h2>
            <TextField style = {{width: 200}} label="Due Date" name="dueDate" 
                onChange={this.handleChange} value={this.state.dueDate} /> 
            <br/>
            <br/>
            <h2>Course ID</h2>
            <TextField style = {{width: 200}} label="Course ID" name="courseId" 
                onChange={this.handleChange} value={this.state.courseId} /> 
            <br/>
            <br/>
            <h3>{this.state.message}</h3>
            <Button variant="outlined" color="primary" id="Submit" style={{margin: 10}}
                  onClick={this.handleSubmit}>Submit</Button>
            <Button component={Link} to={{pathname:'/'}} 
                    variant="outlined" color="primary" style={{margin: 10}}>
              Return to Assignment List
            </Button>
            <ToastContainer autoClose={8000} />           
          </div>
        ); 
    };
  
}  

export default AddAssignment;