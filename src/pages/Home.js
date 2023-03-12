import React, { useEffect, useState } from 'react';
import { disciplinesCollection, getAllDocuments } from '../db';

import '../App.css';
import PathCard from '../components/PathCard';
import { Empty } from '../assets';
import { browserStorage, discDataKey } from '../BrowserStorage';
import Loader from '../components/Loader';
import { primaryBlueColour, primaryRedColour, primarySilverColour, showPage } from '../App';
import SearchBar from '../components/Searchbar';
import PathsEnrolled from '../components/PathsEnrolled';
import { Link } from 'react-router-dom';
 
 function Home(props) {

    const { email } = props;

    useEffect(()=>{
        showPage();
    });

    const [ discData, setDiscData ] = useState(null);
    const [ pathsData, setPathsData ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ activeDisc, setActiveDisc ] = useState({
        title: true
    });

    useEffect(()=>{
        setLoading(true);
        Promise.resolve(getAllDocuments(disciplinesCollection)).then(res => {
            let arr = [];
            res.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
                arr.push({...doc.data(), id: doc.id})
            });
            console.log(arr);
            setDiscData(arr);
            browserStorage.setItem(discDataKey, arr);
             
            
            setLoading(false);
        })
    }, [])

    return ( loading ? <Loader/>:<div align="center">
            {/* <div align="left" style={{marginRight: '20px'}}><h3 style={{ padding: '3px', lineHeight: '2.5', backgroundColor: 'white', color: 'black', border: '0px solid silver'}}>Disciplines:</h3>
            </div> */}
        

        <div align="left" style={{position: 'sticky', top: '0', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', backgroundColor: primarySilverColour, paddingBottom: '15px', zIndex: '999',
        width: '100vw',
        marginLeft: '-8px'
    }}>
        <h3
                            onClick={() => { 
                                setPathsData(null);
                                setActiveDisc({
                                    title: true
                                });
                            }}
                            className='h3'
                            style={{  paddingLeft: '10px', paddingRight: '10px' ,position: true == activeDisc.title ? 'stiky' : 'relative', cursor: 'pointer', backgroundColor: true == activeDisc.title ? primarySilverColour : 'white', color: 'rgb(80, 80, 80)', border: '0px solid rgb(219, 219, 219)', marginRight: '15px', marginBottom: '0px', top: '0'}}>
                            <i className='fa fa-home'></i>
                            {/* <span style={{transform: 'scale(1.25)', display: 'block'}}>🏠 </span> */}
                        </h3>
        
            {discData? discData.map(disc => {
                return <h3
                            onClick={() => {
                                let obj = discData?.find(item => item.title === disc.title);
                                setPathsData({...obj, id: disc.id});
                                setActiveDisc(disc);
                            }}
                            className='h3'
                            style={{  position: disc.title == activeDisc.title ? 'stiky' : 'relative', cursor: 'pointer', backgroundColor: disc.title == activeDisc.title ? primaryBlueColour : 'white', color: disc.title == activeDisc.title ? primarySilverColour : 'black', border: '0px solid rgb(219, 219, 219)', marginRight: '15px', marginBottom: '0px', top: '0'}}>
                            {disc.title}
                        </h3>
            }) : ''
            }

<h3
                            onClick={() => { 
                                setPathsData(null);
                                setActiveDisc({
                                    title: true
                                });
                            }}
                            className='h3'
                            style={{  paddingLeft: '10px', paddingRight: '10px' ,position: true == activeDisc.title ? 'stiky' : 'relative', cursor: 'pointer', backgroundColor: true == activeDisc.title ? primarySilverColour : primarySilverColour, color: 'rgb(90, 90, 90)', border: '0px solid rgb(219, 219, 219)', marginRight: '15px', marginBottom: '0px', top: '0'}}>
                            <i className='fa fa-bars'></i> &nbsp;More
                            {/* <span style={{transform: 'scale(1.25)', display: 'block'}}>🏠 </span> */}
                        </h3>
        </div>  
        {/* <hr style={{border: '0.5px solid rgb(219, 219, 219)'}}/>  */}
 
        { 
            !pathsData && <div align="center">
                
                <br/>
                <br/>
                <br/>
                <br/>
                <br/> 
                        <br/> 
                <br/>
                <SearchBar data={discData ? discData : []} />
                <br/>
                <br/>
                <br/>
                <div>
                {/* <div align="left" style={{width: '60vw'}}>
        <h3 style={{display: 'block', backgroundColor: primarySilverColour, color: 'black'}}> Most popular curriculums</h3>
         
        <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}> 
        
            {
                ['Arts and Design/Film and Video', 'Programming and Computer Science/Introduction to Web Development', 'Programming and Computer Science/Artificial Intelligence', 'Business and Entrepreneurship/Finance'].map(path => {
                    return <>
                    <Link to={'/path/'+path.split('/')[0]+'/'+path.split('/')[1]} style={{
                          backgroundColor: '', cursor: 'pointer', textDecoration: 'none'}}>
                          <h3 style={{marginRight: '23px', marginBottom: '0', color: 'black', backgroundColor: 'transparent', display: 'inline-block'}}>

                        {
                            path.split('/')[1]
                        }
                        </h3>
                    </Link>
                    
                    </>
                })
            }
        </div>
                </div> */}
                <br/> 
                <br/> 
                <br/> 
                <div>
                 <PathsEnrolled email={email} /> 
                </div>
            </div>
            </div> 
        }  
       <div align="center" style={{ width: '500px', marginLeft: '-8px', marginTop: '0px', paddingTop: '35px'}}>
            {
                // .sort((x, y) => {
                //     if(JSON.parse(y).title > JSON.parse(x).title){
                //         return -1;
                //     } else {
                //         return 1;
                //     }
                //     })
                pathsData?.paths?.map(path => {
                    path = JSON.parse(path !== "" ? path : null);
                    return <><PathCard data={{...path, id: pathsData.id}} /></>
                })
            }
            {
                pathsData && !pathsData.paths && <><br/><br/><br/><br/><br/>
                  <SearchBar data={discData ? discData : []} />

                </>
            }
            </div>
            
        </div>
    );
 }
 
 export default Home;