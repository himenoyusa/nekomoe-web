import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios('testData/list.json')
      .then((res) => {
        if (res.status === 200) {
          setList(res.data);
        } else {
          setList([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setList([]);
    };
  }, []);

  return (
    <div>
      homepage
      <Link to="/admin">
        <button type="button">跳转</button>
      </Link>
      {list.map((item) => (
        <>
          <div>{item.title[0]}</div>
          <div>{item.jTitle}</div>
        </>
      ))}
    </div>
  );
};

export default Homepage;
