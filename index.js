
    const { log } = require("console")
const fs = require("fs")
7
    const readline = require("readline")
    const path = require("path")

    const fileName = path.join(__dirname,"user.json")
    


    let initialValue = [{
        id:0,
        taskname:"test",
        isCompleted:"false"
    }]
    let setLength = 0;


    const writefun = (data,msg)=>{
         console.log(msg);
        fs.writeFile(fileName,JSON.stringify(data),(err)=>{
                if(err){
                    console.log("Something went Wrong ");
                }else{
                    console.log(`Task has been ${msg} Sucessfully`);
                }
                createTextfile()
               
        })  

    }

    const createTextfile = () =>{
        fs.readFile("user.json",(err,data)=>{
            if(err){
                console.log("erroe",err);
            }
            let JsonData = JSON.parse(data.toString())
            fs.writeFileSync("data.txt","")
            JsonData.forEach((ele,i)=>{
                fs.appendFileSync("data.txt",`${i+1}. ${ele.taskname} ${ele.isCompleted}\n`)
                
            })
        })
    }

    // writefun(initialValue)

    const ReadFileFun = (newTask,msg) =>{
            fs.readFile(fileName,(err,data)=>{
            if(err){
                console.log(("Something went wrong while reading the data"));
            }else{                
                    let newData = JSON.parse(data.toString());
                    newData.push(newTask)
                    writefun(newData,msg)
            }
            })
    }

    // ReadFileFun()

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });


    function showAllTask(){
        fs.readFile(fileName,(err,data)=>{
            if(err){
                console.log("Something went wrong");
            }

           let showdata = JSON.parse(data.toString());
        if(showdata.length > 0){
            showdata.map((ele,i)=>{
                console.log(`${i+1}.Your task name : ${ele.taskname} , Is completed status :${ele.isCompleted}`);
               })
        }else{
            console.log("No task has been added, Kindly add the task ");
        }
           
        })
    }


    function markCompleted(num){
       fs.readFile(fileName,(err,data)=>{
            if(err){
                console.log("error",err);
            }else{
        
                let showdata = JSON.parse(data.toString());
                    if(num <= showdata.length){
                      let ans =   showdata.map((ele,i)=>{
                            if(num == i+1){
                                if(ele.isCompleted == "[✅]"){
                                    console.log("Task is already marked as completed");

                                }else{
                                    ele.isCompleted = "[✅]";
                                }
                               
                               
                            }
                            return ele;
                           
                        })
                        let msg = "Marked as completed"
                        writefun(ans,msg)
                    }else{  
                        console.log("Entered task number is not valid");
                        AddTask()
                    }
                
            }
       })
    }
    

    function deleteTask (num){
            fs.readFile(fileName,(err,data)=>{
                if(err){
                    console.log("Something went wrong while deleting the task");
                }
                let jsonData = JSON.parse(data.toString())
                let ans  = jsonData.filter((ele,i)=>{
                        if(num != i+1){
                            return ele;
                        }
                })

                let msg = "Deleted"

                writefun(ans,msg)
            })
    }

    function AddTask (){
            rl.question("Todo Application \n1.Add Task.\n2.View All Task.\n3.Mark a task as complete.\n4.Delete Task.\n Select any of the above option\n",(ans)=>{
                switch(ans){
                    case"1":
                    rl.question("Enter Your Task Name\n",(taskname)=>{
                            console.log(taskname);
                            rl.question(`Is ${taskname} task is completed type:1 for completed or 0 for not completed\n`,(isCompleted)=>{

                                if(isCompleted == 0 || isCompleted == 1){

                                    if(isCompleted == 0){
                                        let newTask = {
                                            taskname:taskname,
                                            isCompleted:"[🚫]"
                                    }
                                     let msg = "added"
                                    ReadFileFun(newTask,msg)
                                    rl.close()
                                    }
                                    else{
                                        let newTask = {
                                            taskname:taskname,
                                            isCompleted:"[✅]"
                                    }
                                     let msg = "added"
                                    ReadFileFun(newTask,msg)
                                    rl.close()
                                    }
                                   
                                  
                                }
                                else{

                                    console.log("Invalid Option selected Kindly select the correct option");
                                   
                                    AddTask();
                                
                                }
                        })
                    })
                    break;
                    case"2":
                    showAllTask();
                    rl.close()
                    break;

                    case"3":
                    rl.question("Enter the task number which you want to mark as completed\n",(num)=>{
                        markCompleted(num);
                        rl.close()
                    })
                    break;

                    case"4":
                    rl.question("Enter the task number which you want to delete\n",(num)=>{
                        deleteTask(num)
                        rl.close()
                    })
                    break;

                    default:
                        console.log("Please selected the appropriate option");
                    AddTask()

                        
                    
                }
                
            })
        
    }

    AddTask()