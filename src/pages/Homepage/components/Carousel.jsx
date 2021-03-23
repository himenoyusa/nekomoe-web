import React, { useState, useEffect } from 'react';
import Gallery from 'react-image-gallery';
import { Modal } from 'antd';
import myAxios from 'utils/myAxios';

const Carousel = (props) => {
  const [imageList, setImageList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState('');

  useEffect(() => {
    if (props.imageList) {
      const list = props.imageList;
      setImageList(list);
    } else {
      myAxios('testData/imageList.json')
        .then((res) => {
          if (res.status === 200) {
            setImageList(res.data);
          }
        })
        .catch(() => {
          setImageList([]);
        });
    }
  }, [props.imageList]);

  const openPreview = (e) => {
    if (e.target.currentSrc) {
      setPreviewImg(e.target?.currentSrc ?? '');
      setVisible(true);
    }
  };

  return (
    <>
      <Gallery
        items={imageList}
        onErrorImageURL="images/2021-01/Gekidol_poster.jpg"
        onClick={(e) => openPreview(e)}
        slideInterval={30000}
        lazyLoad
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
        showBullets={imageList.length > 1}
        autoPlay
      />
      <Modal
        getContainer={false}
        footer={null}
        centered
        visible={visible}
        style={{ paddingBottom: 0 }}
        bodyStyle={{
          padding: 5,
          textAlign: 'center',
          maxHeight: '95vh',
          overflow: 'hidden',
        }}
        closeIcon={
          <div>
            <css-icon
              class="icon-close"
              style={{ backgroundColor: 'rgba(255,255,255, 0.6)', borderRadius: '10%' }}
            />
          </div>
        }
        onCancel={() => setVisible(false)}
        width="auto"
      >
        <img src={previewImg} alt="" style={{ maxHeight: '90vh', maxWidth: '100%' }} />
      </Modal>
    </>
  );
};

export default Carousel;
