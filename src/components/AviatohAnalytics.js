import React, { useEffect, useState } from 'react';
import { getDocument, kanbanBoardsCollection, usersCollection } from '../db';
import PieChart from './PieChart';

function AviatohAnalytics(props) {

    const { email } = props;

    const [ htodo, setHTodo ] = useState(0);
    const [ mtodo, setMTodo ] = useState(0);
    const [ ltodo, setLTodo ] = useState(0);
    const [ inprogress, setInProgress ] = useState(0);
    const [ completd, setCompleted ] = useState(0);

    useEffect(()=>{
        getDocument(usersCollection ,email).then(res => { 
           
            res.data().projects.forEach(project => {
                getDocument(kanbanBoardsCollection, project.kanbanBoardId).then(res => {
                    
                    console.log(res.data());
                    res.data().data.forEach(task => {
                        if(task.status == -1){
                            
                            if(task.priority == -1){
                                let l = ltodo;
                                setLTodo(++l);
                            } else if(task.priority == 0){
                                let m = mtodo;
                                setMTodo(++m);
                            } else if(task.priority == 1){
                                let h = htodo;
                                setHTodo(++h);
                            }
            
                        } else if(task.status == 0){
                            let ip = inprogress;
                            setInProgress(++ip);
            
                        } else if(task.status == 1){
                            let c = completd;
                            setCompleted(++c);
                        }
                    });
                });
            });
            
        });
    }, []);
    
    return (
        <div align="left">
           <br/>
           <br/> 
            {/* <PieChart data={[{ label: 'ToDo', value: todo }, { label: 'InProgress', value: inprogress }, { label: 'Completed', value: completd}]} outerRadius='100' innerRadius='20' /> */}
        <h1 style={{marginLeft: '0px', paddingLeft: '4px'}}>Analysis</h1>
        <br/>
        <br/>
        <br/>
        <table onClick={()=>{
            alert(ltodo);
        }}>
            <tr>
                <td><u><b>STATUS</b></u><br/><br/></td>
                <td><u><b>NO. OF TASKS</b></u><br/><br/></td>
            </tr>
            <tr>
                <td>To Do(High Priority )</td>
                <td>{htodo}</td>
            </tr>
            <tr>
                <td>To Do (Medium Priority)</td>
                <td>{mtodo}</td>
            </tr>
            <tr>
                <td>To Do (Low Priority)</td>
                <td>{ltodo}</td>
            </tr>
            <tr>
                <td>In Progress (Total)</td>
                <td>{inprogress}</td>
            </tr>
            <tr>
                <td>Completed (Total)</td>
                <td>{completd}</td>
            </tr>
        </table>
        </div>
    );
}

export default AviatohAnalytics;