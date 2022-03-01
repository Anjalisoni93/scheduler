import React from "react";
import "./styles.scss";

export default function Appointment(props) {

  return (
    <article className="appointment">
      {
        props.time && <h4>Appointment at {props.time}</h4>
      }
      {
        !props.time && <h4>No Appointment</h4>
      }
    </article> 
  );
}