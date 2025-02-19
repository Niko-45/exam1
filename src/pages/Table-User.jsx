import React, { useState } from "react";
import "./table.css";
export default function TableUser() {
  const [todos, setTodos] = useState([
    {
      id: "1",
      name: "Jacob Jones",
      email: "jackson.graham@example.com",
      city: "Dushanbe",
      complete: true,
      phone: "88888 0090",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      id: "2",
      name: "Jenny Wilson",
      email: "jessica.hanson@example.com",
      city: "Kulob",
      complete: false,
      phone: "88888 0090",
      image: "https://randomuser.me/api/portraits/men/13.jpg",
    },
    {
      id: "3",
      name: "Guy Hawkins",
      email: "bill.sanders@example.com",
      city: "Bokhtar",
      complete: true,
      phone: "88888 0090",
      image: "https://randomuser.me/api/portraits/men/14.jpg",
    },
    {
      id: "4",
      name: "Mr White Flex",
      email: "bill.saders@example.com",
      city: "Khujand",
      complete: false,
      phone: "88888 0090",
      image: "https://randomuser.me/api/portraits/men/16.jpg",
    },
    {
      id: "5",
      name: "William Hawk",
      email: "bi.sanders@example.com",
      city: "Kulob",
      complete: false,
      phone: "88888 0090",
      image: "https://randomuser.me/api/portraits/men/17.jpg",
    },
  ]);
  const [action, setAction] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editState, setEditState] = useState(null);
  const [idx, setIdx] = useState(null);
  const [actionId, setActionId] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterComplete, setFilterComplete] = useState("all");
  const [filterComplete2, setFilterComplete2] = useState("all");
  const [infoModal, setInfoModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false)
  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
    setAction(false);
  }
  function handleEdit(todo) {
    setEditName(todo.name);
    setEditEmail(todo.email);
    setEditPhone(todo.phone);
    setEditCity(todo.city);
    setEditState(todo.complete);
    setIdx(todo.id);
    setEditModal(true);
  }
  function editTodo(e) {
    e.preventDefault();
    setTodos(
      todos.map((todo) =>
        todo.id == idx
          ? {
              ...todo,
              name: editName,
              email: editEmail,
              phone: editPhone,
              city: editCity,
              complete: editState,
            }
          : todo
      )
    );
    setEditModal(false);
  }
  function addTodo(e) {
    e.preventDefault();
    const form = e.target;
    const newTodo = {
      id: Date.now().toString(),
      name: form.inp1.value,
      email: form.inp2.value,
      phone: form.inp3.value,
      city: form.inp4.value,
      complete: form.inp5.value === "true",
      image: "https://randomuser.me/api/portraits/men/15.jpg",
    };

    setTodos([...todos, newTodo]);
    setAddModal(false);
  }
  function darkModeFunc() {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }
  const savedMode = localStorage.getItem("darkMode") === "enabled";
  if (savedMode) {
    document.body.classList.add("dark-mode");
  }
  return (
    <>
      <header className="header">
        <h1>User List</h1>
        <div className="header-button">
          <button
            onClick={() => setAddModal(true)}
            className="button-blue button-div"
          >
            {<img src="/assets/images/img (7).png" />}New
          </button>
          <div className="header-btn">
            <button onClick={darkModeFunc} className="button-div btn1">
              {<img src="/assets/images/img (5).png" />}Light
            </button>
            <button onClick={darkModeFunc} className="button-div btn2">
              Dark{<img src="/assets/images/img (4).png" />}
            </button>
          </div>
        </div>
      </header>
      <nav>
        <div>
          <fieldset>
            <legend>City</legend>
            <select
              value={filterComplete2}
              onChange={(e) => setFilterComplete2(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Dushanbe">Dushanbe</option>
              <option value="Bokhtar">Bokhtar</option>
              <option value="Kulob">Kulob</option>
              <option value="Khujand">Khujand</option>
            </select>
          </fieldset>
          <fieldset>
            <legend>Status</legend>
            <select
              value={filterComplete}
              onChange={(e) => setFilterComplete(e.target.value)}
            >
              <option value="all">All</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend>Search</legend>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, email, etc..."
            />
            <img src="/assets/images/SearchFilled.png" alt="..." />
          </fieldset>
        </div>
      </nav>
      <main>
        <table>
          <thead>
            <tr>
              <th>
                <div className="thead-th">
                  {<img src="/assets/images/img (1).png" />} Name
                </div>
              </th>
              <th>
                <div className="thead-th">
                  {<img src="/assets/images/img (6).png" />}Город
                </div>
              </th>
              <th>
                <div className="thead-th td-status">
                  {<img src="/assets/images/img (9).png" />}Status
                  {<img src="/assets/images/img (2).png" />}
                </div>
              </th>
              <th>
                <div className="thead-th">
                  {<img src="/assets/images/img (8).png" />}Phone
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos
              .filter(
                (todo) =>
                  filterComplete === "all" ||
                  todo.complete.toString() === filterComplete
              )
              .filter(
                (todo) =>
                  filterComplete2 === "all" ||
                  todo.city.toString() === filterComplete2
              )
              .filter((todo) => JSON.stringify(todo).includes(search))

              .map((todo) => {
                return (
                  <tr key={todo.id}>
                    <td>
                      <td>
                        <img
                          src={todo.image}
                          alt={todo.name}
                          width="40"
                          height="40"
                          style={{ borderRadius: "50%" }}
                        />
                      </td>
                      <td>
                        {todo.name}
                        <br />
                        {todo.email}
                      </td>
                    </td>
                    <td>{todo.city}</td>
                    <td>
                      <p
                        className={
                          todo.complete ? "true-action" : "false-action"
                        }
                      >
                        {todo.complete ? "Active" : "Inactive"}
                      </p>
                    </td>
                    <td>{todo.phone}</td>
                    <td className="td-action">
                      <button
                        onClick={() => setActionId(todo.id)}
                        className="btn-3Dots"
                      >
                        <img src="/assets/images/img (3).png" alt="..." />
                      </button>
                    </td>
                    {actionId === todo.id && (
                      <div className="modal-button">
                        <button onClick={() => setInfoModal(true)}>
                          <div className="btn-div">
                            <img src="/assets/images/img (11).png" alt="..." />
                            View profile
                          </div>
                        </button>
                        <button onClick={() => handleEdit(todo)}>
                          <div className="btn-div">
                            <img src="/assets/images/img (13).png" alt="..." />
                            Edit
                          </div>
                        </button>
                        <button onClick={() => handleDelete(todo.id)}>
                          <div className="btn-div">
                            <img src="/assets/images/img (12).png" alt="..." />
                            Delete
                          </div>
                        </button>
                        <button
                          onClick={() => setActionId(null)}
                          className="btn-div_cancel"
                        >
                          <div className="btn-div">
                            <img src="/assets/images/img (10).png" alt="..." />
                          </div>
                        </button>
                      </div>
                    )}
                    {infoModal && actionId === todo.id && (
                      <div className="info-modal">
                        <div className="info-header">
                          <button
                            onClick={() => setInfoModal(false)}
                            className="close-btn"
                          >
                            <img
                              src="/assets/images/img (10).png"
                              alt="Close"
                            />
                          </button>
                          <h1>User info</h1>
                        </div>
                        <div className="info-body">
                          <img
                            src={todo.image}
                            alt={todo.name}
                            className="info-avatar"
                          />
                          <h3>{todo.name}</h3>
                          <p>{todo.email}</p>
                          <div className="info-details">
                            <div className="div-info">
                              <h4>
                                <img
                                  src="/assets/images/img (6).png"
                                  alt="..."
                                />
                                City
                              </h4>
                              <p>{todo.city}</p>
                            </div>
                            <div className="div-info">
                              <h4>
                                <img
                                  src="/assets/images/img (9).png"
                                  alt="..."
                                />
                                Status
                              </h4>
                              <p
                                className={
                                  todo.complete ? "true-action action" : "false-action action"
                                }
                              >
                                {todo.complete ? "Active" : "Inactive"}
                              </p>
                            </div>
                            <div className="div-info">
                              <h4>
                                <img
                                  src="/assets/images/img (8).png"
                                  alt="..."
                                />
                                Phone
                              </h4>
                              <p>{todo.phone}</p>
                            </div>
                          </div>
                          <div className="info-buttons">
                          <button className="button-blue" onClick={() => handleEdit(todo)}>
                          <div className="btn-div">
                            <img src="/assets/images/Masked Icon (1).png" alt="..." />
                            Edit
                          </div>
                        </button>
                        <button className="button-red" onClick={() => handleDelete(todo.id)}>
                          <div className="btn-div">
                            <img src="/assets/images/img (12).png" alt="..." />
                            Delete
                          </div>
                        </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
        {editModal && (
          <Modal
            title="Edit"
            close={() => setEditModal(false)}
            val1={editName}
            val2={editEmail}
            val3={editPhone}
            val4={editCity}
            val5={editState}
            change1={(e) => setEditName(e.target.value)}
            change2={(e) => setEditEmail(e.target.value)}
            change3={(e) => setEditPhone(e.target.value)}
            change4={(e) => setEditCity(e.target.value)}
            change5={(e) => setEditState(e.target.value === "true")}
            cancel={() => setEditModal(false)}
            funcModal={editTodo}
          />
        )}
        {addModal && (
          <Modal
            title="Add new"
            close={() => setAddModal(false)}
            cancel={() => setAddModal(false)}
            funcModal={addTodo}
          />
        )}
      </main>
    </>
  );
}
function Modal({
  funcModal,
  val1,
  val2,
  val3,
  val4,
  val5,
  change1,
  change2,
  change3,
  change4,
  change5,
  cancel,
  close,
  title,
}) {
  return (
    <div className="Modal">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>{title}</h1>
        <button type="button" className="button-cancel" onClick={close}>
          <img src="/assets/images/img (10).png" alt="..." />
        </button>
      </div>
      <form onSubmit={funcModal}>
        <input name="inp1" placeholder="Name" value={val1} onChange={change1} />
        <input
          name="inp2"
          placeholder="Email"
          value={val2}
          onChange={change2}
        />
        <select name="inp4" value={val4} onChange={change4}>
          <option value="Dushanbe">Dushanbe</option>
          <option value="Khujand">Khujand</option>
          <option value="Kulob">Kulob</option>
          <option value="Bokhtar">Bokhtar</option>
        </select>
        <select name="inp5" value={val5 ? "true" : "false"} onChange={change5}>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <input
          name="inp3"
          placeholder="Phone"
          value={val3}
          onChange={change3}
        />
        <div>
        <button className="button-blue" type="submit">
          Save
        </button>
        <button className="button-white" type="button" onClick={cancel}>
          Cancel
        </button>
        </div>
      </form>
    </div>
  );
}
