import React, { useState, useEffect } from 'react';
import Dashboard from "./Dashboard"
import { withRouter } from "react-router-dom"

let contract = ''


const OPTIONS = {
    // defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
};


const DashboardContainer = (props) => {


    const [name, setName] = useState("")
    const [employNumber, setEmployNumber] = useState("")
    const [companyName, setCompanyName] = useState("E Ocean")
    const [salary, setSalary] = useState("")
    const [type, setType] = useState("")

    useEffect(() => {
    }, [])





    return (
        <div>
            <Dashboard
                // onClick={redirect}
                // name={name}
                // setName={setName}
                // employNumber={employNumber}
                // setEmployNumber={setEmployNumber}
                // companyName={companyName}
                // setCompanyName={setCompanyName}
                // salary={salary}
                // setSalary={setSalary}
                // type={type}
                // setType={setType}
            />
        </div>
    );
};

export default withRouter(DashboardContainer);
