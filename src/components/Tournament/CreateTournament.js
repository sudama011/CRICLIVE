import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputControl from "../InputControl/InputControl";
import styles from "./Tournament.module.css";

import { db } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";

function CreateTournament(props) {
  let email = props.email.split('@')[0];
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const [values, setValues] = useState({
    name: "",
    startDate: "",
    endDate: "",
    prize: "",
    village: "",
    city: "",
    state: "",
  });



  useEffect(() => {
    setValues({ ...values, organiser: email });
  }, []);

  const postData = async () => {
    try {
      await setDoc(doc(db, 'tournaments', values.name), values);

      alert("Tournament Created Successfully");
      navigate("/profile");
    } catch (err) {
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
      console.log(err)
    }
  };

  const handleSubmission = (e) => {
    e.preventDefault();

    if (!values.name || !values.startDate || !values.endDate || !values.prize || !values.city || !values.state) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    postData();
  };

  console.log(values)
  
  return (
    <div className={styles.container} style={{ overflowX: "scroll" }}>
      <div className={styles.innerBox}>
        <h2 className={styles.heading}>Create New Tournament</h2>

        <InputControl
          label="Name"
          type="text"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
          placeholder="Enter Tournament Name"
        />

        <InputControl
          label="Start Date"
          type="date"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, startDate: event.target.value }))
          }
          placeholder="Start Date"
        />

        <InputControl
          label="End Date"
          type="date"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, endDate: event.target.value }))
          }
          placeholder="End Date"
        />

        <InputControl
          label="Prize"
          type="number"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, prize: event.target.value }))
          }
          placeholder="Prize Money"
        />

        <InputControl
          label="Village"
          type="text"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, village: event.target.value }))
          }
          placeholder="Village"
        />

        <InputControl
          label="City"
          type="text"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, city: event.target.value }))
          }
          placeholder="City"
        />

        <InputControl
          label="State"
          type="text"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, state: event.target.value }))
          }
          placeholder="State"
        />

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