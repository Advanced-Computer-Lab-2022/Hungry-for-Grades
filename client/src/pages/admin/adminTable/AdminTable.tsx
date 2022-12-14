import { MdIndeterminateCheckBox } from 'react-icons/md';

import { useState } from 'react';

import styles  from './table.module.scss';

import { AllReport } from '@/interfaces/reports.interface';


export default function AdminHome( props:{data : AllReport[], st : Set<AllReport>, funA: (x:AllReport)=>void, funR : (x:AllReport)=>void }) {

  function handleMultipleRows(report:AllReport)
  {

    if(props?.st.has(report))
    {
      //then we are removing it now
      props?.funR(report);
    }
    else
    {
      props?.funA(report);
    }
  }

  let i = 0;
  const toShow = props.data?.map((report : AllReport)=>
  {
    i++;
    const isDisabled = report?.status == 'Pending'? false:true;
    return (
  <tr key = {report?._id} style={{fontSize:'1rem', fontWeight:'450', color:'#393E46'}}>
    <input  disabled={isDisabled} id={'CheckBox'+((138191*10501)+-10+1912 + i).toString()} style={{width:'1.4rem', height:'1.2rem', alignItems:'center', marginTop:'1rem', marginLeft:'0.1rem'}} type='checkbox' onClick={()=>
    handleMultipleRows(report)}/>
    <td>{report?.traineeInfo.at(0)?.name}</td>
    <td>{report?._course.at(0)?.title}</td>
    <td>15/04/2001</td>
    {report?.status == 'Pending' && <td><div className={styles.statusP}>Pending</div></td>}
    {report?.status == 'Resolved' && <td><div className={styles.statusResolved}>Resolved</div></td>}
    {report?.status == 'Rejected' && <td><div className={styles.statusRej}>Rejected</div></td>}
    {(report?.status == 'Resolved' || report?.status=='Rejected') && <td>No Actions Required</td>}
    {!(report?.status == 'Resolved' || report?.status=='Rejected') && <td>
      <button className = {styles.aprove} type = 'button'>Accept</button>
      <button className = {styles.decline} type = 'button'>Decline</button>
      </td>}
  </tr>)
  });

  return (
    <div style={{ overflowX:'auto'}}>
    <table className={styles.container}>
      <tr style={{fontWeight:'600', fontSize:'1rem', paddingLeft:'1rem'}}>
        <th ><MdIndeterminateCheckBox style={{color:'#DC3535', fontSize:'1.5rem'}} /></th>
        <th>Corporate Trainee</th>
        <th>Requested Course</th>
        <th>Date</th>
        <th style={{paddingLeft:'0.5rem'}}>Status</th>
        <th style={{paddingLeft:'3rem'}}>Actions</th>
      </tr>
      {toShow}
    </table>
    </div>
  );
}
