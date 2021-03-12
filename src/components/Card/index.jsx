import React from 'react';
import useGlobal from '../../myHooks/useGlobal';
import './index.scss';

const Card = (props) => {
  const [{ theme, lang }] = useGlobal();
  const { image, keyVal } = props;

  return (
    <div className="card">
      <img src={image} alt="" />
    </div>
  );
};

export default Card;
