import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsersGrid from './UsersGrid';

const User = () => {
	const [users, setUsers] = useState([]);
	const [newUser, setNewUser] = useState({
		name: '',
		birthdate: '',
		photo: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const getUsers = () => {
        setIsLoading(true);
		axios
			.get('http://localhost:5000/users/')
			.then((res) => {
				setUsers(res.data);
                setIsLoading(false)
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleSubmit = (e) => {
				setIsSubmitting(true);

		e.preventDefault();
		const formData = new FormData();
		formData.append('photo', newUser.photo);
		formData.append('birthdate', newUser.birthdate);
		formData.append('name', newUser.name);

		axios
			.post('http://localhost:5000/users/add/', formData)
			.then((res) => {
				console.log(res);
				setIsSubmitting(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleChange = (e) => {
		setNewUser({ ...newUser, [e.target.name]: e.target.value });
	};

	const handlePhoto = (e) => {
		setNewUser({ ...newUser, photo: e.target.files[0] });
	};

	useEffect(() => {
		getUsers();
	}, [isSubmitting]);

	return (
		<>
			{console.log(users)}
			{isSubmitting ? (
				'Submitting...'
			) : (
				<form onSubmit={handleSubmit} encType='multipart/form-data'>
					<input
						type='file'
						accept='.png, .jpg, .jpeg'
						name='photo'
						onChange={handlePhoto}
					/>

					<input
						type='text'
						placeholder='name'
						name='name'
						value={newUser.name}
						onChange={handleChange}
					/>

					<input
						type='date'
						name='birthdate'
						value={newUser.date}
						onChange={handleChange}
					/>

					<input type='submit' />
				</form>
			)}

			{isLoading ? 'Loading...' : <UsersGrid users={users} />}
		</>
	);
};

export default User;
