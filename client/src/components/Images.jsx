import React, { useEffect, useState } from 'react';
import Image from '../components/Image';
import styles from '../styles/Images.module.scss';

const Images = (props) => {

  const [images, setImages] = useState([]); //stores url to image blobs

  useEffect(() => {
    setImages(props.images);
  }, [props.images]);

  return(
    <div className={styles.body}>
      {images.map((data, index) => {
        return <Image name={data.name} src={data.img} key={index}/>
      })}
    </div>
  )
}

export default Images;