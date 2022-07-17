import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
const axios = require('axios');
// const bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    if(localStorage.getItem('userid')) props.history.push('/dashboard');
  })
  const login = () => {

    // const pwd = bcrypt.hashSync(this.state.password, salt);

    axios.post('http://localhost:3001/api/v1/users/login', {
      // headers: {
      //   'email': email
      // },
      email: email,
      password: password,
    }).then((res) => {
      if(res.data.code === 200){
        localStorage.setItem('userid', res.data.data.userid);
        localStorage.setItem('role', res.data.data.role);
        localStorage.setItem('email', email);

        swal({
          text: res.data.data.msg,
          icon: "success",
          type: "success"
        });
        props.history.push('/dashboard');
      } else {
        swal({
          text: res.data.data.msg,
          icon: "error",
          type: "error"
        });
      }
    }).catch((err) => {
      // if (err.response && err.response.data && err.response.data.errorMessage) {
        swal({
          text: err.response.data.data.msg,
          icon: "error",
          type: "error"
        });
      // }
    });
  }

  // render() {
    return (
      <div style={{ marginTop: '200px' }}>
        <div>
          <h2>Login</h2>
        </div>

        <div>
          <TextField
            id="standard-basic1"
            type="text"
            autoComplete="off"
            name="email"
            // value={this.state.username}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="User Email"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic2"
            type="password"
            autoComplete="off"
            name="password"
            // value={this.state.password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <br /><br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={email === '' || password === ''}
            onClick={login}
          >
            Login
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/signup">
            Signup
          </Link>
        </div>
      </div>
    );
  // }
}
