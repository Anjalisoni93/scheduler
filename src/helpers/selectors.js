export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(currentDay => currentDay.name === day);
  if (filteredDays.length === 0) {
    return [];
  }
  else {
     return filteredDays[0].appointments.map((id) => state.appointments[id])
  }
}

export function getInterview (state, interview) {
  if (interview) {
    let idInterviewer = interview.interviewer;
    let student = interview.student;

    return {
      student,
      interviewer: state.interviewers[idInterviewer]
    }
  }

  return null;
}