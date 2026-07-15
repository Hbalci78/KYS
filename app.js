const today = document.querySelector('#today');
const search = document.querySelector('#globalSearch');
const rows = [...document.querySelectorAll('.document-row')];
const empty = document.querySelector('#emptyState');
const sidebar = document.querySelector('#sidebar');

today.textContent = new Intl.DateTimeFormat('tr-TR', { day:'2-digit', month:'long', year:'numeric' }).format(new Date());

document.querySelector('#menuButton').addEventListener('click', () => sidebar.classList.toggle('open'));

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('active'));
    link.classList.add('active');
    sidebar.classList.remove('open');
  });
});

search.addEventListener('input', event => {
  const query = event.target.value.toLocaleLowerCase('tr-TR').trim();
  let visible = 0;
  rows.forEach(row => {
    const matches = row.textContent.toLocaleLowerCase('tr-TR').includes(query);
    row.hidden = !matches;
    if (matches) visible += 1;
  });
  empty.hidden = visible !== 0;
});

document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    search.focus();
  }
  if (event.key === 'Escape') {
    search.value = '';
    search.dispatchEvent(new Event('input'));
    search.blur();
  }
});

document.querySelectorAll('.task input').forEach(input => {
  input.addEventListener('change', () => {
    const completed = document.querySelectorAll('.task input:checked').length;
    document.querySelector('.count').textContent = `${4 - completed} görev`;
  });
});
