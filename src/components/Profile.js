import React from 'react'

export default function Profile(props) {

  if (!props.name) {
    return (
      <h2>Login please</h2>
    )
  }

  return (
    <div>
      <h2>Welcome - {props.name}</h2>
      <br />
      <form action="/createtournament" method="get">
        <button className="btn btn-secondary" type="submit">Create New Tournament</button>
      </form>
      <br />


      <h3>Your Tournaments</h3>
      <ul className="list-group">
        <li className="list-group-item list-group-item-success">
          <div className="hide-x-scroll" style={{ overflowX: "scroll" }}>
            <table className="table table-striped table-info" border="2" cellPadding="5">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Prize</th>
                  <th>Village</th>
                  <th>City</th>
                  <th>State</th>
                </tr>
              </thead>

              <tbody>

              </tbody>

            </table>
          </div>
        </li>
      </ul>
    </div>
  )
}
