import React, { useState, useEffect } from 'react';
import Gallery from 'react-image-gallery';
import myAxios from 'utils/myAxios';

const Carousel = () => {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    myAxios('testData/imageList.json')
      .then((res) => {
        if (res.status === 200) {
          setImageList(res.data);
        }
      })
      .catch(() => {
        setImageList([]);
      });
  }, []);

  return (
    <Gallery
      items={imageList}
      onErrorImageURL="images/2021-01/Gekidol_poster.jpg"
      slideInterval={10000}
      lazyLoad
      showThumbnails={false}
      showFullscreenButton={false}
      showPlayButton={false}
      showBullets
      autoPlay
    />
  );
};

export default Carousel;
