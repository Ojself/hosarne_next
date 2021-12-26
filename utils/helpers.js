const formatDate = (date) => {
  const datePart = date.match(/\d+/g);
  const year = datePart[0].substring(2);
  const month = datePart[1];
  const day = datePart[2];

  return day + "." + month + "." + year;
};

export const formatDates = (d1, d2) => {
  const date1 = formatDate(d1);
  if (!d2) {
    return date1;
  }
  const date2 = formatDate(d2);
  if (date1.slice(-2) === date2.slice(-2)) {
    const from = date1.substring(0, 5);
    const to = date2;
    return `${from} - ${to}`;
  }
  return `${date1} - ${date2}`;
};

export const changeLayOutColors = (theme, noTransition) => {
  const navbar = document.querySelector("#navbar");
  const footer = document.querySelector("#footer");
  const adress = document.querySelector("#adress");
  const body = document.body;
  const allElements = [navbar, footer, adress, body];
  if (allElements.some((el) => el === null)) return;

  const transitionStyles = ["transition", "duration-1000", "ease-in-out"];
  if (noTransition) {
    allElements.forEach((el) => {
      transitionStyles.forEach((t) => {
        el.classList.remove(t);
      });
    });
  } else {
    allElements.forEach((el) => {
      transitionStyles.forEach((t) => {
        el.classList.add(t);
      });
    });
  }

  navbar.style.backgroundColor = theme;
  footer.style.backgroundColor = theme;
  body.style.backgroundColor = theme;
};
