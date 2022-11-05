import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, onSnapshot } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { Player } from './Player';

export default function Team() {

  const { tournament, team } = useParams();

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
    <>
      <h3>Team Name : {team}</h3>
      <h5>Playing in tournament : {tournament}</h5>

      <br />
      <Link to={`/tournament/${tournament}/${team}/addplayer`}>
        <button type="button" className="btn btn-info">Add New Player</button>
      </Link>
      <br />
      <br />

      <h2>All Team players :</h2>

      <ul className="list-group">
        {players.map((p, index) => (
          <li key={index} className="list-group-item list-group-item-success p-2">

            <button data-index={index} className="btn btn-info"
              onClick={handleClick}
            >{p.name}</button>

            {isShown[index] && <Player p={p} />}

          </li>
        ))
        }
      </ul>
    </ >
  )
}
