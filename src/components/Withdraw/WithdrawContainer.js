import React, { useState, useEffect } from 'react';
import Withdraw from "./Withdraw"
import { withRouter } from "react-router-dom"



const WithdrawContainer = (props) => {


    const [showDropdown, setShowDropdown] = useState(true)
    const [employNumber, setEmployNumber] = useState("")
    const [companyName, setCompanyName] = useState("E Ocean")
    const [salary, setSalary] = useState("")
    const [type, setType] = useState("")
    useEffect(() => {
    }, [])
    return (
        <div>
            <Withdraw
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
            />
        </div>
    );
};

export default withRouter(WithdrawContainer);
