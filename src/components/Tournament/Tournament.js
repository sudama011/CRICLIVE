import React, { useEffect, useState, useContext } from 'react'
import { db } from '../../firebase';
import { collection, query, onSnapshot } from "firebase/firestore";
import { Link, useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export default function Tournament() {
  const organiser = JSON.parse(localStorage.getItem('organiser'));
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { tournament } = useParams();

  // set document title
  useEffect(() => {
    document.title = `${tournament} - Point table - matches`;
  }, []);

  const [teams, setTeams] = useState([{
    name: "Loading...",
    match: "Loading...",
    win: "Loading...",
    loss: "Loading...",
    draw: "Loading...",
    point: "Loading...",
    NRR: "Loading...",
  }]);

  const [presentMatch, setPresentMatch] = useState([{
    id: "Loading...",
    team1: "Loading...",
    team2: "Loading...",
    date: "Loading...",
    time: "Loading...",
    winningMessage: "Loading...",
  }]);

  const [futureMatch, setFutureMatch] = useState([{
    id: "Loading...",
    team1: "Loading...",
    team2: "Loading...",
    date: "Loading...",
    time: "Loading...",
    winningMessage: "Loading...",
  }]);

  const [pastMatch, setPastMatch] = useState([{
    id: "Loading...",
    team1: "Loading...",
    team2: "Loading...",
    date: "Loading...",
    time: "Loading...",
    winningMessage: "Loading...",
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
      let arr1 = []
      let arr2 = []
      let arr3 = []
      querySnapshot.forEach((t) => {
        if (t.data().winningMessage === 'Match is not started yet')
          arr2.push(t.data());
        else if (t.data().hasMatchEnded) {
          arr3.push(t.data());
        }
        else {
          arr1.push(t.data());
        }
      })

      setPresentMatch(arr1);
      setFutureMatch(arr2);
      setPastMatch(arr3);
    })
  }, [])


  function getPointTable(teams) {
    return teams.map((t, index) => (
      <tr key={index}>
        <td>
          <Link to={`/tournament/${tournament}/${t.name}`} state={{ organiser: organiser }}>
            <button className="btn btn-info">{t.name}</button>
          </Link>
        </td>
        <td>{t.match}</td>
        <td>{t.win}</td>
        <td>{t.loss}</td>
        <td>{t.draw}</td>
        <td>{t.point}</td>
        <td>{t.NRR}</td>
      </tr>
    ))
  }


  function getBody(match) {
    return match.map((t, index) =>
      <tr key={index}>
        <td>
          {
            user.uid === organiser.uid ?
              <Link to={t.hasMatchEnded ? '/match/live-score' : t.maxOver ? '/match/score' : '/match'}
                state={{ matchid: t.id, team1: t.team1, team2: t.team2, tournament: tournament }}>
                <button type="button" className="btn btn-info">{t.id}</button>
              </Link>
              :
              <Link to='/match/live-score' state={{ matchid: t.id, team1: t.team1, team2: t.team2, tournament: tournament, organiser: organiser }}>
                <button type="button" className="btn btn-info">{t.id}</button>
              </Link>
          }

        </td>
        <td> {t.team1}</td>
        <td> {t.team2}</td>
        <td> {t.date} </td>
        <td> {t.time}</td>
        <td> {t.winningMessage} </td>
      </tr >
    );
  }

  return (
    <div className='text-center'>
      <h2>Point Table:</h2>
      <div className='overflow-auto'>
        <table className="table table-info text-left">
          <thead>
            <tr>
              <th>Name</th>
              <th>Match</th>
              <th>Win</th>
              <th>Loss</th>
              <th>Draw</th>
              <th>Point</th>
              <th title='Net run rate'>NRR</th>
            </tr>
          </thead>

          <tbody>

            {getPointTable(teams)}

          </tbody>

        </table>
      </div>

      <br />
      {user.uid === organiser.uid &&
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
        <li className="list-group-item list-group-item-success p-0 overflow-auto">
          <h3>Present Matches :</h3>

          <table className="table table-info text-left">
            <thead>
              <tr>
                <th>Match id</th>
                <th>Team1</th>
                <th>Team2</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {getBody(presentMatch)}

            </tbody>

          </table>


        </li>
        <li className="list-group-item list-group-item-warning p-0 overflow-auto">
          <h3>Future Matches :</h3>
          <table className="table table-info text-left">
            <thead>
              <tr>
                <th>Match id</th>
                <th>Team1</th>
                <th>Team2</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {getBody(futureMatch)}
            </tbody>

          </table>

        </li>
        <li className="list-group-item list-group-item-dark p-0 overflow-auto">
          <h3>Past Matches :</h3>

          <table className="table table-info text-left">
            <thead>
              <tr>
                <th>Match id</th>
                <th>Team1</th>
                <th>Team2</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {getBody(pastMatch)}

            </tbody>

          </table>

        </li>
      </ul>

    </div>
  )
}
