import React, { useState, useEffect } from 'react';
import Stake from "./Stake"
import { withRouter } from "react-router-dom"



const StakeContainer = (props) => {


    const [showDropdown, setShowDropdown] = useState(true)
    const [employNumber, setEmployNumber] = useState("")
    const [companyName, setCompanyName] = useState("E Ocean")
    const [salary, setSalary] = useState("")
    const [type, setType] = useState("")
    useEffect(() => {
    }, [])
    return (
        <div>
            <Stake
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
            />
        </div>
    );
};

export default withRouter(StakeContainer);
