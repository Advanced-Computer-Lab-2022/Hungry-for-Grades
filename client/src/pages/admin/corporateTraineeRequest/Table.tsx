import styles from './Table.module.scss';

export default function Table() {
  return (
    <table className='table' style={{ width: '80%', marginLeft: '10%' }}>
      <thead className={styles.header}>
        <tr>
          <th scope='col'>User Name</th>
          <th scope='col'>Requested Course</th>
          <th scope='col'>Date</th>
          <th scope='col'>Status</th>
          <th scope='col'>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope='row'>1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope='row'>2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope='row'>3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  );
}
