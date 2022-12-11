import React, { useEffect, useState, useContext } from 'react'
import { db } from '../firebase';
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { UserContext } from '../context/userContext';

export default function Profile() {
  useEffect(() => {
    document.title = 'my profile';
  }, []);

  const { user } = useContext(UserContext);
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
    if (user.uid) {
      const q = query(collection(db, 'tournaments'),
        where(`organiser.uid`, '==', `${user.uid}`)
      );

      onSnapshot(q, (querySnapshot) => {
        let arr = []
        querySnapshot.forEach((t) => {
          arr.push({ ...t.data() });
        })
        arr.sort(function (a, b) { return b.prize - a.prize });

        setTournaments(arr);
      })
    }
  }, [user]);

  function getBody(tournaments) {
    const tournamentList = tournaments.map((t, index) =>
      <tr key={index}>
        <td>
          <Link to={`/tournament/${t.name}`}>
            <button type="button" className="btn btn-info"
              onClick={() => localStorage.setItem('organiser', JSON.stringify(t.organiser))}>{t.name}</button>
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
    <div className='text-center overflow-auto'>
      <div className='h3 text-justify text-center text-uppercase font-italic text-primary'>
        Welcome - {user.name}
      </div>
      <br />
      <form action="/createtournament" method="get">
        <button className="btn btn-secondary" type="submit">Create New Tournament</button>
      </form>
      <br />


      <h3>Your Tournaments</h3>
      <table className="table table-info text-left">
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

    </div >
  )
}
