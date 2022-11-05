import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Tournament.module.css";
import Style from "../InputControl/InputControl.module.css";
import { db } from '../../firebase';
import { doc, setDoc} from "firebase/firestore";

export default function AddTeam() {
  const { tournament} = useParams();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const name = useRef("");
  
  const postData = async () => {
    try {
      const values = {
        name: name.current.value,
        match: 0,
        win: 0,
        loss: 0,
        draw: 0,
        point: 0,
      }
      await setDoc(doc(db, `tournaments/${tournament}/teams`, values.name), values);

      alert("Team Added Successfully");
      navigate(`/tournament/${tournament}`);
    } catch (err) {
      console.log(err)
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
    }
  };

  const handleSubmission = (e) => {
    if (!name) {
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
        <h2 className={styles.heading}>Add New Team</h2>

        <div className={Style.container}>
          <label>Name</label>
          <input
            label="Team name"
            type="text"
            ref={name}
            placeholder="Enter Team Name" />
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

