import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { collection, query, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Profile({user}) {

  if (!user.name) {
    return (
      <h2>Login please</h2>
    )
  }
  const [tournaments, setTournaments] = useState([{
    name: "Loding...",
    startDate: "Loding...",
    endDate: "Loding...",
    prize: "Loding...",
    village: "Loding...",
    city: "Loding...",
    state: "Loding...",
    organiser: "Loding...",
  }]);

  useEffect(() => {
    const q = query(collection(db, 'tournaments'))
    onSnapshot(q, (querySnapshot) => {
      let arr = []
      querySnapshot.forEach((t) => {
        arr.push({ ...t.data() });
      })
      setTournaments(arr);
    })
  }, [])

  function getBody(tournaments) {
    const tournamentList = tournaments.map((t, index) =>
      <tr key={index}>
        <td>
          <Link to={`/tournament/${t.name}`}>
            <button type="button" className="btn btn-info">{t.name}</button>
          </Link>
        </td>
        <td>{t.startDate}</td>
        <td>{t.endDate}</td>
        <td>{t.prize}</td>
        <td>{t.village}</td>
        <td>{t.city}</td>
        <td>{t.state}</td>
      </tr>
    );
    return tournamentList;
  }
  
  return (
    <div>
      <h2>Welcome - {user.name}</h2>
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

                {getBody(tournaments)}

              </tbody>

            </table>
          </div>
        </li>
      </ul>
    </div>
  )
}
