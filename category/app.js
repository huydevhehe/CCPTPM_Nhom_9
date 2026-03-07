const STORAGE_KEY = 'categories_v1';

function readCategories(){
  try{
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }catch(e){
    return [];
  }
}

function saveCategories(list){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function uid(){return Date.now().toString(36) + Math.random().toString(36).slice(2,7)}

const listEl = document.getElementById('list');
const form = document.getElementById('addForm');
const nameInput = document.getElementById('nameInput');

function render(){
  const cats = readCategories();
  listEl.innerHTML = '';
  if(cats.length === 0){
    listEl.innerHTML = '<li class="empty">Chưa có danh mục nào.</li>';
    return;
  }
  cats.forEach(cat => {
    const li = document.createElement('li');
    const label = document.createElement('div');
    label.className = 'item-label';
    label.textContent = cat.name;

    const btns = document.createElement('div');
    btns.className = 'btns';

    const edit = document.createElement('button');
    edit.className = 'btn edit';
    edit.textContent = 'Sửa';
    edit.addEventListener('click', ()=> onEdit(cat.id));

    const del = document.createElement('button');
    del.className = 'btn delete';
    del.textContent = 'Xóa';
    del.addEventListener('click', ()=> onDelete(cat.id));

    btns.appendChild(edit);
    btns.appendChild(del);

    li.appendChild(label);
    li.appendChild(btns);
    listEl.appendChild(li);
  })
}

function onAdd(name){
  const trimmed = name.trim();
  if(!trimmed) return;
  const cats = readCategories();
  cats.push({id: uid(), name: trimmed});
  saveCategories(cats);
  render();
}

function onEdit(id){
  const cats = readCategories();
  const idx = cats.findIndex(c => c.id === id);
  if(idx === -1) return;
  const newName = prompt('Sửa tên danh mục:', cats[idx].name);
  if(newName === null) return; // hủy
  cats[idx].name = newName.trim() || cats[idx].name;
  saveCategories(cats);
  render();
}

function onDelete(id){
  if(!confirm('Xác nhận xóa danh mục?')) return;
  const cats = readCategories().filter(c=> c.id !== id);
  saveCategories(cats);
  render();
}

form.addEventListener('submit', e=>{
  e.preventDefault();
  onAdd(nameInput.value);
  nameInput.value='';
  nameInput.focus();
});

// init
render();
