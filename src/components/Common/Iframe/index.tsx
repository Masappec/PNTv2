interface Props{
    title:string;
    link: string;
   
    
    }
    
const Iframe =(props:Props)=>{

return(
    <div>

<iframe
          className='mx-auto aspect-video h-full w-3/4 rounded-md'
          width='560'
          height='315'
          src={props.link}
          title={props.title}                    
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen>
            
          </iframe>
        </div>
    )}

    export default Iframe