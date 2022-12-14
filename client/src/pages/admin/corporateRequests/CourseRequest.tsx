

import { useLocation } from 'react-router-dom';

import { useState } from 'react';

import { useReqQuery } from './useReqQuery';

import { AllReport } from '@/interfaces/reports.interface';
import { AdminTable } from '@pages/admin/adminTable/AdminTable';
import Loader from '@/components/loader/loaderpage/Loader';

export default function CourseRequest() {

    const [set, setSet] = useState(new Set());

    function removeFoo(foo:AllReport) {
        setSet(prev => new Set([...prev].filter(x => x !== foo)))
    }

    function addFoo(foo:AllReport){
      setSet(prev => new Set(prev.add(foo)))
    }

    const {data, isLoading} = useReqQuery();



    if(isLoading)
    {
        return <Loader />
    }

    const arr = data?.data?.data;

    function test()
    {
        
    }
    

  return (
    <>
    <div style={{marginTop:'3rem', backgroundColor:'#F5F7F8', width:'100%', height:'100%'}}>
    <div style={{marginLeft:'3rem',fontSize:'1.4rem', fontWeight:'500', color:'#A00407', display:'inline-block'}}>Course Requests</div>
    <button style={{display:'inline-block'}} type='button' onClick={()=>test()}>AA</button>
    <div style={{marginLeft:'3rem', marginTop:'1.5rem'}}><AdminTable data={arr as AllReport[]} funA = {addFoo} funR = {removeFoo } st = {set as Set<AllReport>} /></div>
    </div>
    </>
  );
}
