window.addEventListener("load", function () {
  const timeElem = document.getElementById("next-match-time");
  const localTimeElem = document.getElementById("local-time-string");
  const utcString = timeElem.getAttribute("datetime");

  const localeString = new Date(utcString).toLocaleString();

  localTimeElem.innerText = localeString + " (your local time)";
});
