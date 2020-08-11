/* eslint-disable no-debugger, no-console, no-unused-vars */

let todos = [];
let filter = '';
let num_pt=0;
let num_dt=0;

todos = JSON.parse(localStorage.getItem('todos'));
if(todos===undefined||todos===null) todos = [];

const addTodo = function(task){
    todos.push({task:task,status:false});
}

const pushTodo = function(){

    let todosJSON = JSON.stringify(todos);
    localStorage.setItem('todos',todosJSON);

    num_pt=0;
    num_dt=0;

    todos.forEach(function (item,ind){
        const cb = document.querySelector('#content_box');
        if(item.status === false && item.task.toLowerCase().includes(filter.toLowerCase())){

            num_pt++;
            const dv = document.createElement('div');
            dv.className = 'todo_element';

            const h4 = document.createElement('h4');
            h4.textContent = item.task;
            h4.style.display = 'inline-block';
            h4.style.color = 'white';

            const bt = document.createElement('button');
            bt.textContent = 'X'
            bt.style.margin = '5px';
            bt.addEventListener('click',function(){
                todos[ind].status = true;
                updateScreen();
            });

            dv.appendChild(bt);
            dv.appendChild(h4);

            cb.appendChild(dv);
        }
    });
    todos.forEach(function (item,ind){
        const cb = document.querySelector('#done_box');
        if(item.status === true && item.task.toLowerCase().includes(filter.toLowerCase())){
            num_dt++;
            const dv = document.createElement('div');
            dv.className = 'done_element';

            const h4 = document.createElement('h4');
            h4.textContent = item.task;
            h4.style.display = 'inline-block';
            h4.style.textDecoration = 'line-through';

            const bt = document.createElement('button');
            bt.textContent = '↑'
            bt.style.margin = '5px';
            bt.addEventListener('click',function(){
                todos[ind].status = false;
                updateScreen();
            });

            dv.appendChild(bt);
            dv.appendChild(h4);

            cb.appendChild(dv);
        }
    });
}

const getLeftTaskNumber = function(){
    let retv = 0;
    todos.forEach(function (item){
        if(item.status === false)
            retv ++;
    });
    return retv;
}

const updateScreen = function(){
    document.querySelector('#content_box').innerHTML = '';
    document.querySelector('#done_box').innerHTML = '';
    pushTodo();
    document.getElementById('pending_tasks').textContent =
        `PENDING TASKS = ${num_pt}`;
    document.getElementById('finished_tasks').textContent =
        `FINISHED TASKS = ${num_dt}`;
    document.getElementById('heading').innerHTML =
        'TODO&nbsp;&nbsp;&nbsp;'+`${num_dt}/${num_pt+num_dt}`;
}

document.getElementById('input_box').addEventListener('submit',function(e){
    e.preventDefault();
    let box = e.target.task;
    if(box.value==='') return;
    addTodo(box.value);
    updateScreen();
    box.value = '';
});

document.getElementById('clear_all_button').addEventListener('click',function(e){
    todos.splice(0,todos.length); 
    updateScreen();
});

document.getElementById('clear_done').addEventListener('click',function(e){
    todos = todos.filter(function(item,ind){
        return item.status===false;
    });
    updateScreen();
});

document.getElementById('clear_content').addEventListener('click',function(e){
    todos.forEach(function(item,ind){
        item.status=true;
    });
    updateScreen();
});

document.getElementById('search_box').addEventListener('input',function(e){
    filter = e.target.value;
    updateScreen();
});

updateScreen();
