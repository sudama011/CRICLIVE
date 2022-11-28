import React, { useState, useEffect, useContext } from 'react';
import { db } from '../../firebase';
import { collection, query, onSnapshot } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { Player } from './Player';
import { UserContext  } from "../../context/userContext";
export default function Team() {
  const organiser = JSON.parse(localStorage.getItem('organiser'));
  const { user } = useContext(UserContext);
  const { tournament, team } = useParams();

  // set document title
  useEffect(() => {
    document.title = `${team} team-info`;
  }, []);

  const [players, setPlayers] = useState([{
    name: "Loding..."
  }]);

  useEffect(() => {
    const q = query(collection(db, `tournaments/${tournament}/teams/${team}/players`));

    onSnapshot(q, (querySnapshot) => {
      let arr = []
      querySnapshot.forEach((t) => {
        arr.push({ ...t.data() });
      })
      setPlayers(arr);
    })
  }, [])

  const [isShown, setIsShown] = useState({ 0: false, 1: false, 2: false, 3: false });
  const handleClick = event => {
    let index = event.target.getAttribute('data-index');
    if (isShown[index])
      setIsShown(current => ({ ...current, [index]: false }));
    else
      setIsShown(current => ({ ...current, [index]: true }));
  };
  return (
    <div className='text-center'>
      <h3>Team Name : {team}</h3>
      <h5>Playing in tournament : {tournament}</h5>

      <br />
      {user.uid===organiser.uid &&
        <>
          <Link to={`/tournament/${tournament}/${team}/addplayer`}>
            <button type="button" className="btn btn-info">Add New Player</button>
          </Link>
          <br />
          <br />
        </>
      }

      <ul className="list-group list-group-item-success">
        <h2>All Team players :</h2>
        {players.map((p, index) => (
          <li key={index} className="list-group-item list-group-item-success p-2">

            <button data-index={index} className="btn btn-info"
              onClick={handleClick}
            >{index + 1}. {p.name}</button>

            {isShown[index] && <Player M={p.M} Batting={p.Batting} Bowling={p.Bowling} />}

          </li>
        ))
        }
      </ul>
    </div>
  )
}
