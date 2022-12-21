import styles from './Filter.module.scss';

import ExactFilter from './ExactFilter';

import {
  AllReport,
  FilterAdmin,
  FilterElement
} from '@/interfaces/reports.interface';

//I need a type here in that case to be able to make everthing systematic
export default function Filter(propss: {
  elements: FilterAdmin;
  fun: (x: Set<AllReport>) => void;
}) {
  const arr = propss.elements?.att;

  const toShow = arr?.map((x: FilterElement) => {
    return (
      <ExactFilter
        key={1280471 + Math.random() * 1982074}
        fun={propss?.fun}
        x={x}
      />
    );
  });

  return <div className={styles.hero}>{toShow}</div>;
}
