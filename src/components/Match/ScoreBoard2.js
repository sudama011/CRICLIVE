import Radio from '@mui/material/Radio'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './ScoreBoard.css'
import { db } from '../../firebase';
import { query, collection, onSnapshot, where } from 'firebase/firestore';

export default function ScoreBoard2() {
    const tournamentDetails = useLocation().state;
    const tournament = tournamentDetails.tournament;
    const matchid = tournamentDetails.matchid;

    const [inningNo, setInningNo] = useState(1)
    const [match, setMatch] = useState({ inning1: { batters: [], bowlers: [] }, inning2: { batters: [], bowlers: [] } })
    const [currentRunStack, setCurrentRunStack] = useState([])
    const [totalRuns, setTotalRuns] = useState(0)
    const [extras, setExtras] = useState({ total: 0, wide: 0, noBall: 0 })
    const [wicketCount, setWicketCount] = useState(0)
    const [totalOvers, setTotalOvers] = useState(0)
    const [overCount, setOverCount] = useState(0)
    const [recentOvers, setRecentOvers] = useState([])
    const [batter1, setBatter1] = useState({})
    const [batter2, setBatter2] = useState({})
    const [bowler, setBowler] = useState({})
    const [strikeValue, setStrikeValue] = React.useState('strike')
    const [hasMatchEnded, setMatchEnded] = useState(false)
    const [maxOver, setMaxOver] = useState(1)
    const [scoringTeam, setScoringTeam] = useState('')
    const [chessingTeam, setChessingTeam] = useState(1)
    const [winningMessage, setWinningMessage] = useState(1)

    const [team1, setTeam1] = useState('')
    const [team2, setTeam2] = useState('')
    const [rrr, setRrr] = useState(0)
    const [crr, setCrr] = useState(0)

    useEffect(() => {

        const task = async () => {
            try {
                const q = query(collection(db, `tournaments/${tournament}/matches`),
                    where('id', '==', `${matchid}`));
                const unsubscribe = await onSnapshot(q, (querySnapshot) => {
                    let arr = []
                    querySnapshot.forEach((t) => {
                        arr.push({ ...t.data() });
                    });
                    setInningNo(arr[0].inningNo);
                    setMatch(arr[0].match);
                    setCurrentRunStack(arr[0].currentRunStack);
                    setTotalRuns(arr[0].totalRuns);
                    setExtras(arr[0].extras);
                    setWicketCount(arr[0].wicketCount);
                    setTotalOvers(arr[0].totalOvers);
                    setOverCount(arr[0].overCount);
                    setRecentOvers(arr[0].recentOvers);
                    setBatter1(arr[0].batter1);
                    setBatter2(arr[0].batter2);
                    setBowler(arr[0].bowler);
                    setStrikeValue(arr[0].strikeValue);
                    setMatchEnded(arr[0].hasMatchEnded);
                    setMaxOver(arr[0].maxOver);
                    setScoringTeam(arr[0].scoringTeam);
                    setChessingTeam(arr[0].chessingTeam);
                    setWinningMessage(arr[0].winningMessage);

                    setTeam1(arr[0].team1);
                    setTeam2(arr[0].team2);
                    setRrr(arr[0].rrr);
                    setCrr(arr[0].crr);

                    if (winningMessage === 'Match Tied') {
                        unsubscribe();
                    }
                });
            } catch (err) {
                console.error(err);
            }
        }
        task();

    }, []);



    const inning1 = match.inning1
    const inning2 = match.inning2

    var target = inning1.runs ? inning1.runs + 1 : 0;
    const welcomeContent = (
        <>
            <div></div>
            <div>Welcome to Crilive Cricket Score Board</div>
            <div></div>
        </>
    )
    const firstInningCompletedContent = (
        <>
            {overCount === maxOver && <div>1st inning completed</div>}
            {wicketCount === 10 && <div>All Out</div>}
        </>
    )
    const remainingRunsContent = (
        <>
            <div>Target: {target}</div>
            <div>{winningMessage}</div>
            {hasMatchEnded ? <div></div> : <div>RRR: {rrr}</div>}
        </>
    )

    return (
        <div >
            <div className='inning'>
                <div>
                    {team1} vs {team2}, {inningNo === 1 ? '1st' : '2nd'} Inning
                </div>
            </div>
            <div id='badge' className='badge badge-flex'>
                {inningNo === 2 ? remainingRunsContent : overCount === maxOver || wicketCount === 10 ? firstInningCompletedContent : welcomeContent}
            </div>
            <div className='score-container'>

                <div className='score'>
                    <div>
                        {inningNo === 1 ? scoringTeam : chessingTeam} : {totalRuns}/{wicketCount} ({totalOvers})
                    </div>
                    <div>CRR : {isNaN(crr) ? 0 : crr}</div>
                </div>
                <div className='batting-container'>
                    <table>
                        <thead>
                            <tr>
                                <td className='score-types padding-left'>Batting</td>
                                <td className='score-types'>R(B)</td>
                                <td className='score-types text-center'>4s</td>
                                <td className='score-types text-center'>6s</td>
                                <td className='score-types text-center'>SR</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='score-types'>
                                    <span id='strike'>
                                        <Radio
                                            size='small'
                                            checked={strikeValue === 'strike'}

                                            value='strike'
                                            name='radio-buttons'
                                            inputProps={{ 'aria-label': 'strike' }}
                                            style={{ padding: '0 4px 0 2px' }}
                                        />{batter1.name}
                                    </span>

                                </td>
                                <td className='score-types'>{batter1.run === undefined ? `0(0)` : `${batter1.run}(${batter1.ball})`}</td>
                                <td className='score-types'>{batter1.four === undefined ? 0 : batter1.four}</td>
                                <td className='score-types'>{batter1.six === undefined ? 0 : batter1.six}</td>
                                <td className='score-types'>{batter1.strikeRate === undefined ? 0 : batter1.strikeRate}</td>
                            </tr>
                            <tr>
                                <td className='score-types'>
                                    <span id='non-strike'>
                                        <Radio
                                            size='small'
                                            checked={strikeValue === 'non-strike'}
                                            value='non-strike'
                                            name='radio-buttons'
                                            inputProps={{ 'aria-label': 'non-strike' }}
                                            style={{ padding: '0 4px 0 2px' }}
                                        />{batter2.name}
                                    </span>

                                </td>
                                <td className='score-types'>{batter2.run === undefined ? `0(0)` : `${batter2.run}(${batter2.ball})`}</td>
                                <td className='score-types'>{batter2.four === undefined ? 0 : batter2.four}</td>
                                <td className='score-types'>{batter2.six === undefined ? 0 : batter2.six}</td>
                                <td className='score-types'>{batter2.strikeRate === undefined ? 0 : batter2.strikeRate}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='bowler-container'>
                    <div className='bowler'>
                        Bowler: {bowler.name}
                    </div>
                    <div className='bowler-runs'>
                        {currentRunStack.map((run, i) => (
                            <div key={i}>{run}</div>
                        ))}
                    </div>
                </div>

                <div className='extras-container'>
                    <div>Extras: {extras.total}</div>
                    <div>Wd: {extras.wide}</div>
                    <div>NB: {extras.noBall}</div>
                </div>
                <div className='recent-over-container'>
                    <div className='recent-over-text'>Recent Overs</div>
                    <div className='recent-over-details'>
                        <table>
                            <tbody>
                                {recentOvers.map((recentOver, i) => (
                                    <tr key={i}>
                                        <td>{recentOver.overNo}.</td>
                                        <td>{recentOver.bowler}:</td>
                                        <td>
                                            <div className='recent-over-runs'>
                                                {recentOver.stack.map((run, index) => (
                                                    <div key={index}>{run}</div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className='recent-over-total-run'>
                                            <div>{recentOver.runs}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='score-board-container'>
                    <div className='score-board-text text-center'>Score Board</div>
                    {/* Inning1 Starts here */}
                    <div>
                        <div className='score-board-innings'>
                            <div>{scoringTeam} Innings</div>
                            <div>RR:{inningNo === 1 ? crr : inning1.runRate}</div>
                            <div>
                                {inningNo === 1 ? totalRuns : inning1.runs}-{inningNo === 1 ? wicketCount : inning1.wickets} (
                                {inningNo === 1 ? totalOvers : inning1.overs} Ov)
                            </div>
                        </div>
                        <div className='sb-batting'>
                            <table>
                                <thead>
                                    <tr>
                                        <td className='score-types padding-left'>Batter</td>
                                        <td className='score-types'>R(B)</td>
                                        <td className='score-types text-center'>4s</td>
                                        <td className='score-types text-center'>6s</td>
                                        <td className='score-types text-center'>SR</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inning1.batters.map((batter, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className='score-types padding-left'>{batter.name}</td>
                                                <td className='score-types'>
                                                    {batter.run}({batter.ball})
                                                </td>
                                                <td className='score-types text-center'>{batter.four}</td>
                                                <td className='score-types text-center'>{batter.six}</td>
                                                <td className='score-types text-center'>{batter.strikeRate}</td>
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td className='score-types padding-left'>Extras:</td>
                                        <td className='score-types'>{inningNo === 1 ? extras.total : inning1.extra.total}</td>
                                        <td className='score-types text-center'>wd:{inningNo === 1 ? extras.wide : inning1.extra.wide}</td>
                                        <td className='score-types text-center'>nb:{inningNo === 1 ? extras.noBall : inning1.extra.noBall}</td>
                                        <td className='score-types text-center'></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='sb-bowling'>
                            <table>
                                <thead>
                                    <tr>
                                        <td className='score-types padding-left'>Bowler</td>
                                        <td className='score-types'>O</td>
                                        <td className='score-types text-center'>M</td>
                                        <td className='score-types text-center'>R</td>
                                        <td className='score-types text-center'>W</td>
                                        <td className='score-types text-center'>NB</td>
                                        <td className='score-types text-center'>WD</td>
                                        <td className='score-types text-center'>ECO</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inning1.bowlers.map((blr, i) => {
                                        const { name, over, maiden, run, wicket, noBall, wide, economy } = blr
                                        return (
                                            <tr key={i}>
                                                <td className='score-types padding-left'>{name}</td>
                                                <td className='score-types'>{over}</td>
                                                <td className='score-types text-center'>{maiden}</td>
                                                <td className='score-types text-center'>{run}</td>
                                                <td className='score-types text-center'>{wicket}</td>
                                                <td className='score-types text-center'>{noBall}</td>
                                                <td className='score-types text-center'>{wide}</td>
                                                <td className='score-types text-center'>{economy}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Inning2 Starts here */}
                    {inningNo === 2 && (
                        <div>
                            <div className='score-board-innings'>
                                <div>{chessingTeam} Innings</div>
                                <div>RR:{inningNo === 2 ? crr : inning2.runRate}</div>
                                <div>
                                    {hasMatchEnded ? inning2.runs : totalRuns}-{hasMatchEnded ? inning2.wickets : wicketCount} (
                                    {hasMatchEnded ? inning2.overs : totalOvers} Ov)
                                </div>
                            </div>
                            <div className='sb-batting'>
                                <table>
                                    <thead>
                                        <tr>
                                            <td className='score-types padding-left'>Batter</td>
                                            <td className='score-types'>R(B)</td>
                                            <td className='score-types text-center'>4s</td>
                                            <td className='score-types text-center'>6s</td>
                                            <td className='score-types text-center'>SR</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inning2.batters.map((batter, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className='score-types padding-left'>{batter.name}</td>
                                                    <td className='score-types'>
                                                        {batter.run}({batter.ball})
                                                    </td>
                                                    <td className='score-types text-center'>{batter.four}</td>
                                                    <td className='score-types text-center'>{batter.six}</td>
                                                    <td className='score-types text-center'>{batter.strikeRate}</td>
                                                </tr>
                                            )
                                        })}
                                        <tr>
                                            <td className='score-types padding-left'>Extras:</td>
                                            <td className='score-types'>{hasMatchEnded ? inning2.extra.total : extras.total}</td>
                                            <td className='score-types text-center'>wd:{hasMatchEnded ? inning2.extra.wide : extras.wide}</td>
                                            <td className='score-types text-center'>nb:{hasMatchEnded ? inning2.extra.noBall : extras.noBall}</td>
                                            <td className='score-types text-center'></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='sb-bowling'>
                                <table>
                                    <thead>
                                        <tr>
                                            <td className='score-types padding-left'>Bowler</td>
                                            <td className='score-types'>O</td>
                                            <td className='score-types text-center'>M</td>
                                            <td className='score-types text-center'>R</td>
                                            <td className='score-types text-center'>W</td>
                                            <td className='score-types text-center'>NB</td>
                                            <td className='score-types text-center'>WD</td>
                                            <td className='score-types text-center'>ECO</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inning2.bowlers.map((blr, i) => {
                                            const { name, over, maiden, run, wicket, noBall, wide, economy } = blr
                                            return (
                                                <tr key={i}>
                                                    <td className='score-types padding-left'>{name}</td>
                                                    <td className='score-types'>{over}</td>
                                                    <td className='score-types text-center'>{maiden}</td>
                                                    <td className='score-types text-center'>{run}</td>
                                                    <td className='score-types text-center'>{wicket}</td>
                                                    <td className='score-types text-center'>{noBall}</td>
                                                    <td className='score-types text-center'>{wide}</td>
                                                    <td className='score-types text-center'>{economy}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
