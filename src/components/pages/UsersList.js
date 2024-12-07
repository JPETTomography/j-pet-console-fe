import { useState, useEffect } from "react";

import UserCard from "../partials/UserCard";

import Page from "../partials/Page";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SOURCE}/users`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Page>
      <h1>Users List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <ul className="list-none grid gap-4">
          {users.map((user, index) => {
            return (
              <li key={index}>
                <UserCard {...user} />
              </li>
            );
          })}
        </ul>
      )}
    </Page>
  );
};

export default UsersList;
