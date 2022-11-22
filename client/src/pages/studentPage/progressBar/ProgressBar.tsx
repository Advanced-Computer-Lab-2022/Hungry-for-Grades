
import styles from './ProgressBar.module.scss';

export default function ProgressBar(props:{completed : number}) {
    const color = (props.completed <= 30)? 'red' : '#00ABB3';
  return (
    <div className = {styles.cover}>
        <div className = {styles.actual} 
        style={ { '--rating': props.completed, '--color': color} as React.CSSProperties } />
        <div style= {{fontSize:'0.8rem', fontWeight:'600', color:'#B2B2B2'}}>{props.completed}% Completed</div>
    </div>
  )
}
