function keyPress(e){
	if (window.event) { e = window.event; }
    if (e.keyCode == 13){document.getElementById('submit').click();}
}

var app = {};
app.indexedDB = {};

app.indexedDB.db = null;

app.indexedDB.open = function() {
	var request = webkitIndexedDB.open("list", "db description.");
	
	request.onsuccess = function(e) {
		var v = "1.0";
		app.indexedDB.db = e.target.result;
		var db = app.indexedDB.db;
		
		if(v!=db.version) {
			var setVrequest = db.setVersion(v);
			
			setVrequest.onfailure = app.indexedDB.onerror;
			setVrequest.onsuccess = function(e) {
				var store = db.createObjectStore("todo", {keyPath: "timeStamp"});
				
				app.indexedDB.getAllTodoItems();
			};
		}
		app.indexedDB.getAllTodoItems();
	};
	request.onfailure = app.indexedDB.onerror;
}

app.indexedDB.addTodo = function(todoText) {
	var db = app.indexedDB.db;
	var trans = db.transaction(["todo"], webkitIDBTransaction.READ_WRITE, 0);
	var store = trans.objectStore("todo");
	var request = store.put({
		"text": todoText,
		"timeStamp" : new Date().getTime()
	});
	
	request.onsuccess = function(e) {
		app.indexedDB.getAllTodoItems();
	};
	
	request.onerror = function(e) {
		console.log("Add Error: ", e.value);
	};
};

app.indexedDB.getAllTodoItems = function() {
	var todos = document.getElementById("todoItems");
	todos.innerHTML = "";
	
	var db = app.indexedDB.db;
	var trans = db.transaction(["todo"], webkitIDBTransaction.READ_WRITE, 0);
	var store = trans.objectStore("todo");
	
	var keyRange = webkitIDBKeyRange.lowerBound(0);
	var cursorRequest = store.openCursor(keyRange);
	
	cursorRequest.onsuccess = function(e) {
		var result = e.target.result;
		if(!!result == false)
			return;
			
		renderTodo(result.value);
		result.continue();
	};
	
	cursorRequest.onerror = app.indexedDB.onerror;
};

function renderTodo(row) {
	var todos = document.getElementById("todoItems");
	var li = document.createElement("li");
	var a = document.createElement("a");
	var t = document.createTextNode(row.text);
	t.data = row.text;
	
	a.addEventListener("click", function() {
		app.indexedDB.deleteTodo(row.timeStamp);
	}, false);
	
	a.textContent = "[x] ";
	
	li.appendChild(a);
	li.appendChild(t);
	todos.appendChild(li);
}

app.indexedDB.deleteTodo = function(id) {
	var db = app.indexedDB.db;
	var trans = db.transaction(["todo"], webkitIDBTransaction.READ_WRITE, 0);
	var store = trans.objectStore("todo");
	
	var request = store.delete(id);
	
	request.onsuccess = function(e) {
    	app.indexedDB.getAllTodoItems();  // Refresh the screen
  	};

  	request.onerror = function(e) {
    	console.log("Delete Error: ", e);
  	};
};

function addTodo(){
	var todo = document.getElementById('todo');
	app.indexedDB.addTodo(todo.value);
	todo.value = '';
}

function init(){
	app.indexedDB.open();
}

window.addEventListener("DOMContentLoaded", init(), false);