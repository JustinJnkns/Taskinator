//variable to set elements to Document Objects Model
var buttonEl = document.querySelector("#save-task")
var taskToDoEl = document.querySelector("#tasks-to-do");

buttonEl.addEventListener("click",function(){
    //on click, creates LI, assigns it styling through classname, and inserts it into UL
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "this is a new task.";
    taskToDoEl.appendChild(listItemEl);
}
);
