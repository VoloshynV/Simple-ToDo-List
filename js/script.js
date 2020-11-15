const ulEl = document.querySelector('ul'),
    liEl = document.querySelector('li'),
    form = document.querySelector('form'),
    inputEl = form.querySelector('input');
let todos = [];

showOnPage();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (inputEl.value.trim() !== '') {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.innerHTML = '&times;';
        li.textContent = inputEl.value;
        li.append(span);
        ulEl.append(li);
        inputEl.value = '';
        addToLS();
    }
});

function addToLS() {
    const lis = document.querySelectorAll('li');
    todos = [];
    lis.forEach((li) => {
        const done = li.classList.contains('done');
        const valueLi = li.firstChild.textContent;
        todos.push({ value: valueLi, done: done });
    });
    window.localStorage.setItem('todos', JSON.stringify(todos));
}

function showOnPage() {
    const todos = JSON.parse(window.localStorage.getItem('todos'));
    if (todos) {
        todos.forEach(({ value, done }, i) => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.innerHTML = '&times;';
            li.textContent = value;
            li.append(span);
            if (done) {
                li.classList.add('done');
            }
            ulEl.append(li);
        });
    }
}

document.querySelector('ul').addEventListener('click', (e) => {
    switch (e.target.tagName) {
        case 'SPAN':
            if (confirm('Are you sure you want to delete?')) {
                e.preventDefault();
                e.target.parentElement.remove();
                addToLS();
            }
            break;
        case 'LI':
            e.target.classList.toggle('done');
            addToLS();
            break;
        default:
            break;
    }
});
