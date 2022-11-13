import React from 'react';

export function Player({ Batting, Bowling }) {

  return (
    <>
      <br />
      <br />
      <ul className='list-group' >
        <li className="list-group-item list-group-item-success p-1" style={{ overflowX: "scroll" }}>
          <h3>Batting Stats :</h3>
          <table className="table">
            <thead>
              <tr>
                <th title='Match Played'>M</th>
                <th title='No of Innings Batted'>Inn</th>
                <th title='No of Not Outs'>No</th>
                <th title='No of Runs Scored'>Runs</th>
                <th title='Highest Score'>Hs</th>
                <th title='Batting Average'>Avg</th>
                <th title='No of Balls Faced'>BF</th>
                <th title='Batting Strike Rate'>SR</th>
                <th title='No of fours Hit'>4</th>
                <th title='No of sixes Hit'>6</th>
                <th title='No of 50s Scored'>50</th>
                <th title='No of 100s Scored'>100</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{Batting.M}</td>
                <td>{Batting.Inn}</td>
                <td>{Batting.No}</td>
                <td>{Batting.Runs}</td>
                <td>{Batting.Hs}</td>
                <td>{Batting.Avg}</td>
                <td>{Batting.BF}</td>
                <td>{Batting.SR}</td>
                <td>{Batting[4]}</td>
                <td>{Batting[6]}</td>
                <td>{Batting[50]}</td>
                <td>{Batting[100]}</td>
              </tr>
            </tbody>
          </table>
        </li>
        <li className="list-group-item list-group-item-success p-1" style={{ overflowX: "scroll" }}>
          <h3>Bowling Stats :</h3>
          <table className="table">
            <thead>
              <tr>
                <th title='Match Played'>M</th>
                <th title='No of Innings Bowled'>Inn</th>
                <th title='No of Balls Bowled'>B</th>
                <th title='No of Runs Conceded'>Runs</th>
                <th title='Wickets'>Wkts</th>
                <th title='Best Bowling'>BB</th>
                <th title='Economy'>Econ</th>
                <th title='Bowling Average'>Avg</th>
                <th title='Five Wickets in an Inning'>5W</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{Bowling.M}</td>
                <td>{Bowling.Inn}</td>
                <td>{Bowling.B}</td>
                <td>{Bowling.Runs}</td>
                <td>{Bowling.Wkts}</td>
                <td>{Bowling.BB.W}/{Bowling.BB.R}</td>
                <td>{Bowling.Econ}</td>
                <td>{Bowling.Avg}</td>
                <td>{Bowling[5]}</td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
    </>
  )
}
