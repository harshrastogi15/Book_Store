export const callMessage = (alert, message) => {
  document.getElementById('MessageDisappear').style.display = 'block';
  document.getElementById('MessageShowCase').innerHTML = `<span>${alert}!</span> ${message}</p>`;
  setTimeout(() => {
    document.getElementById('MessageDisappear').style.display = 'none';
  }, 4000);
};
