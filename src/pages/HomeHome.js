import React, { useEffect } from 'react';
import { showPage } from '../App';
import AppCard from '../components/CurriculumsAppCard';

function HomeHome(props) {
 
    return (
        <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '150px 0', justifyContent: 'center',
        flexDirection: 'column'
        }}>
            {/* <a
              href="/#/academia"
              onClick={()=>{
                document.querySelectorAll("*").forEach(i => {
                  i.style.opacity = '0';
                })
              }}
              style={{textDecoration: 'none'}}>
                <AppCard
                onClick={()=>{
                  document.querySelectorAll("*").forEach(i => {
                    i.style.opacity = '0';
                  })
                }} 
                appName={<><span style={{fontSize: '25px'}}>🎯</span> &nbsp; Curiosity</>} 
                description="Self-study curriculums with an application that keeps you from distracting on the web. Organised, topic wise collection of freely available resources, curated by experts." />
</a>
 
                <a
              href="/#/automedium"
              onClick={()=>{
                document.querySelectorAll("*").forEach(i => {
                  i.style.opacity = '0';
                })
              }}
              style={{textDecoration: 'none'}}>
              <AppCard 
                appName={<><span style={{fontSize: '25px'}}>🌱</span> &nbsp; Auto.Medium</>}
                description="Automated content creation for medium using openai tools. Provide titles for blogs and it will create content and publish them for you. Uses cypress for automation." />
             </a>      */}

             {/* <a
              href="#/app/documentations"
              onClick={()=>{
                document.querySelectorAll("*").forEach(i => {
                  i.style.opacity = '0';
                })
              }}
              style={{textDecoration: 'none'}}>
              <AppCard 
              img="📄"
                appName={<><span style={{fontSize: '25px'}}></span> &nbsp; Documentations</>}
                description="Streamline your documentation process and save time. From product descriptions to user manuals, create professional-grade documents effortlessly. Try it today and experience the ease and efficiency of our top-of-the-line tool." />
             </a>  */}
            
        </div>
    );
}

export default HomeHome;