window.onload = () => {
  const deleteButtons = document.querySelectorAll('.jarat-torles');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const row = button.closest('tr');
      const jaratID = row.getAttribute('data-id');
      try {
        const response = await fetch(`/api/${jaratID}`, { method: 'DELETE' });
        if (response.ok) {
          row.remove();
          alert('Jarat sikeresen torolve');
        } else {
          alert('Hiba a jarat torlesekor');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hiba a jarat torlesekor');
      }
    });
  });

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
