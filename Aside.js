import React from "react";
import { Link } from "react-router-dom";
export class Aside extends React.Component {
  constructor() {
    super();
    this.fun = this.fun.bind(this);
    this.fun1 = this.fun1.bind(this);
    this.fun2 = this.fun2.bind(this);
    this.state = {
      tdata: [],
      userId: "",
      title: "",
      body: "",
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/user")
      .then((res) => res.json())

      .then((data) => {
        this.setState({ tdata: data });

        // console.log(this.state.tdata);
      })

      .catch(console.log);
  }
  fun() {
    fetch("http://localhost:4000/user", {
      method: "POST",
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body,
        userId: this.state.userId,
      }),
      headers: { "content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())

      .then((data) => {
        console.log(data);
      })

      .catch(console.log);
  }
  fun1(e) {
    let uid = e.target.value;

    fetch("http://localhost:4000/user/" + uid, {
      method: "PUT",
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body,
        userId: this.state.userId,
      }),
      headers: { "content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())

      .then((data) => {
        console.log(data);
      })

      .catch(console.log);
  }
  fun2(e) {
    let uid = e.target.value;

    fetch("http://localhost:4000/user/" + uid, {
      method: "delete",
    })
      .then((res) => res.json())

      .then((data) => {
        console.log(data);
      })

      .catch(console.log);
  }

  render() {
    return (
      <>
        <div className="container">
          <div>
            <input
              type="text"
              name="userId"
              onChange={(e) => this.setState({ userId: e.target.value })}
              placeholder="userId"
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => this.setState({ title: e.target.value })}
              name="title"
              placeholder="title"
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => this.setState({ body: e.target.value })}
              name="body"
              placeholder="body"
            />
          </div>
          <button onClick={this.fun}>input</button>
        </div>
        <div className="container">
          <table className="table table-striped bg-dark">
            <tbody>
              <tr>
                <th>id</th>
                <th>userid</th>
                <th>Email</th>
                <th>body</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {this.state.tdata.map((person) => (
                <tr>
                  <td>{person.id}</td>
                  <td>{person.userId}</td>

                  <td>{person.title}</td>

                  <td>{person.body}</td>
                  <td>
                    <button value={person.id} onClick={this.fun1}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button value={person.id} onClick={this.fun2}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
