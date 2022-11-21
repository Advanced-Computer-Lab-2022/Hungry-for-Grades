
import styles from './TableRow.module.scss';

export default function TableRow() {
  return (
    <div className = {styles.table_row}>
        <div style = {{marginLeft :'7.5%',maxWidth:'19%', display:'inline-block'}}>Hussein Yasser Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque repellat voluptates, fugit doloribus dolorum minus autem et minima numquam quisquam exercitationem doloremque ipsum non sequi nesciunt sapiente, veritatis necessitatibus magni.</div>
        <div style = {{marginLeft : '28.2%'}}>Master Data Science</div>
        <div style={{marginLeft:'53%'}}>11/11/11</div>
        <div style = {{marginLeft : '70.5%'}}>Pending</div>
        <div style = {{marginLeft : '88%'}}>Accept/Reject</div>
    </div>
  )
}
