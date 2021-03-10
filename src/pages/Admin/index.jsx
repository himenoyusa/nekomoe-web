import React from 'react';

const Admin = (props) => {
  return (
    <div>
      admin
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
