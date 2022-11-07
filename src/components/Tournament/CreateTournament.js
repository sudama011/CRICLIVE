import React, { useState, useRef,useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../InputControl/InputForm.module.css";
import Style from "../InputControl/InputControl.module.css";
import { db } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";
import { UserContext } from "../../context/userContext";

function CreateTournament() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const name = useRef("");
  const startDate = useRef("");
  const endDate = useRef("");
  const prize = useRef("");
  const village = useRef("");
  const city = useRef("");
  const state = useRef("");

  const postData = async () => {
    try {
      const values = {
        name: name.current.value,
        startDate: startDate.current.value,
        endDate: endDate.current.value,
        prize: prize.current.value,
        village: village.current.value,
        city: city.current.value,
        state: state.current.value,
        organiser: user
      }
      await setDoc(doc(db, 'tournaments', values.name), values);

      alert("Tournament Created Successfully");
      navigate("/profile");
    } catch (err) {
      console.log(err)
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
    }
  };

  const handleSubmission = (e) => {
    if (!name.current.value || !startDate.current.value || !endDate.current.value || !prize.current.value || !city.current.value || !state.current.value) {
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
        <h2 className={styles.heading}>Create New Tournament</h2>

        <div className={Style.container}>
          <label>Name</label>
          <input
            label="name"
            type="text"
            ref={name}
            placeholder="Enter Tournament Name"
            autoFocus
            required />
        </div>

        <div className={Style.container}>
          <label>Start Date</label>
          <input
            type="date"
            ref={startDate}
            placeholder="Start Date"
            required />
        </div>

        <div className={Style.container}>
          <label>End Date</label>
          <input
            type="date"
            ref={endDate}
            placeholder="End Date"
            required />
        </div>

        <div className={Style.container}>
          <label>Name</label>
          <input
            type="number"
            ref={prize}
            placeholder="Prize Money"
            required />
        </div>

        <div className={Style.container}>
          <label>Village</label>
          <input
            type="text"
            ref={village}
            placeholder="Village" />
        </div>

        <div className={Style.container}>
          <label>City</label>
          <input
            type="text"
            ref={city}
            placeholder="City"
            required />
        </div>

        <div className={Style.container}>
          <label>State</label>
          <input
            type="text"
            ref={state}
            placeholder="State"
            required />
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

export default CreateTournament;