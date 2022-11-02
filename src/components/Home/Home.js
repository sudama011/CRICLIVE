import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, onSnapshot } from "firebase/firestore";

function Home() {


    const [presentTournament, setPresentTournament] = useState([{
        name: "Loding...",
        startDate: "Loding...",
        endDate: "Loding...",
        prize: "Loding...",
        village: "Loding...",
        city: "Loding...",
        state: "Loding...",
        organiser: "Loding...",
    }]);

    const [futureTournament, setFutureTournament] = useState([{
        name: "Loding...",
        startDate: "Loding...",
        endDate: "Loding...",
        prize: "Loding...",
        village: "Loding...",
        city: "Loding...",
        state: "Loding...",
        organiser: "Loding...",
    }]);

    const [pastTournament, setPastTournament] = useState([{
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
            setPresentTournament(arr);
            setFutureTournament(arr);
            setPastTournament(arr);
        })
    }, [])

    function getBody(tournaments) {
        const tournamentList = tournaments.map((t, index) =>
            <tr key={index}>
                <td>{t.name}</td>
                <td> {t.startDate}</td>
                <td> {t.endDate}</td>
                <td> {t.organiser} </td>
                <td> {t.prize}</td>
                <td> {t.village} </td>
                <td> {t.city}</td>
                <td> {t.state}</td>
            </tr>
        );
        return tournamentList;
    }

    return (
        <div>

            <ul className="list-group">
                <li className="list-group-item list-group-item-success">
                    <h3>Present Tournaments</h3>
                    <div className="hide-x-scroll" style={{ overflowX: "scroll" }}>
                        <table className="table table-striped table-info" border="2" cellPadding="5">
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
                <li className="list-group-item list-group-item-warning">
                    <h3>Future Tournaments</h3>
                    <div className="hide-x-scroll" style={{ overflowX: "scroll" }}>
                        <table className="table table-striped table-info" border="2" cellPadding="5">
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
                                {getBody(futureTournament)}
                            </tbody>

                        </table>
                    </div>
                </li>
                <li className="list-group-item list-group-item-dark">
                    <h3>Past Tournaments</h3>
                    <div className="hide-x-scroll" style={{ overflowX: "scroll" }}>
                        <table className="table table-striped table-info" border="2" cellPadding="5">
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
                                {getBody(pastTournament)}
                            </tbody>

                        </table>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Home;