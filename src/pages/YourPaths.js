import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { primaryBlueColour, primarySilverColour, showPage } from '../App';
import { getDocument, topicsCollection, updateOrCreateDocument, usersCollection } from '../db';

function YourPaths(props) {
    const { email } = props;
    const [ user, setUser ] = useState({
        paths: []
    });
    const [ pathToAdd, setPathToAdd ] = useState({
        title: "",
        description: `<h3 align="center" style="color: rgb(149, 165, 166); font-weight: 500;" data-mce-style="color: rgb(149, 165, 166);text-align: center; font-weight: 500;"><br/><br/><br/><br/>Add or select items from the menu to enable the editor...</h3>`,
        topics: [{
            
        }]
    });
    const [ pathAdded, setPathAdded ] = useState(false);

    useEffect(()=>{
        showPage();
        console.log(email);
        if(email){
            document.getElementById('booktitle').focus();
        getDocument(usersCollection, email).then(res => {
            console.log(res.data());
            if(!res.data().paths){
                const usr = res.data();
                usr.paths = [];
                setUser(usr);
            } else {
            setUser(res.data());
            }
        })
    }
    },[email, pathAdded]);

    return (
        <div>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
           
            <input 
            id="booktitle"
            style={{
                border: '0',
                borderBottom: '1px solid silver',
                fontSize: '17px', 
            }}
            onChange={e=>{
                console.log(user.paths, email);
                setPathToAdd({...pathToAdd, title: e.target.value.trim()})
            }} placeholder='New Documentation Title' /> 
            &nbsp;
             <button
             style={{
                backgroundColor: primaryBlueColour,
                color:'white',
                fontSize: '13px'
             }}
             onClick={()=>{
                if(pathToAdd.title && pathToAdd.title !== ''){
                var key = email + new Date().toString().replaceAll(" ", "");
                updateOrCreateDocument(usersCollection, email, {
                    paths: [...user.paths, {...pathToAdd, topics: [{
                        title: 'Sample Feature 1',
                        id: key
                    }]}]
                })
                .then((res) => { 
                    updateOrCreateDocument(topicsCollection, key, {data: '<p style="color: rgb(126, 140, 141);" align="center">Feature</p><h2 style="text-align: center;"><span style="color: rgb(126, 140, 141);">Sample Feature Title</span></h2> <p><span style="color: rgb(126, 140, 141);">You can delete this text and start writing the documentation...</span> <p>&nbsp;</p> <p>&nbsp;</p>'})
                        .then((res) => {
                        setPathAdded(!pathAdded);
                        document.getElementById('booktitle').value = '';
                    })
                })
            .catch((e) => {
              alert(e);
            });
                } else {
                    alert('Title can not be empty');
                }
             }}
             >Create</button>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <div style={{display: 'flex', flexWrap: 'wrap', backgroundColor: primarySilverColour, width: '100vw', marginLeft: '-8px'}}>
             {
                user?.paths.map((path, i)=>{
                    return <Link to={'/edit'+'/'+email+'/'+path.title} style={{
                        textDecoration: 'none',
                        color: 'gray',
                        fontSize: '17px'

                    }}> <div style={{
                        padding:'5px 20px',  
                        borderRadius: '6px',
                        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 7px',  
                        backgroundColor: 'white',               
                        margin: '20px 15px',
                        }}>
                        {path.title} 
                        {/* &nbsp;
                        &nbsp;
                        &nbsp;
<i className="fa">&#xf044;</i> */}
                    </div>
                    </Link>
                })
             }
         </div>
        </div>
    );
}

export default YourPaths;