//variable to set elements to Document Objects Model
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;




var taskFormHandler = function(event) {
    event.preventDefault();
    //pulls user input values for task name and type from drop down menu through .value selector
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // package data as object
    var taskDataObj = {
        name:taskNameInput,
        type:taskTypeInput
    }
    //checks for user input in both boxes if none then return false and dont create task !
    if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
}
    formEl.reset();
    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
    };

  var createTaskEl = function(taskDataObj) {
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    //add task id as custom atrribute
    listItemEl.setAttribute('data-task-id', taskIdCounter);
    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name (for css styling)
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class ='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>"+ taskDataObj.type + "</span";
    listItemEl.appendChild(taskInfoEl);
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl)
    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    //increase task counter for next unique id
    taskIdCounter++;
    };
//add edit and delete button to tasks
var createTaskActions = function(taskId){
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions"

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id",taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button
   var deleteButtonEl = document.createElement("button");
   deleteButtonEl.textContent = "delete";
   deleteButtonEl.className = "btn delete-btn";
   deleteButtonEl.setAttribute("data-task-id", taskId);

   actionContainerEl.appendChild(deleteButtonEl);

   var StatusSelectEl =  document.createElement("select");
   StatusSelectEl.className = "select-status";
   StatusSelectEl.setAttribute("name", "status-changed");

   actionContainerEl.appendChild(StatusSelectEl);

   var statusChoices =["To Do", "In Progress", "Completed"]

   for (var i = 0; i < statusChoices.length; i ++){
       //create option element
       var statusOptionEl = document.createElement("options");
       statusOptionEl.textContent = statusChoices[i];
       statusOptionEl.setAttribute("value",statusChoices[i]);

       StatusSelectEl.appendChild(statusOptionEl)
   }

   return actionContainerEl;
}

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']")
    taskSelected.remove();
  };

  var editTask = function(taskId){
      var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']")
      //get content from task name and type 
      var taskName = taskSelected.querySelector("h3.task-name").textContent
      var taskType = taskSelected.querySelector("span.task-type").textContent
      document.querySelector("input[name='task-name']").value = taskName;
      document.querySelector("select[name='task-type']").value = taskType;
      document.querySelector("#save-task").textContent = "Save Task";
      formEl.setAttribute("data-task-id", taskId);
  }


formEl.addEventListener("submit", taskFormHandler);


var taskButtonHandler = function(event){
    //get target element from event
    var targetEl = event.target;
    if (targetEl.matches(".edit-btn")){
        var taskId = targetEl.getAttribute("data-task-id")
        editTask(taskId);   
    }
    //delete button was clicked
    else if (targetEl.matches(".delete-btn")){
        var taskId = targetEl.getAttribute('data-task-id')
        deleteTask(taskId)
    }    
}
pageContentEl.addEventListener("click", taskButtonHandler);
