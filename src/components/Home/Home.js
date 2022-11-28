import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";
function Home() {

    // set document title
    useEffect(() => {
        document.title = 'Home Page';
    }, []);
    const [presentTournament, setPresentTournament] = useState([{
        name: "Loading...",
        startDate: "Loading...",
        endDate: "Loading...",
        prize: "Loading...",
        village: "Loading...",
        city: "Loading...",
        state: "Loading...",
        organiser: "Loading...",
    }]);

    useEffect(() => {
        const q = query(collection(db, 'tournaments'),
            orderBy('prize', 'desc')
        );
        onSnapshot(q, (querySnapshot) => {
            let arr = []
            querySnapshot.forEach((t) => {
                arr.push({ ...t.data() });
            })
            setPresentTournament(arr);
        })
    }, [])

    function getBody(tournaments) {
        const tournamentList = tournaments.map((t, index) =>
            <tr key={index}>
                <td>
                    <Link to={`/tournament/${t.name}`}>
                        <button type="button" className="btn btn-info"
                            onClick={() => localStorage.setItem('organiser', JSON.stringify(t.organiser))}>{t.name}</button>
                    </Link>
                </td>
                <td> {t.startDate}</td>
                <td> {t.endDate}</td>
                <td> {t.organiser.name} </td>
                <td> {t.prize}</td>
                <td> {t.village} </td>
                <td> {t.city}</td>
                <td> {t.state}</td>
            </tr>
        );
        return tournamentList;
    }

    return (
        <ul className='p-0 text-center'>
            <li className="list-group-item list-group-item-success p-0">
                <h3>All Tournaments</h3>
                <div style={{ overflowX: "scroll" }}>
                    <table className="table table-info">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Organiser</th>
                                <th>Prize</th>
                                <th>Village</th>
                                <th>City</th>
                                <th>State</th>
                            </tr>
                        </thead>

                        <tbody>
                            {getBody(presentTournament)}
                        </tbody>

                    </table>
                </div>

            </li>
        </ul>
    )
}

export default Home;