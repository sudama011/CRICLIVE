import React, { useEffect, useState, useContext } from 'react'
import { db } from '../../firebase';
import { collection, query, onSnapshot } from "firebase/firestore";
import { Link, useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export default function Tournament() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { tournament } = useParams();

  const [teams, setTeams] = useState([{
    name: "Loding...",
    match: "Loding...",
    win: "Loding...",
    loss: "Loding...",
    draw: "Loding...",
    point: "Loding...",
  }]);

  const [presentMatch, setPresentMatch] = useState([{
    id: "Loding...",
    team1: "Loding...",
    team2: "Loding...",
    date: "Loding...",
    time: "Loding...",
    winner: "Loding...",
  }]);

  const [futureMatch, setFutureMatch] = useState([{
    id: "Loding...",
    team1: "Loding...",
    team2: "Loding...",
    date: "Loding...",
    time: "Loding...",
    winner: "Loding...",
  }]);

  const [pastMatch, setPastMatch] = useState([{
    id: "Loding...",
    team1: "Loding...",
    team2: "Loding...",
    date: "Loding...",
    time: "Loding...",
    winner: "Loding...",
  }]);

  useEffect(() => {
    const q = query(collection(db, `tournaments/${tournament}/teams`))
    onSnapshot(q, (querySnapshot) => {
      let arr = []
      querySnapshot.forEach((t) => {
        arr.push({ ...t.data() });
      })
      setTeams(arr);
    })
  }, [])

  useEffect(() => {
    const q = query(collection(db, `tournaments/${tournament}/matches`))
    onSnapshot(q, (querySnapshot) => {
      let arr = []
      querySnapshot.forEach((t) => {
        arr.push({ ...t.data() });
      })

      setPresentMatch(arr);
      setFutureMatch(arr);
      setPastMatch(arr);
    })
  }, [])


  function getPointTable(teams) {
    return teams.map((t, index) => (
      <tr key={index}>
        <td>
          <Link to={`/tournament/${tournament}/${t.name}`}>
            <button className="btn btn-info">{t.name}</button>
          </Link>
        </td>
        <td>{t.match}</td>
        <td>{t.win}</td>
        <td>{t.loss}</td>
        <td>{t.draw}</td>
        <td>{t.point}</td>
      </tr>
    ))
  }


  function getBody(match) {
    return match.map((t, index) =>
      <tr key={index}>
        <td>
          <Link to='/match' state={{ matchid: t.id, team1: t.team1, team2: t.team2 }}>
            <button type="button" className="btn btn-info">{t.id}</button>
          </Link>
        </td>
        <td> {t.team1}</td>
        <td> {t.team2}</td>
        <td> {t.date} </td>
        <td> {t.time}</td>
        <td> {t.winner} </td>
      </tr >
    );
  }

  return (
    <div>
      <h2>Point Table:</h2>
      <div className="hide-x-scroll" style={{ overflowX: "scroll" }}>
        <table className="table table-striped table-info" border="2" cellPadding="5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Match</th>
              <th>Win</th>
              <th>Loss</th>
              <th>Draw</th>
              <th>Point</th>
            </tr>
          </thead>

          <tbody>

            {getPointTable(teams)}

          </tbody>

        </table>
      </div>

      <br />
      {user.uid &&
        <div>
          <Link to={`/tournament/${tournament}/addteam`}>
            <button type="button" className="btn btn-info">Add Team</button>
          </Link>
          <br />
          <br />
          <button type="button" onClick={(e) => {
            navigate(`/tournament/${tournament}/scheduleMatch`, { state: { teams: teams } });
          }} className="btn btn-info">Schedule Match</button>

          <br />
          <br />
        </div>}

      <ul className="list-group">
        <li className="list-group-item list-group-item-success">
          <h1>Present Match</h1>
          <div className="hide-x-scroll" style={{ overflowX: "scroll" }}>
            <table className="table table-striped table-info" border="2" cellPadding="5">
              <thead>
                <tr>
                  <th>Match id</th>
                  <th>Team1</th>
                  <th>Team2</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Winner</th>
                </tr>
              </thead>

              <tbody>

                {getBody(presentMatch)}

              </tbody>

            </table>
          </div>

        </li>
        <li className="list-group-item list-group-item-warning">
          <h1>Future Match</h1>
          <div className="hide-x-scroll" style={{ overflowX: "scroll" }}>
            <table className="table table-striped table-info" border="2" cellPadding="5">
              <thead>
                <tr>
                  <th>Match id</th>
                  <th>Team1</th>
                  <th>Team2</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Winner</th>
                </tr>
              </thead>

              <tbody>

                {getBody(futureMatch)}
              </tbody>

            </table>
          </div>
        </li>
        <li className="list-group-item list-group-item-dark">
          <h1>Past Match</h1>
          <div className="hide-x-scroll" style={{ overflowX: "scroll" }}>
            <table className="table table-striped table-info" border="2" cellPadding="5">
              <thead>
                <tr>
                  <th>Match id</th>
                  <th>Team1</th>
                  <th>Team2</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Winner</th>
                </tr>
              </thead>

              <tbody>
                {getBody(pastMatch)}

              </tbody>

            </table>
          </div>
        </li>
      </ul>

    </div>
  )
}
