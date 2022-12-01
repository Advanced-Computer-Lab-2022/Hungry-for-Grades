import { toastOptions } from "@/components/toast/options";
import axios from "axios"
import { useState } from "react";
import { De } from "react-flags-select";
import { toast } from "react-toastify";
import DiscountModal from "../DiscountModal";


const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

function handleDelete(discountID:string, courseID:string)
{
    axios.delete(`${APP_BASE_API_URL}/courses/${courseID}/discount/${discountID}`)
               .then(_response => {
                toast.success('Discount is Deleted Successfully...', toastOptions)
               })
               .catch(_error => {
                toast.error('an Error has occurred please try again...')

               })
}

export default function DiscountCard(props:{startDate : string, endDate : string, percent : number, discountID : string, courseID : string}) {
    const [show, setShow] = useState(false);
  return (
    <div style={{display:'flex', flexWrap:'wrap', marginBottom:'4rem'}}>
        <div style = {{fontSize:'1.2rem', fontWeight:'500', marginRight:'40%'}}>
            <div>Start Date : {props.startDate}</div>
            <div>End Date : {props.endDate}</div>
            <div>Percentage : {props.percent}</div>
        </div>
        <div>
            <button style={{display:'inline-block', backgroundColor:'#A00407', color:'white', marginRight:'1rem'}} onClick = {() => setShow(true)}>Update Discount</button>
            <button style= {{backgroundColor:'white', color:'#A00407'}} onClick = {() => handleDelete(props.discountID, props.courseID)}>Delete Discount</button>
        </div>
        {show == true && <DiscountModal handleClose={() => setShow(false)} id={props.courseID } updateFlag={props.discountID}  />}
    </div>
  )
}

