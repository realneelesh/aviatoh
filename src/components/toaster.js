import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function toaster(level, message) {

    //level => -1, 0, 1    ====   error, info, success

    if(message == 'Missing or insufficient permissions.'){

        toast['info'](<div align="center">Buy a subscription to continue 
        <br/>
        <br/> 
        <Link onClick={()=>{
        }} to="/p" target="payment" style={{textDecoration: 'none', curs: 'pointer'}}><span>Buy</span><br/><img src={'https://razorpay.com/docs/build/browser/static/razorpay-docs-dark.6f09b030.svg'} style={{width: '70px'}} />
        </Link>
        </div>);
        
    } else {
        toast[level == 0 ? 'info' : level == -1 ? 'error' : 'success'](message);
    }
    return <div></div>;
}

export default toaster;