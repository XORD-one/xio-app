import React from 'react';

const Button = (props) => {
    const backgroundcolor = props.isXord ? {
        backgroundColor: "#58c89f"
    } : {
            backgroundColor: "#f15a2d"
    }
    return (
        <div onClick={()=>props.onClick()} style={{cursor:"pointer" ,padding:"20px 0px",textAlign:"center",color:"white", width: "100%", position: "fixed", bottom: 0,...backgroundcolor}} >
            PROCEED
        </div>
    );
};

Button.defaultProps = {
    isXord:false
}

export default Button;