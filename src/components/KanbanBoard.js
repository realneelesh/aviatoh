import React, { useEffect, useState } from 'react';
import { primaryBlueColour, primaryGreenColour, primarySilverColour } from '../App';
import StickyNote from './StickyNote';
import { getDocument, kanbanBoardsCollection, updateOrCreateDocument, usersCollection } from '../db';

function KanbanBoard(props) {

    const headingStype = {border: '0px', marginTop: '6px', display: 'block', border: '0px solid silver', color: 'grey'};
    const [ addNewTask, setAddNewTask ] = useState(false);
    const [ updateUserFlag, setUpdateUserFlag ] = useState(false);
    const [ user, setUser ] = useState(props.user);
    const [ updateTasks, setUpdateTasks ] = useState(false);
    const [ taskBeingDropped, setTitleBeingDropped ] = useState(null);
    const [ tasks, setTasks ] = useState(
        []
    );

    useEffect(()=>{
        if(props.email && props.projecttitle){
                getDocument(kanbanBoardsCollection, props.email+props.projecttitle).then(res => {
                    setTasks(res.data()?.data?.sort((x,y) => y.priority-x.priority));
                    setUpdateTasks(false);
                })
        }
    }, [props.email, props.projecttitle, updateUserFlag]);

      function allowDrop(e) {
            e.preventDefault();
      }

      function drop(e) {
        e.preventDefault();
        setTitleBeingDropped(null);
        setUpdateTasks(true);
        let droppedOn = e.target.querySelector(`span`).innerHTML.replaceAll(' ', '').trim().toLowerCase();
        switch(droppedOn){
            case "todo":
                setTasks(tasks.map(task => {
                    if(task.title === taskBeingDropped){
                        return {
                            ...task,
                            status: -1
                        }
                    } else {
                        return task
                    }
                }));
                break;
            case 'inprogress':
                setTasks(tasks.map(task => {
                    if(task.title === taskBeingDropped){
                        return {
                            ...task,
                            status: 0
                        }
                    } else {
                        return task
                    }
                }));
                break;
            case 'completed':
                setTasks(tasks.map(task => {
                    if(task.title === taskBeingDropped){
                        return {
                            ...task,
                            status: 1
                        }
                    } else {
                        return task
                    }
                }));
                break;
            case '.':
                setTasks(tasks.filter(task => task.title !== taskBeingDropped));
                break;
            default:
                alert('');
                break;
        }
    }
      

    const updateKanbanBoardWithATask = (task)=>{
        if(task.title.trim === ''){
            alert('Task title can not be empty');
        } else {
            if(tasks.map(x=>x.title).find(x=>x==task.title)){
                alert('Task with this title already exists');
            } else {
                if(props.email && props.projecttitle){
                    // update of create the kanbanboard in kanbanboards collection
                    updateOrCreateDocument(kanbanBoardsCollection, props.email + props.projecttitle, {
                        data: [...tasks, task]
                    }).then(res => {
                        setUpdateUserFlag(!updateUserFlag);
                        setAddNewTask(false);
                         document.getElementById('tasktitle').value = '';
                         document.getElementById('prioritylevel').value = '-1';
                         document.getElementById('taskdescription').value = '';
                    })
                }
            }
        }
    }

    useEffect(()=>{ 
        if(updateTasks){
            updateOrCreateDocument(kanbanBoardsCollection, props.email + props.projecttitle, {
                data: tasks
            }).then(res => {
                setUpdateUserFlag(!updateUserFlag);
            }).catch(err=>{
                alert(err);
                window.location.reload();
            })
        }
    }, [tasks, updateTasks]);

    return (
        <>   
        {/* <div align="left"> 
        <span align="left" style={{display: 'inline-block', width: '100vw', border: '0px solid silver', display: 'flex', justifyContent: 'flex-start', position: 'sticky', top: '0px', borderRadius: '0px', marginBottom: '1px', alignItems: 'flex-end'}}>
        <span style={{width: '0%'}}>
            
        </span>
        <span style={{}}>
         
            Kanban Productivity Board 
    &nbsp; 
           </span>

   
            
            </span> 
 
 
 </div>    */}
        <div style={{
            margin: '0px 19px',
            backgroundColor: 'transparent',
            minHeight: '70vh',
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '0px',
            background: `linear-gradient(${'white'}, white)`,
            borderTop: '2px solid ' + primarySilverColour
        }}>
            <div style={{ position: 'relative', width: '10%', backgroundColor: '', borderRight: '0px solid ' + primarySilverColour, display: 'flex', paddingTop: '0px', justifyContent: 'flex-start', flexDirection: 'column'}} align="center">
                <div>
                <button
                style={{ borderRadius: '0px', color: 'white', fontSize: '16px', backgroundColor: primaryBlueColour, margin: '0px', width: '100%'}}
                    onClick={()=>{
                        setAddNewTask(true);
                        setTimeout(()=>{
                            
                        }, 300);
                    }}
                    > 
                    <i className='fas fa-plus'></i> 
                    &nbsp;
                        Add a task 
                </button>
                </div>
<br/>
<br/>
<div title="Drop a card here to delete" style={{ position: 'fixed', bottom: '0px', zIndex: '999', width: '10%', padding: '15px 1px'}} align="left">
                <i
                onClick={(e)=>{
                  e.preventDefault();
                  //deleteDocumentationBlock(path.title);
                }}
                onDragOver={allowDrop}
                onDrop={drop}
                    style={{ color: "silver", fontSize: '35px' }} 
                    className="fa fa-trash"
                    ><span style={{color: 'white'}}>.</span></i> 
            </div>
                    
                
            </div>
            <div style={{width: '89%', display: 'flex', border: '0px solid black',
            justifyContent: 'space-between',}}>
            <div style={{
                width: '33%',
                zIndex: taskBeingDropped ? '9999' : '999',
                borderRight: '0px solid ' + primarySilverColour,
            }}
            onDrop={drop} onDragOver={allowDrop}
            align="center"
            > <br/> 
               <h2 style={{...headingStype, position: 'relative', display: 'inline-block'}}> 📌  <span>To Do</span></h2>
                 <br/>
                <br/>
                {/* <div style={{width: '90%'}}>
                <StickyNote title="Write " color="yellow" priorityLevel='0' text="this is test this is test this is test this is test this is test this is test this is test this is test "/>
                </div> */}
                {
                    tasks?.map(task => {
                        if(task.status == '-1'){
                            return <div style={{width: '85%', visibility: taskBeingDropped && task.title !== taskBeingDropped ? 'hidden' : ''}}>
                                    <StickyNote setBeingDropped={setTitleBeingDropped} updateTask={updateKanbanBoardWithATask} title={task.title} priorityLevel={task.priority} description={task.description}/>
                                </div>
                        }
                    })
                }
            </div>

            <div style={{
                width: '33%',

                borderRight: '0px solid ' + primarySilverColour,
                backgroundColor: primarySilverColour
            }}
            align="center"

            onDrop={drop} onDragOver={allowDrop}
 
            >
                <br/>
                <h2 style={{...headingStype, display: 'inline-block'}}> <span>In Progress</span></h2>
                <br/>
                <br/>
                {
                    tasks?.map(task => {
                        if(task.status == '0'){
                            return <div style={{width: '85%', visibility: taskBeingDropped && task.title !== taskBeingDropped ? 'hidden' : ''}}>
                            <StickyNote setBeingDropped={setTitleBeingDropped} updateTask={updateKanbanBoardWithATask} title={task.title} priorityLevel={task.priority} description={task.description}/>
                        </div>
                        }
                    })
                }
            </div>

            <div style={{
                width: '33%',

            }}
            onDrop={drop} onDragOver={allowDrop}
            align="center"
            >
                <br/>
                <h2 style={{...headingStype, display: 'inline-block'}}> <span>Completed</span></h2>
                <br/>
                <br/>
                {
                    tasks?.map(task => {
                        if(task.status == '1'){
                            return <div style={{width: '85%', visibility: taskBeingDropped && task.title !== taskBeingDropped ? 'hidden' : ''}}>
                            <StickyNote setBeingDropped={setTitleBeingDropped} updateTask={updateKanbanBoardWithATask} title={task.title} priorityLevel={task.priority} description={task.description}/>
                        </div>
                        }
                    })
                }
            </div>





            {/* add task modal */} 
            <div
                    style={{
                    display: addNewTask ? "flex" : "none",
                    right: true ? "0px" : "-101vw",
                    transition: 'right 0.7s',
                    justifyContent: 'center',
                    backgroundColor: "rgb(240, 240, 240, 0.7)",
                    position: "fixed",
                    bottom: "0px",
                    width: "100vw",
                    height: '100vh',
                    marginLeft: '-8px',
                    zIndex: "9999",
                    alignItems: 'center',
                    flexDirection: 'column'
                    }}
                    align="center"
                >
                
                
                <div style={{backgroundColor: 'white', width: '50%', borderRadius: '0px', boxShadow: "rgba(0, 0, 0, 0.1) 10px 10px 10px", padding: '40px 0px', position: 'relative', height: ''}}>
                <i
                    onClick={() => {
                        setAddNewTask(false);
                    }}
                    style={{
                        position: "absolute",
                        right: "15px",
                        cursor: "pointer",
                        top: "15px",
                        fontSize: "18px",
                    }}
                    className="fas fa-times-circle"
                    ></i>

                <div style={{position: 'absolute', width: '15%', height: '100%', top: '0px', backgroundColor: primaryBlueColour}}>

                    {/*  */}
                </div>


                
                <div style={{display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'flex-start'}}>
                    
            
                    <div style={{width: '100%', fontSize: '17px', color: 'grey'}} align="left">
                  
                    </div>
                    <input
                    id="tasktitle"
                    style={{
                        border: "0px",
                        marginTop: '18px',
                        fontSize: "16px",
                        borderBottom: '1px solid silver',
                        cursor: 'text'
                    }}
                    onChange={(e) => {
                    }}
                    placeholder="Task title"
                    />
                    
                    <br/> 
                    <br/>  
                    <div style={{width: '100%', fontSize: '17px', color: 'grey'}} align="left">
                    
                    <select id="prioritylevel">
                        <option value="-1">Priority Level</option>
                        <option value="1">High</option>
                        <option value="0">Medium</option>
                        <option value="-1">Low</option>
                    </select>
                    </div>
                    <br/>  
                    <br/>  
                    <br/>  
                    
                  <textarea
                  id="taskdescription"
                  style={{
                    cursor: 'text'
                  }}
                  rows={4}
                  onChange={(e) => {
                  }}
                  placeholder="Task description"
                  />

                  <br/>
                  <br/>
                  <br/>

                    <button
                    style={{
                        backgroundColor: primaryBlueColour,
                        color: "white",
                        fontSize: "15px",
                        margin: '0px'
                    }}
                    onClick={() => {
                        var task = {
                            title: document.getElementById('tasktitle').value,
                            status: "-1",
                            priority: document.getElementById('prioritylevel').value,
                            description: document.getElementById('taskdescription').value
                        }

                        updateKanbanBoardWithATask(task);
                    }}
                    >
                    Add Task
                    </button>
                    </div>
                </div>
                <br/><br/>
                <br/><br/>
                </div>
                </div>
        </div> 
        </>

    );
}

export default KanbanBoard;