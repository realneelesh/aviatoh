import React, { useState } from 'react';
import { primaryBlueColour, primaryGreenColour, primarySilverColour } from '../App';
import StickyNote from './StickyNote';

function KanbanBoard(props) {

    const headingStype = {border: '0px', marginTop: '6px', display: 'block', border: '0px solid silver', color: 'grey'};

    const [ tasks, setTasks ] = useState(
        [
            {
                title: "Write the intro",
                status: "-1",
                priority: "0",
                description: "this is ashort descriptino for a task card, yea"
            },
            {
                title: "Talk to the guys",
                status: "0",
                priority: "-1",
                description: "this is ashort descriptino for a task card, yeatino for a task card, yeatino for a task card, yea"
            },
            {
                title: "Wrifds f ad",
                status: "-1",
                priority: "1",
                description: "this is ashort descriptino fotino for a task card, year a task card, yea"
            },
            {
                title: "Writ a dsf ",
                status: "1",
                priority: "1",
                description: "this is ashort dtino for a task card, yeatino for a task card, yeatino for a task card, yeatino for a task card, yeatino for a task card, yeaescriptino for a task card, yea"
            },
            {
                title: "Writ a  kjhlku  kjh",
                status: "0",
                priority: "-1",
                description: "this is ashort descriptino for a task card, yea"
            }
        ]
    );

    return (
        <div style={{
            width: '100%',
            backgroundColor: 'transparent',
            height: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            paddingTop: '40px'
        }}>
            <div style={{
                width: '28%',
                height: '100%'
            }}
            align="center"
            >
                <h2 style={{...headingStype, position: 'relative'}}>To Do  &nbsp; <i style={{color: primaryGreenColour(0.9), cursor: 'pointer', position:'absolute', fontSize: '25px', top: '6px'}} className="fa fa-plus"></i></h2>
                <br/>
                {/* <div style={{width: '90%'}}>
                <StickyNote title="Write " color="yellow" priorityLevel='0' text="this is test this is test this is test this is test this is test this is test this is test this is test "/>
                </div> */}
                {
                    tasks?.map(task => {
                        if(task.status == '-1'){
                            return <div style={{width: '90%'}}>
                                    <StickyNote title={task.title} priorityLevel={task.priority} description={task.description}/>
                                </div>
                        }
                    })
                }
            </div>

            <div style={{
                width: '28%',
                height: '100%'
            }}
            align="center"
            >
                <h2 style={headingStype}>In Progress</h2>
                <br/>
                {
                    tasks?.map(task => {
                        if(task.status == '0'){
                            return <div style={{width: '90%'}}>
                                    <StickyNote title={task.title} priorityLevel={task.priority} description={task.description}/>
                                </div>
                        }
                    })
                }
            </div>

            <div style={{
                width: '28%',
                height: '100%',
            }}
            align="center"
            >
                <h2 style={headingStype}>Completed</h2>
                <br/>
                {
                    tasks?.map(task => {
                        if(task.status == '1'){
                            return <div style={{width: '90%'}}>
                                    <StickyNote title={task.title} priorityLevel={task.priority} description={task.description}/>
                                </div>
                        }
                    })
                }
            </div>
        </div>
    );
}

export default KanbanBoard;