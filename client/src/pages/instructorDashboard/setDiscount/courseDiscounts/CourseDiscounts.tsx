
import { CoursesRoutes } from '@/services/axios/dataServices/CoursesDataService';
import { SetStateAction, useState } from 'react';

import { useParams } from 'react-router-dom';
import DiscountModal from '../DiscountModal';

import DiscountCard from './DiscountCard';

import useCourseDiscountsQuery from "./useCourseDiscountsQuery"

function handleClick(setShow: { (value: SetStateAction<boolean>): void; (arg0: boolean): any; })
{
  return setShow(true);
}

function closeModal(setShow: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; })
{
  setShow(false);
}

export default function CourseDiscounts() {

   const [show, setShow] = useState(false);

    const id = useParams();

    const {isLoading, data} = useCourseDiscountsQuery(id.courseid as string);

    if(isLoading)
    {
      return <div>Loading</div>
    }


  const list = (data?.data?.data);


  if(list == undefined)
  {
    return<div>Empty</div>
  }

  const toShow = list.map((discount : typeof CoursesRoutes.GET.getDiscounts.response.data[0]) => {

    return <DiscountCard key = {discount._id} startDate = {discount.startDate} endDate = {discount.endDate} percent = {discount.percentage} discountID = {discount._id} courseID = {id.courseid as string}/>
  })

  return (
    <>
    <div style={{marginLeft:'15%', marginTop:'2rem'}}>
        <div style = {{marginBottom:'2rem', fontSize:'1.8rem', fontWeight:'600', fontFamily:'udemy sans,sf pro text,-apple-system,BlinkMacSystemFont,Roboto,segoe ui,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol'}}>
            Course's Discounts
        </div>
        <button style={{marginBottom:'2%', backgroundColor:'#A00407', color:'white'}} onClick={() => handleClick(setShow)}>Add new Discount</button>
        <div>
          {toShow}
        </div>

    </div>
    {show == true && <DiscountModal handleClose={() => closeModal(setShow)} id={id.courseid as string} updateFlag={''}  />}
    </>
  )
}
