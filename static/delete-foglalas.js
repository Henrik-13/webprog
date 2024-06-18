window.onload = () => {
  const deleteButtons = document.querySelectorAll('.foglalas-torles');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      // const ans = confirm('Biztosan szeretne torolni a jaratot?');
      const row = button.closest('tr');
      const foglalasID = row.getAttribute('data-foglalas-id');
      try {
        const response = await fetch(`/api/foglalas/${foglalasID}`, { method: 'DELETE' });
        if (response.ok) {
          row.remove();
          alert('Foglalas sikeresen torolve');
        } else {
          alert('Hiba a foglalas torlesekor');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hiba a foglalas torlesekor');
      }
    });
  });
};
