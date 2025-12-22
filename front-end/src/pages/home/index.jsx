import "./style.css";
import { useEffect, useState, useRef } from "react";
import Delete from "../../assets/delete.png";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const response = await api.get("/users");
    setUsers(response.data);
  }

  async function createUsers() {
    await api.post("/users", {
      name: String(inputName.current.value),
      age: Number(inputAge.current.value),
      email: String(inputEmail.current.value),
    });
    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`);
    getUsers();
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUsers();
  }, []);

  return (
    <div className="container">
      <form action="../../../../back-end/server.js">
        <h1>User registration</h1>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name:"
          ref={inputName}
        />
        <input
          type="number"
          name="age"
          id="age"
          placeholder="Age:"
          ref={inputAge}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail:"
          ref={inputEmail}
        />
        <button type="button" onClick={createUsers}>
          Register
        </button>
      </form>
      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Name: <span>{user.name}</span>
            </p>
            <p>
              Age: <span>{user.age}</span>
            </p>
            <p>
              E-mail: <span>{user.email}</span>
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Delete} alt="button to delete user" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
