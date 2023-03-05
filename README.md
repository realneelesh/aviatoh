# in every new component, add this code, because every element has opacity=0 by default and when it gets rendered the below code will make opacity=1 and because it has a transition time of around 300ms it gives the effect of fading in for every element/page/component
useEffect(()=>{
        showPage();
    });