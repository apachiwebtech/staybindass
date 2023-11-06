import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
const Loader=(props)=>{

    return (
        <div className="loading-spinner" style={{display:'flex', alignItems:"center", justifyContent:"center", top:"0", left:"0", height:"100vh", width:"100vw"}}>
          <BeatLoader size={20} color={"#ab2440"} loading={props.loading} />
        </div>

    )
}   

export default Loader;