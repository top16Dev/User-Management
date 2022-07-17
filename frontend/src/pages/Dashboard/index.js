import React, {useEffect, useState} from 'react';
import {
  Button, TextField, Dialog, DialogActions, LinearProgress,
  DialogTitle, DialogContent, TableBody, Table,
  TableContainer, TableHead, TableRow, TableCell, Checkbox
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
// import swal from 'sweetalert';
const axios = require('axios');

export default function Dashboard(props) {
	const [pageSize, setPageSize] = useState(2);
	const [currentPageIndex, setCurrentPage] = useState(1);
	const [users, setUsers] = useState([]);
	const [totalPageSize, setTotalPageSize] = useState(0);
	const [editModal, setOpenEditModal] = useState(false);

	const [c_fullname, setCurrentFullname] = useState('');
	const [c_nickname, setCurrentNickname] = useState('');
	const [c_email, setCurrentEmail] = useState('');
	const [c_password, setCurrentPassword] = useState('');
	const [temp_nickname, setTempNickname] = useState('');

	const [searchText, setSearchText] = useState('');
	// var users;

	useEffect(() => {
		let userid = localStorage.getItem('userid');
		if(!userid) {
			props.history.push('/');
		} else {
			getData();
		}
	}, [pageSize, currentPageIndex, searchText]);
	const getData = () => {
		axios.post('http://localhost:3001/api/v1/users/getusers', {
			email: localStorage.getItem('email'),
			role: localStorage.getItem('role'),
			pageSize: pageSize,
			currentPage: currentPageIndex,
			search: searchText,
		})
		.then((res) => {
			if(res.data.code === 200){
				// users = res.data.data.users;
				setUsers(res.data.data.users);
				getTotalPageSize();

				// console.log(users);
			} else if(res.data.code === 401){
				localStorage.clear();
				props.history.push('/');
				console.log(res.data.message);
			}
		})
		.catch((err) => {
			console.log("Error");
		})
	}

	const getTotalPageSize = () => {
		axios.post('http://localhost:3001/api/v1/users/getallusercount', {
			email: localStorage.getItem('email'),
			role: localStorage.getItem('role'),
		})
		.then((res) => {
			if(res.data.code === 200){
				// console.log(res.data.total);
				setTotalPageSize(Math.ceil(res.data.total / parseInt(pageSize)));
			} else{
				setTotalPageSize(0);
			}
		})
	}

	const activeUser = (e) => {
		axios.put(`http://localhost:3001/api/v1/users/root/${e.target.value}`, {
			email: localStorage.getItem('email'),
			role: localStorage.getItem('role'),
		})
		.then((res) => {
			if(res.data.code === 200){
				// users = res.data.data.users;
				// setUsers(res.data.data.users);
				// console.log('success');
				getData();
			} else if(res.data.code === 401){
				localStorage.clear();
				props.history.push('/');
				console.log(res.data.message);
			}
		})
		.catch((err) => {
			console.log("Error");
		});
		// e.target.checked = 
	}

	const openEditModal = (t_fullname, t_nickname, t_email, t_password) => {
		setOpenEditModal(true);
		setTempNickname(t_nickname);
		setCurrentFullname(t_fullname);
		setCurrentNickname(t_nickname);
		setCurrentEmail(t_email);
		setCurrentPassword(t_password);
	}

	const deleteUser = (nickname) => {
		// console.log(nickname);
		axios.post(`http://localhost:3001/api/v1/users/delete/${nickname}`, {
			email: localStorage.getItem('email'),
			role: localStorage.getItem('role'),
		})
		.then((res) => {
			if(res.data.code === 200){
				// users = res.data.data.users;
				// setUsers(res.data.data.users);
				getData();
				// console.log(users);
			} else if(res.data.code === 401){
				localStorage.clear();
				props.history.push('/');
				console.log(res.data.message);
			}
		})
		.catch((err) => {
			console.log("Error");
		});
	}

	const editUser = () => {
		axios.post(`http://localhost:3001/api/v1/users/update/${temp_nickname}`, {
			email: localStorage.getItem('email'),
			role: localStorage.getItem('role'),
			data: {
				email: c_email,
				fullname: c_fullname,
				password: c_password,
				nickname: c_nickname,
			}
		})
		.then((res) => {
			if(res.data.code === 200){
				getData();
				setOpenEditModal(false);
			} else if(res.data.code === 401){
				localStorage.clear();
				props.history.push('/');
				console.log(res.data.message);
			}
		})
		.catch((err) => {
			console.log("Error");
		})
	}

	return (
		<div>
		<Dialog
          open={editModal}
          onClose={() => setOpenEditModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit Product</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="fullname"
              value={c_fullname}
              onChange={(e) => setCurrentFullname(e.target.value)}
              placeholder="User fullname"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="nickname"
              value={c_nickname}
              onChange={(e) => setCurrentNickname(e.target.value)}
              placeholder="Nickname"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="email"
              value={c_email}
              onChange={(e) => setCurrentEmail(e.target.value)}
              placeholder="User Email"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="password"
              value={c_password}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="abcdef"
              required
            /><br /><br />
            
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenEditModal(false)} color="primary">
              Cancel
            </Button>
            <Button
              disabled={c_fullname == '' || c_password == '' || c_email == '' || c_password == ''}
              onClick={(e) => editUser()} color="primary" autoFocus>
              Edit
            </Button>
          </DialogActions>
        </Dialog>
		<TableContainer>
          <TextField
            id="standard-basic"
            type="search"
            autoComplete="off"
            name="search"
            // value={this.state.search}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by user nickname"
            required
          />
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Full Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">User Nickname</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">Team</TableCell>
                <TableCell align="center">Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.email}>
                  <TableCell align="center" component="th" scope="row">
                    {row.fullname}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.nickname}</TableCell>
                  <TableCell align="center">{row.role[0]}</TableCell>
                  <TableCell align="center">{row.teamname[0]}</TableCell>
                  <TableCell align="center">
                  	<Checkbox checked={row.active[0]} value={row.nickname} onClick={activeUser} />
                  </TableCell>
                  
                  <TableCell align="center">
                    <Button
                      className="button_style"
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => openEditModal(row.fullname, row.nickname, row.email, row.password)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="button_style"
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={(e) => deleteUser(row.nickname)}
                    >
                      Delete
                  	</Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
            </Table>
            <br />
            <div style={{justifyContent:"center"}}>
	            <Pagination 
					count={totalPageSize} 
					page={currentPageIndex} 
					onChange={(e, page) => setCurrentPage(page)} 
					color="primary"
					/>
	        </div>
        </TableContainer>
        </div>
	);
}