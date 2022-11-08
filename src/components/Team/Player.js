import React from 'react';

export function Player({ Batting, Bowling }) {

  return (
    <>
      <br />
      <br />
      <ul className='list-group'>
        <li className="list-group-item list-group-item-primary p-1">
          <h3>Batting Stats :</h3>
          <div className="hide-x-scroll" style={{ overflowX: "scroll" }}>
            <table className="table table-striped table-info" border="2">
              <thead>
                <tr>
                  <th>M</th>
                  <th>Inn</th>
                  <th>No</th>
                  <th>Runs</th>
                  <th>Hs</th>
                  <th>Avg</th>
                  <th>BF</th>
                  <th>SR</th>
                  <th>4</th>
                  <th>6</th>
                  <th>50</th>
                  <th>100</th>
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
          </div>
        </li>
        <li className="list-group-item list-group-item-primary p-1">
          <h3>Bowling Stats :</h3>
          <div className="hide-x-scroll" style={{ overflowX: "scroll" }}>
            <table className="table table-striped table-info" border="2">
              <thead>
                <tr>
                  <th>M</th>
                  <th>Inn</th>
                  <th>B</th>
                  <th>Runs</th>
                  <th>Wkts</th>
                  <th>BB</th>
                  <th>Econ</th>
                  <th>Avg</th>
                  <th>5W</th>
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
          </div>
        </li>
      </ul>
    </>
  )
}
