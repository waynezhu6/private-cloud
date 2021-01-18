import React, { useEffect, useState } from 'react';
import API from '../lib/api';
import Image from '../components/Image';
import styles from '../styles/Images.module.scss';

const Images = (props) => {

  const [fileNames, setFileNames] = useState([]); 
  const [images, setImages] = useState([]);

  useEffect(() => {

    const getFileNames = async() => {
      let filenames = await API.getFileNames(props.token);
      console.log(filenames);

      if(filenames.images){
        setFileNames(filenames.images);
        let raw = [];
        
        for(const file of filenames.images)
          raw.push(await API.getImage(props.token, file));

        console.log(raw);
        setImages(raw);
      }
    }

    getFileNames();

  }, [props.token]);

  return(
    <div className={styles.body}>
      {fileNames.map((name, index) => {
        console.log(images[index]);
        return <Image filename={name} src={images[index]}/>
      })}
    </div>
  )
}

export default Images;