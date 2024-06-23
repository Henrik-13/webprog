document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('.foglalas-torles');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const ans = window.confirm('Biztosan szeretne torolni a foglalast?');
      if (ans) {
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
      }
    });
  });
});
