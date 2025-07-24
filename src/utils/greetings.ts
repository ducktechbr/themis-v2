export const greetings = () => {
  const dataUtc = new Date();
  const offsetBrasilia = -3 * 60;
  const utc = dataUtc.getTime() + dataUtc.getTimezoneOffset() * 60000;
  const dataBrasilia = new Date(utc + offsetBrasilia * 60000);

  const hour = dataBrasilia.getHours();

  let greetings;
  if (hour >= 5 && hour < 12) {
    greetings = "Bom dia";
  } else if (hour >= 12 && hour < 18) {
    greetings = "Boa tarde";
  } else {
    greetings = "Boa noite";
  }

  return greetings;
};
