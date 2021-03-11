import React from 'react';
import useGlobal from '../../myHooks/useGlobal';

const Admin = (props) => {
  const [globalState] = useGlobal();

  return (
    <div>
      admin counter:
      {globalState.lang}
      <button
        type="button"
        onClick={() => {
          props.history.push({
            pathname: '/',
            name: 'yu',
          });
        }}
      >
        跳转
      </button>
    </div>
  );
};

export default Admin;
