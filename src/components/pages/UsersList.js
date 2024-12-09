import { useState, useEffect } from "react";

import UserCard from "../partials/UserCard";

import Page from "../partials/Page";
import PaginatedItems from "../partials/PaginatedItems";

import FetchLoading from "../partials/FetchLoading";
import FetchError from "../partials/FetchError";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SOURCE}/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Page>
      <h1>Users List</h1>
      {loading ? (
        <FetchLoading />
      ) : error ? (
        <FetchError error={error} fetchFun={fetchUsers} />
      ) : (
        <PaginatedItems items={users} ItemComponent={UserCard} />
      )}
    </Page>
  );
};

export default UsersList;
