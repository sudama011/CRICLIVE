import React, { useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "../InputControl/InputForm.module.css";
import Style from "../InputControl/InputControl.module.css";
import { db } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";

export default function ScheduleMatch() {
  const location = useLocation();
  const teams = location.state.teams;

  const selectTeam = teams.map((team, index) => (
    <option key={index} value={team.name}>{team.name}</option>
  ));

  const { tournament } = useParams();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const id = useRef("");
  const team1 = useRef("");
  const team2 = useRef("");
  const date = useRef("");
  const time = useRef("");

  const postData = async () => {
    try {
      const values = {
        id: id.current.value,
        team1: team1.current.value,
        team2: team2.current.value,
        date: date.current.value,
        time: time.current.value,
        winner: '-'
      }
      await setDoc(doc(db, `tournaments/${tournament}/matches`, values.id), values);

      alert("Match Scheduled Successfully");
      navigate(`/tournament/${tournament}`);

    } catch (err) {
      console.log(err)
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
    }
  };

  const handleSubmission = (e) => {
    if (team1.current.value === team2.current.value) {
      setErrorMsg("team1 cannot be equal to team2.");
      return;
    }
    if (!id.current.value || !team1.current.value || !team2.current.value || !date.current.value || !time.current.value) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    postData();
  };

  return (
    <div className={styles.container} style={{ overflowX: "scroll" }}>
      <div className={styles.innerBox}>
        <h2 className={styles.heading}>Schedule Match</h2>

        <div className={Style.container}>
          <label>ID</label>
          <input
            type="number"
            ref={id}
            placeholder="Enter Match id"
            autoFocus
          />

        </div>

        <div className={Style.container}>
          <label>Team1</label>
          <select ref={team1}>{selectTeam}</select>
        </div>

        <div className={Style.container}>
          <label>Team2</label>
          <select ref={team2}>{selectTeam}</select>
        </div>

        <div className={Style.container}>
          <label>Date</label>
          <input
            type="date"
            ref={date}
            placeholder="Date" />
        </div>

        <div className={Style.container}>
          <label>Time</label>
          <input
            type="time"
            ref={time}
            placeholder="Start Time" />
        </div>
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Submit
          </button>
        </div>

      </div>
    </div>
  );
}

