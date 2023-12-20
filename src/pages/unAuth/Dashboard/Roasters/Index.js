import { Grid,Box } from "@mui/material";
import React, {useState,useEffect} from "react"
import SelectRoasterProfile from "../Roasters/SelectRoasterProfile";
import RoasterFilterbtns from "./RoasterFilterbtns";
import RoasterPersonDetailTable from "./RoasterPersonDetailTable";


export const SpotRoaster=()=>{

    const filterByViewBy=[
        {id:1,label:"Employee",value:"Employee"},
        {id:2,label:"Department",value:"Department"},
        {id:3,label:"Job Title",value:"Job Title"},
        {id:3,label:"Work Location",value:"Work Location"},
        {id:4,label:"Shift Time",value:"Shift Time"},
    ]
    const[viewBy,setViewBy]=useState(filterByViewBy[0])
    
    
    const [oriPagedata, setOriPagedata] = useState({})
    const[pagedata,setPagedata]=useState()
    const [employeeupdateData, setEmployeeupdateData] = useState([])
    const [apprvStatus,setApprvStatus]=useState("")

    

return<>

<Grid >
    <Box>

    
        <SelectRoasterProfile
        oriPagedata={oriPagedata}
        employeeupdateData={employeeupdateData}
        setEmployeeupdateData={setEmployeeupdateData}
        setViewBy={setViewBy}
        viewBy={viewBy}
        filterByViewBy={filterByViewBy}

        />

        <RoasterFilterbtns/>

    <RoasterPersonDetailTable
    setPagedata={setPagedata}
    setOriPagedata={setOriPagedata}
    oriPagedata={oriPagedata}
    pagedata={pagedata}
    apprvStatus={apprvStatus}
    viewBy={viewBy}
    // oriPagedata={oriPagedata}
    />
</Box>
</Grid>
 </>


}