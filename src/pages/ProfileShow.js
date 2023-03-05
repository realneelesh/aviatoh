import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDocument, updateOrCreateDocument, usersCollection } from '../db';
import '../App.css';
import { showPage } from '../App';

function ProfileShow(props) {
    useEffect(()=>{
        showPage();
    });

    const { email } = useParams();

    const [ particulars, setParticulars ] = useState(null);
    const [ eduDataArray, setEduDataArray ] = useState(null);
    const [ expDataArray, setExpDataArray ] = useState(null);

    useEffect(() => {
        if(email){
            getDocument(usersCollection, email).then(res => {
                let data = res?.data();
                console.log(data);
                // set particulars
                setParticulars(data.particulars);

                let eduData = [];
                let expData = [];
                Object.keys(data).map( key => {
                    if(data[key].type == 'edu'){
                        eduData.push(data[key]);
                    } else if(data[key].type == 'exp') {
                        expData.push(data[key]);
                    }
                });

                // set eduData
                eduData.sort((a,b) => b.yearOfGraduation - a.yearOfGraduation )
                setEduDataArray(eduData.length == 0 ? null : eduData);

                //set expData
                setExpDataArray(expData.length == 0 ? null : expData);
            })
        }
    }, [email])

    return (
        <div align="left">
           <div style={{display: 'flex', justifyContent: 'space-between'}}>

           { particulars && <><><span>👤 {particulars?.fullname.toUpperCase()}&nbsp;| &nbsp;📞 &nbsp;{particulars?.phoneNumber} &nbsp;| {particulars?.country.toUpperCase()}</span></></> }
</div>
           <br/>
           <br/>
           <div style={{display: 'flex', justifyContent: 'space-between'}}>

           <div>
 

           <div style={{fontSize: '35px'}}>📚 Education</div>
                <table>
                    <tbody>
                    {!eduDataArray && <h3>No Data</h3>}
                    {eduDataArray && <tr> 
                        <th>Degree</th>
                        <th>Institution</th>
                        <th>Year of graduation</th>
                    </tr>}
                    {
                        eduDataArray?.map( (edu, index) => {
                            return <tr> 
                                        <td><select style={{width: '100%'}}>
                                                <option>
                                                   {edu.degree}
                                                </option>
                                            </select></td>
                                        <td>
                                            <select style={{width: '100%'}}>
                                                <option>
                                                   {edu.institution}
                                                </option>
                                            </select></td>
                                        <td>{edu.yearOfGraduation}</td>
                                         
                                    </tr>
                        })
                    }
                    </tbody>
                </table> 
            </div>

                <br/>
            
            <div>  
           <div style={{fontSize: '35px', width: '50vw'}}>👔 Experience</div>
                <table>
                <tbody>
                {!expDataArray && <h3>No Data</h3>}
                   {expDataArray && <tr> 
                        <th>Job Title</th>
                        <th>Company</th>
                        <th>Technology stack</th>
                        <th>Key responsibilities</th>
                    </tr>}
                    {
                        expDataArray?.map( (exp, index) => {
                            return <tr> 
                                        <td>{exp.jobTitle}</td>
                                        <td><select style={{width: '100%'}}>
                                                <option>
                                                   {exp.company}
                                                </option>
                                            </select></td> 
                                        <td>
                                        <select style={{width: '100%'}}>
                                                <option>
                                                   {exp.tech}
                                                </option>
                                            </select>
                                        </td>
                                        <td> 
                                            <select style={{width: '100%'}}>
                                                <option>
                                                   {exp.responsibilities}
                                                </option>
                                            </select>
                                        </td>
                                        
                                    </tr>
                        })
                    }
                    </tbody>
                </table> 
                </div>
                </div>
            <br/> 

           

        </div>
    );
}

export default ProfileShow;