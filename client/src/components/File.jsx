import React, { useEffect } from 'react';
import { FileIcon, defaultStyles } from 'react-file-icon';

const File = (props) => {

  const [info, setInfo] = useState();

  useEffect(() => {
    setPath(props.info);
  }, []);

  return(
    <div>
      <FileIcon extension="docx" {...defaultStyles.docx} />;
    </div>
  );
}

export default File;
