import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interview: {},
  });

  function updateSpots(state, appointments) {
    let appointment;
    const currentDay = state.days.find((day, index) => {
      if (state.day === day.name) {
        appointment = index;
        return day;
      }
      return null;
    });

    let spots = 0;
    for (let dayOne of currentDay.appointments) {
      if (appointments[dayOne].interview === null) {
        spots++;
      }
    }

    const days = [...state.days];
    days[appointment] = { ...currentDay, spots: spots };
    return days;
  }

  // bookinterview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      const spotUpdate = updateSpots(state, appointments);
      setState({
        ...state,
        days: spotUpdate,
        appointments,
      });
    });
  }

  // cancekinterview
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const spotUpdate = updateSpots(state, appointments);
      setState({
        ...state,
        days: spotUpdate,
        appointments,
      });
    });
  }

  //set Day
  const setDay = (day) => setState({ ...state, day });

  //useEffect
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
