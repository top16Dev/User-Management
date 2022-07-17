import React, { useState } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
const axios = require('axios');

export default function Register(props) {
  const [nickname, setNickName] = useState('');
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmmPassword] = useState('');
  const register = () => {
      axios.post('http://localhost:3001/api/v1/users/signup', {
        fullname: fullname,
        password: password,
        nickname: nickname,
        email: email
      }).then((res) => {
        switch(res.data.code){
        case 200:
          swal({
            text: "Created success",
            icon: "success",
            type: "success"
          });
          break;
        default:
          swal({
            text: res.data.data.msg,
            icon: "error",
            type: "error"
          });
        }
        props.history.push('/');
      }).catch((err) => {
        swal({
          text: err.response.msg,
          icon: "error",
          type: "error"
        });
      });
  }

  return (
    <div style={{ marginTop: '200px' }}>
      <div>
        <h2>Register</h2>
      </div>

      <div>
        <TextField
          id="standard-basic"
          type="text"
          autoComplete="off"
          name="username"
          // value={this.state.username}
          onChange={(e) => setNickName(e.target.value)}
          placeholder="User Nickname"
          required
        />
        <br /><br />
        <TextField
          id="standard-basic"
          type="text"
          autoComplete="off"
          name="fullname"
          // value={this.state.username}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          required
        />
        <br /><br />
        <TextField
          id="standard-basic"
          type="text"
          autoComplete="off"
          name="email"
          // value={this.state.username}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@example.com"
          required
        />
        <br /><br />
        <TextField
          id="standard-basic"
          type="password"
          autoComplete="off"
          name="password"
          // value={this.state.password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <br /><br />
        <TextField
          id="standard-basic"
          type="password"
          autoComplete="off"
          name="confirm_password"
          // value={this.state.confirm_password}
          onChange={(e) => setConfirmmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <br /><br />
        <Button
          className="button_style"
          variant="contained"
          color="primary"
          size="small"
          disabled={nickname === '' || password === '' || fullname === '' || email === '' || (password !== confirm_password)}
          onClick={register}
        >
          Register
        </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link href="/">
          Login
        </Link>
      </div>
    </div>
  );
}
