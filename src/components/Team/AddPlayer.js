import React, { useState, useRef, useEffect } from "react";
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

  // set document title
  useEffect(() => {
    document.title = `add player - ${team} Team`;
  }, []);

  const name = useRef("");
  const postData = async () => {
    try {
      const values = {
        name: name.current.value,
        M: 0,
        Batting: {
          Inn: 0,
          No: 0,
          Runs: 0,
          Hs: 0,
          Avg: 0.0,
          BF: 0,
          SR: 0,
          4: 0,
          6: 0,
          50: 0,
          100: 0
        },
        Bowling: {
          Inn: 0,
          B: 0,
          Runs: 0,
          Wkts: 0,
          BB: {
            W: 0,
            R: 0
          },
          Econ: 0,
          Avg: 0,
          5: 0
        }
      }
      await setDoc(doc(db, `tournaments/${tournament}/teams/${team}/players`, values.name), values);

      // alert("Player Added Successfully");
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

