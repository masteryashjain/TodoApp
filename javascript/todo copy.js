//This is a simple command line todo list app
//Features
//-create todo item
//-list todo item
//-check todo item off list
//-delete todo item

const { clear } = require('console');
var fs = require('fs');
const { report } = require('process');


//constants
var TASK_JSON_PATH = "./todo.txt";


function init(){
	//create file if it's present.
	if(!fs.existsSync(TASK_JSON_PATH)){
		console.log("Initialising storage.\n Creating `todo.txt` file");
		setData([]);	
	}
	
}

function getData(){
	//read file contents
	var contents = fs.readFileSync(TASK_JSON_PATH);

	//parse contents
	var data = JSON.parse(contents);

	return data;
}


function setData(data){
	//strigify JSON
	var dataString = JSON.stringify(data);

	//write to  file
	
	fs.writeFileSync(TASK_JSON_PATH,dataString);
}

//display usage
function usage() {
console.log("Usage :-");
	console.log("./todo add \"todo item\"  # Add a new todo");
	console.log("./todo ls               # Show remaining todos");
	console.log("./todo del NUMBER       # Delete a todo");
	console.log("./todo done NUMBER      # Complete a todo");
	console.log("./todo help             # Show usage");
	console.log("./todo report           # Statistics");
}
		


//add task
function add(task) {
	//get data
	var data = getData();

	//add item
	data.push({task:task,completed:false});

	//set data
	setData(data);

	console.log("Added todo:",task+1);
}





//check task
function check(task) {
	//get data
	var data = getData();

	//modify the data (toggle)
	data[task].completed = !data[task].completed;

	//set data
	setData(data);

	console.log("Marked todo #",task+1 +" as done");

}

//delete task
function del(task){
	//get data
	var data = getData();

	//delete item
	data.splice(task,task+1);

	//set data
	setData(data);

	console.log("Deleted todo #",task+1);

	
}

//list all tasks
function list() {
	
	//data
	var data = getData();
	
	if(data.length > 0){
		//print the list. using ANSI colors and formating
		console.log("\x1b[93m\x1b[4mTask list:\x1b[24m");
		data.forEach(function (task,index){
			console.log(index+1+"."," ["+(task.completed ? "\x1b[92m✓\x1b[93m" : " ")+"] ",task.task);
		});
		
	}else{
		console.log("\x1b[91mNo tasks added!!");
	}

}

//generates report
function repo(){

	var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
	
console.log("",utc+" complete :");


}


var command = process.argv[2];
var argument = process.argv[3];

init();

switch(command){
	case "add":
		add(argument);
		break;
	case "done":
		check(argument-1);
		break;
	case "delete":
		del(argument-1);
		break;
	case "help":
		usage();
		break;
	case "repo":
		repo();
		break;
	case "list":
		list();
		break;
	default:
		console.log("\x1b[91mCommand not found!!\x1b[0m");
		usage();
		break;
}