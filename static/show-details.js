window.onload = () => {
  const rows = document.querySelectorAll('.base-info');

  rows.forEach((row) => {
    row.addEventListener('click', () => {
      const jaratID = row.getAttribute('data-id');
      fetch(`/api/jaratDetails/${jaratID}`)
        // .then((response) => response.json())
        .then(() => {
          document.getElementById(jaratID).style.display = 'block';
        })
        .catch((error) => {
          console.error('Error fetching jarat info: ', error);
        });
    });
  });
};
