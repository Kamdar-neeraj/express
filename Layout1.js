import React from "react";
import axios from "axios";

export class Layout1 extends React.Component {
  constructor() {
    super();
    this.state = { repos: [] };
    this.fun = this.fun.bind(this);
    this.fun1 = this.fun1.bind(this);
    this.fun2 = this.fun2.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:4000/user").then((repos) => {
      const allRepos = repos.data;

      this.setState({ repos: allRepos });
    });
  }
  fun() {
    axios.post("http://localhost:4000/user", {
      userId: 12,
      title: "akintayo",
      body: "body 12",
    });
  }
  fun1(e) {
    let uid = e.target.value;
    axios.put("http://localhost:4000/user/" + uid, {
      userId: 12,
      title: " edited data akintayo",
      body: "body 12",
    });
  }
  fun2(e) {
    let uid = e.target.value;
    axios({
      method: "delete",
      url: "http://localhost:4000/user/" + uid,
    });
  }
  render() {
    return (
      <>
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
            {this.state.repos.map((person) => (
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
        <button onClick={this.fun}>post data</button>
      </>
    );
  }
}
