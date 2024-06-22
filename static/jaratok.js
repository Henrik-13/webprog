function checkKiindulopont(kiindulopont, honnan) {
  if (kiindulopont && !honnan.startsWith(kiindulopont)) {
    return false;
  }
  return true;
}

function checkCelpont(celpont, hova) {
  if (celpont && !hova.startsWith(celpont)) {
    return false;
  }
  return true;
}

function checkAr(minAr, maxAr, ar) {
  if (minAr && parseInt(ar, 10) < parseInt(minAr, 10)) {
    return false;
  }
  if (maxAr && parseInt(ar, 10) > parseInt(maxAr, 10)) {
    return false;
  }
  return true;
}

function checkNapok(napok, nap) {
  if (napok !== 'osszes' && nap !== napok) {
    return false;
  }
  return true;
}

function checkVonattipus(vonattipus, tipus) {
  if (vonattipus !== 'osszes' && tipus !== vonattipus) {
    return false;
  }
  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('.jarat-torles');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      // eslint-disable-next-line no-restricted-globals
      const ans = confirm('Biztosan szeretne torolni a jaratot?');
      if (ans) {
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
      }
    });
  });

  const rows = document.querySelectorAll('.base-info');

  const filterJaratok = () => {
    const kiindulopont = document.getElementById('kiindulopont').value.toLowerCase();
    const celpont = document.getElementById('celpont').value.toLowerCase();
    const napok = document.getElementById('napok').value.toLowerCase();
    const minAr = document.getElementById('min_ar').value;
    const maxAr = document.getElementById('max_ar').value;
    const vonattipus = document.getElementById('vonattipus').value.toLowerCase();
    rows.forEach((row) => {
      const honnan = row.children[1].textContent.toLowerCase().trim();
      const hova = row.children[2].textContent.toLowerCase().trim();
      const nap = row.children[3].textContent.toLowerCase().trim();
      const ar = row.nextElementSibling.children[0].textContent.split(': ')[1].trim();
      const tipus = row.nextElementSibling.children[1].textContent.split(': ')[1].toLowerCase().trim();

      const isVisible =
        checkKiindulopont(kiindulopont, honnan) &&
        checkCelpont(celpont, hova) &&
        checkAr(minAr, maxAr, ar) &&
        checkNapok(napok, nap) &&
        checkVonattipus(vonattipus, tipus);

      row.style.display = isVisible ? '' : 'None';
      row.nextElementSibling.style.display = isVisible ? '' : 'none';
    });
  };

  const filterForm = document.getElementById('kereses-form');
  filterForm.addEventListener('input', filterJaratok);
});
