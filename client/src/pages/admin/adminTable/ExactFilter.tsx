import { useRef, useState } from 'react';
import { Overlay } from 'react-bootstrap';
import { AiFillCaretDown } from 'react-icons/ai';

import { AllReport, FilterElement } from '@/interfaces/reports.interface';

import styles from '@pages/admin/adminTable/ExactFilter.module.scss';

export default function ExactFilter(props : {x : FilterElement, fun : (x : Set<AllReport>)=>void}) {

    const target = useRef(null);

    const [visible, setVisible] = useState<boolean>(false);


    const toShow2 = props?.x?.values?.map((b : string) => {
        return (
            <div key = {Math.random()  + 1091124142821217*2301131482*-1 * Math.random() - Math.random()} >
                <button style={{fontSize:'0.9rem', fontWeight:'600', color:'#A00407'}} type = 'button' onClick = {()=>{
                   setVisible(!visible);
                   props?.fun(new Set());
                   props?.x?.setValue(b);
                }}>
                    {b}
                </button>
            </div>

        );
    })
    const rqm = (visible)? 13:2;
    return (
        <div key = {Math.random()  + 1289741*23214124 * Math.random() - Math.random()} style = {{display:'inline-block', marginBottom: `${rqm}rem`, marginRight:'2rem'}} >
            <div>
            <span style={{fontSize:'1.1rem', fontWeight:'600'}}>{props?.x.title}</span>
            <button ref = {target} style = {{borderRadius:'8px', marginLeft:'1.5rem', borderColor:'grey', borderWidth:'1px', fontSize:'0.8rem'}}  type = 'button' onClick = {()=> setVisible(!visible)}>{props?.x?.actualValue} <AiFillCaretDown /></button>
            <Overlay placement='bottom' show={visible} target={target}>
                {({ placement, arrowProps, show: _show, popper, ...propss }) =>(
                    <div 
                    {...propss} 
                    className = {styles.drop_down}
                    style={{
                      borderRadius: 3,
                      ...propss.style,
                      marginTop: '10px',
                      zIndex: 9999
                    }}>
                        {toShow2}
                    </div>
                )}
            </Overlay>
            </div>
        </div>
    )

}


