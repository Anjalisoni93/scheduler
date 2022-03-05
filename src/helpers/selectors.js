export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(currentDay => currentDay.name === day);
  console.log(filteredDays);
  if (filteredDays.length === 0) {
    return [];
  }
  else {
     return filteredDays[0].appointments.map((id) => state.appointments[id])
  }
}