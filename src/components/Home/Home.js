import React, { useState } from 'react';

function Home() {
    

    const [presentTournament, setPresentTournament] = useState(
        <tr>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
        </tr>
    );
    const [futureTournament, setFutureTournament] = useState(
        <tr>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
        </tr>
    );
    const [pastTournament, setPastTournament] = useState(
        <tr>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
        </tr>
    );


    // async function task() {
    //     let url = 'http://localhost:9000/home';
    //     try {
    //         let res = await fetch(url);
    //         let data = await res.json();

    //         setPresentTournament(getBody(data.present_tournament));
    //         setFutureTournament(getBody(data.future_tournament));
    //         setPastTournament(getBody(data.past_tournament));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // useEffect(() => {
    //     task();
    // }, [])


    // function getBody(tournaments) {
    //     const tournamentList = tournaments.map((t, index) =>
    //         <tr key={index}>
    //             <td><button onClick={fun}>{t.name}</button></td>
    //             <td> {t.start_date}</td>
    //             <td> {t.end_date}</td>
    //             <td> {t.organiser.name} </td>
    //             <td> {t.prize}</td>
    //             <td> {t.village} </td>
    //             <td> {t.city}</td>
    //             <td> {t.state}</td>
    //         </tr>
    //     );
    //     return tournamentList;
    // }

    // function fun(e) {
    //     return;
    // }

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
                                {presentTournament}
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
                                {futureTournament}
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
                                {pastTournament}
                            </tbody>

                        </table>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Home;