import React from 'react';

function CourseCard(props) {
    const {course, i} = props;
    return (
        // <div style={{
        //     height: '57vh',
        //     display: 'flex',
        //     justifyContent: 'flex-start',
        //     alignItems: 'center',
        //     width: '100vw',
        //     backgroundColor: '#edeeff'
        // }}>
        <div
        align="left"
        style={{
            padding: '0px 20px',
            // borderTop: '2px solid rgb(230, 230, 230)',
            // borderBottom: '2px solid rgb(230, 230, 230)',
            marginTop: '60px',
        }}> 
            <h1 style={{padding: '0', fontWeight: '500'}}>{course.title}</h1>
            <br/>
          
            <br/>
            <h4 style={{ fontWeight: '700', backgroundColor: '#a435f0', color: 'white', marginRight: '6px'}}>{course.duration}</h4> 
                {
                    course?.topics?.map((topic)=>{
                        return <h4 style={{
                            marginRight: '6px',
                            padding: '5px 10px',
                            backgroundColor: '#3e4143',
                            color: '#c0c4fc',
                            borderRadius: '5px',
                            marginTop: '5px'
                        }}><b>{
                            topic
                            }</b></h4>
                    })
                } 
            <br/>
            <br/>
            <div>
                {
                    course.description
                }
            </div>
            <br/>
            <div align="right">
            <>
                <h2 style={{padding: '0', fontWeight: '700'}}>$
                {
                    course.fees
                }
                </h2> 
                &nbsp;
                &nbsp;
                <h2 style={{padding: '0', fontWeight: '300', color: 'rgb(160,160,160)'}}>
                <strike>${course.originalFees}</strike>

                </h2> 
            </>

            &nbsp;
            &nbsp;
            &nbsp;
            |
                &nbsp;
            &nbsp;
            &nbsp;

                <a href="https://wa.me/8126153920"><button style={{padding: '0'}}><h3 style={{padding: '0', fontWeight: '500'}}><b style={{fontSize: '25px'}}> &nbsp;💬</b> Contact Instructor</h3></button></a>
<br/>
<br/>
                
                <hr/>
            </div>
        </div>
        // </div>
    );
}

export default CourseCard;