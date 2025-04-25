import React, { useEffect, useState } from 'react';
import './ManageUsers.css';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users/View');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditedUser({ ...user });
  };

  const handleChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/Update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        alert('User updated successfully');
        setUsers(users.map(u => u.userID === editedUser.userID ? editedUser : u));
        setEditedUser(null);
      } else {
        alert('Failed to update user');
      }
    } catch (error) {
      alert('Error updating user');
    }
  };

  const handleDelete = async (userID) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/Delete?id=${userID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('User deleted successfully');
        setUsers(users.filter(user => user.userID !== userID));
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      alert('Error deleting user');
    }
  };

  return (
    <div className="manage-users">
      <h3>Manage Users</h3>
      <table className="manage-users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>Address</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userID}>
              <td>{user.userID}</td>
              <td>
                {editedUser && editedUser.userID === user.userID ? (
                  <input type="text" name="userName" value={editedUser.userName} onChange={handleChange} />
                ) : (
                  user.userName
                )}
              </td>
              <td>
                {editedUser && editedUser.userID === user.userID ? (
                  <input type="email" name="userEmail" value={editedUser.userEmail} onChange={handleChange} />
                ) : (
                  user.userEmail
                )}
              </td>
              <td>
                {editedUser && editedUser.userID === user.userID ? (
                  <input type="text" name="userTelephone" value={editedUser.userTelephone} onChange={handleChange} />
                ) : (
                  user.userTelephone
                )}
              </td>
              <td>
                {editedUser && editedUser.userID === user.userID ? (
                  <input type="text" name="userAddress" value={editedUser.userAddress} onChange={handleChange} />
                ) : (
                  user.userAddress
                )}
              </td>
              <td>
                {editedUser && editedUser.userID === user.userID ? (
                  <input type="text" name="userRole" value={editedUser.userRole} onChange={handleChange} />
                ) : (
                  user.userRole
                )}
              </td>
              <td>
                {editedUser && editedUser.userID === user.userID ? (
                  <button className="save-btn" onClick={handleSave}>Save</button>
                ) : (
                  <>
                    <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(user.userID)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
