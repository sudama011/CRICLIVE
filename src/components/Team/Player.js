import React from 'react';

export function Player({ p }) {

  return (
    <>
      <br/>
      <br/>
      <li className="list-group-item list-group-item-primary p-1">
        <h3>Batting Stats :</h3>
        <div className="hide-x-scroll" style={{ overflowX: "scroll" }}>
          <table className="table table-striped table-info" border="2" cellPadding="5">
            <thead>
              <tr>
                <th>Match</th>
                <th>Inning</th>
                <th>Run</th>
                <th>Ball</th>
                <th>4</th>
                <th>6</th>
                <th>Strike Rate</th>
                <th>Average</th>
                <th>30s</th>
                <th>50s</th>
                <th>100s</th>
                <th>best</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{p.match}</td>
                <td>{p.inning}</td>
                <td>{p.run}</td>
                <td>{p.ball}</td>
                <td>{p[4]}</td>
                <td>{p[6]}</td>
                <td>{p.srate}</td>
                <td>{p.avg}</td>
                <td>{p[30]}</td>
                <td>{p[50]}</td>
                <td>{p[100]}</td>
                <td>{p.best}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </li>
      <li className="list-group-item list-group-item-primary p-1">
        <h3>Bowling Stats :</h3>
        <div className="hide-x-scroll" style={{ overflowX: "scroll" }}>
          <table className="table table-striped table-info" border="2" cellPadding="5">
            <thead>
              <tr>
                <th>Match</th>
                <th>Inning</th>
                <th>Ball</th>
                <th>Run</th>
                <th>Wicket</th>
                <th>Economy</th>
                <th>Average</th>
                <th>Best(w/r)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{p.match}</td>
                <td>{p.binning}</td>
                <td>{p.bball}</td>
                <td>{p.brun}</td>
                <td>{p.bwicket}</td>
                <td>{p.beconomy}</td>
                <td>{p.bavg}</td>
                <td>{p.bbest}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </li>
    </>
  )
}
