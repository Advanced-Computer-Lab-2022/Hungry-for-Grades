/* eslint-disable security/detect-object-injection */
import { type ToogleProps } from './types';
function Toogle(props: ToogleProps) {
  const { toogle, setToogle } = props;
  return (
    <div
      className={
        'bg-primary rounded d-flex items-center justify-content-center'
      }
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'fit-content',
        margin: '1rem 0',
        borderRadius: '0.5rem'
      }}
    >
      {Object.keys(toogle).map((key, index) => (
        <button
          key={key}
          className={`${
            toogle[key] ? 'bg-dark' : ''
          } text-white  py-2 px-4 btn btn-primary  `}
          style={{
            outline: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            margin: '0',
            textTransform: 'uppercase',
            letterSpacing: '0.05rem',
            borderLeft: `${index !== 0 ? '1.5px solid white' : ''}`
          }}
          type='button'
          onClick={() => {
            setToogle(prev => {
              Object.keys(prev).forEach(k => {
                if (k !== key) {
                  prev[k] = false;
                }
              });

              return {
                ...prev,
                [key]: !prev[key]
              };
            });
          }}
        >
          {key}
        </button>
      ))}
    </div>
  );
}

export default Toogle;
