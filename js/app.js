const main = (document => {
  function createsElement(tag, props, ...children) {
    const element = document.createElement(tag);

    Object.keys(props).forEach(key => element[key] = props[key]);

    if (children.length > 0) {

      children.forEach(child => {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }
        element.appendChild(child);
      });
    }

    return element;
  }

  function createTodoItem(title) {

    const checkBox = createsElement('input', {
      type: "checkbox",
      className: "checkbox"
    });

    const label = createsElement('label', {
      className: 'title'
    }, title);

    const editInput = createsElement('input', {
      type: 'text',
      className: 'textfield'
    });

    const editButton = createsElement('button', {
      className: 'edit'
    }, 'Изменить');

    const delButton = createsElement('button', {
      className: 'delete'
    }, 'Удалить');

    const listItem = createsElement('li', {
      className: 'todo-item'
    }, checkBox, label, editInput, editButton, delButton);

    bindEvent(listItem);

    return listItem;
  }

  function bindEvent(todoItem) {

    const checkBox = todoItem.querySelector('.checkbox');
    const editBtn = todoItem.querySelector('.edit');
    const delBtn = todoItem.querySelector('.delete');

    checkBox.addEventListener('change', toggleTodoItem);
    editBtn.addEventListener('click', editTodoItem);
    delBtn.addEventListener('click', delTodoItem);
  }

  function addTodoItem(event) {
    event.preventDefault();

    if (addInput.value === '') return alert('Необходимо ввести задачу!');

    const todoItem = createTodoItem(addInput.value);
    todoList.appendChild(todoItem);
    addInput.value = '';

  }

  function toggleTodoItem() {
    const li = this.parentNode;
    li.classList.toggle('completed');

  }

  function editTodoItem() {
    const li = this.parentNode;
    const title = li.querySelector('.title');
    const editInput = li.querySelector('.textfield');
    const isEditing = li.classList.contains('editing');

    if (isEditing) {
      title.innerText = editInput.value;
      this.innerText = 'Изменить';
    } else {

      editInput.value = this.innerText;
      this.innerText = 'Сохранить';
    }

    li.classList.toggle('editing');
  }

  function delTodoItem() {
    const li = this.parentNode;;
    todoList.removeChild(li);
  }

  const todoForm = document.getElementById('todo-form');
  const addInput = document.getElementById('add-input');
  const todoList = document.getElementById('todo-list');
  const todoItems = document.querySelectorAll('todo-item');

  function init() {
    todoForm.addEventListener('submit', addTodoItem);
    todoItems.forEach(item => bindEvent(item));
  }

  return init;

})(document);

main();

