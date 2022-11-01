import React, { useState } from "react";
import {useNavigate } from "react-router-dom";

import InputControl from "../InputControl/InputControl";

import styles from "./Tournament.module.css";

function CreateTournament(props) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    startDate: "",
    endDate: "",
    prize: "",
    village: "",
    city: "",
    state: "",
  });
  
  const postData = async (e) => {
    const url = 'https://criclive-b357f-default-rtdb.firebaseio.com/' + props.email.split('@')[0] + '.json' 
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });
    return res;
  };
  
  
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);


  const handleSubmission = (e) => {
    e.preventDefault();

    if (!values.name || !values.startDate || !values.endDate || !values.prize || !values.city || !values.state) {
      setErrorMsg("Fill all fields");
      return;
    }

    setErrorMsg("");

    setSubmitButtonDisabled(true);
    
    postData()
      .then(async (res) => {
        alert("Tournament Created Successfully");
        navigate("/profile");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };



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