
import ReactCountryFlag from 'react-country-flag';

import styles from './ReviewContainer.module.scss';


export default function ReviewContainer() {
  return (
    <div className={styles.review_section}>
        <div className={styles.review_itself}>
            <div style={{height:'100%', marginRight:'1.55rem'}}>
                <img alt = 'reviewer' className={styles.review_img} src = 'https://pyxis.nymag.com/v1/imgs/645/f7a/c6d24e1ab3732e23542c9b67590e9f1ab0-8-Jason-Statham.rsquare.w330.jpg'/>
            </div>
            <div style={{display:'block'}}>
                <div className={styles.reviewer_name}>
                    <div className = {styles.name}>
                        Hussein Ebrahim
                    </div>
                </div>
                <div className= {styles.reviewer_country}>
                    <ReactCountryFlag svg countryCode='US' style={{width:'1.2rem', height:'1rem'}} />
                    <>&nbsp;</>
                    <span style = {{fontSize : '1rem', fontWeight:'400'}}> United States </span>
                </div>
                <div className = {styles.rating_date_container}>
                    <div className={styles.Stars} style={{'--rating': 3.7} as React.CSSProperties} />
                    <>&nbsp;&nbsp;</>
                    <span style = {{fontWeight:'400', lineHeight:'1.4', fontSize:'1rem', color:'#6a6f73'}}>
                        a week ago
                    </span>

                </div>
                <div style = {{fontSize:'1.1rem', maxWidth:'35rem', fontWeight:'500',  fontFamily: 'udemy sans'}}>
                    Hello This is Very Good Instructor, I liked him so Much.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque alias sint ipsum vero quibusdam repudiandae, officiis facilis ullam ex assumenda incidunt consequatur obcaecati culpa expedita corporis amet, dolor maxime perspiciatis.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste ipsa distinctio sapiente voluptatem, consequuntur itaque consequatur, repudiandae molestiae fuga tempora possimus eaque nam provident perferendis! Aliquid sint mollitia veniam odit.
                </div>
            </div>
        </div>
    </div>
  )
}
