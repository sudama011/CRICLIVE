import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../InputControl/InputForm.module.css";
import Style from "../InputControl/InputControl.module.css";
import { db } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";

export default function AddPlayer() {
  const { tournament, team } = useParams();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const name = useRef("");

  const postData = async () => {
    try {
      const values = {
        name: name.current.value,
        match: 0,
        inning: 0,
        run: 0,
        ball: 0,
        4: 0,
        6: 0,
        30: 0,
        50: 0,
        100: 0,
        avg: 0,
        srate: 0,
        best: 0,

        binning: 0,
        brun: 0,
        bball: 0,
        bbest: 0,
        wicket: 0,
        beconomy: 0,
        bavg: 0
      }
      await setDoc(doc(db, `tournaments/${tournament}/teams/${team}/players`, values.name), values);

      alert("Player Added Successfully");
      navigate(`/tournament/${tournament}/${team}`);
    } catch (err) {
      console.log(err)
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
    }
  };

  const handleSubmission = (e) => {
    if (!name.current.value) {
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
        <h2 className={styles.heading}>Add New Player</h2>

        <div className={Style.container}>
          <label>Name</label>
          <input
            label="Team name"
            type="text"
            ref={name}
            placeholder="Enter Player Name"
            autoFocus
          />
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

