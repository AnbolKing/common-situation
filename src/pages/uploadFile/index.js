import React, {
  useRef,
  useState,
} from 'react';
import axios from 'axios';
import './style.less';

const UploadFile = (props) => {
  const { accept, limit, multiple, action, data, onProgress } = props;
  const fileInput = useRef(null);
  const [fileInfo, setFileInfo] = useState([]);
  const handleUpdateFile = (fileInfo, newStatus) => {
    setFileInfo(prevList => {
      return prevList.map(prevFile => {
        if(prevFile.uid === fileInfo.uid) {
          return {
            ...prevFile,
            ...newStatus,
          }
        }
        else {
          return prevFile;
        }
      })
    })
  }
  const handleUploadFile = (file) => {
    let fileInfo = {
      name: file.name,
      size: file.size,
      type: file.type,
      uploadTime: file.lastModifiedDate,
      modifyTime : file.lastModified,
      uid: file.lastModified,
      percent: 0,
      status: 'ready',
    }
    setFileInfo(prevList => {
      return [fileInfo, ...prevList]
    })
    const uploadFile = new FormData();
    uploadFile.append('file', file);
    if(data) {
      Object.keys(data).forEach(key => {
        uploadFile.append(key, data[key]);
      })
    }
    axios.post(action||'https://www.mocky.io/v2/5cc8019d300000980a055e76', uploadFile, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      onUploadProgress:(e) => { 
        console.log(e);
        if(onProgress) {
          let percent = Math.round(e.loaded*100/e.total) || 0;
          if(percent < 100) {
            let upStatue = {
              status: 'updating',
              percent,
            }
            handleUpdateFile(fileInfo, upStatue)
            if(onProgress) {
              onProgress(percent, file);
            }
          }
        }
      }
    }).then(res => {
      console.log(res);
      let sucStatus = {
        statue: 'success',
        res: res.data,
      }
      handleUpdateFile(fileInfo, sucStatus)
    }).catch(err => {
      console.log(err);
      let errStatus = {
        statue: 'error',
        err: err,
      }
      handleUpdateFile(fileInfo, errStatus)
    })
  }
  const handlePost = (fileList) => {
    let filesArray = Array.from(fileList);
    filesArray.forEach(file => {
      if(limit && file.size>limit) {
        console.log('file size is too large!');
      } 
      else {
        handleUploadFile(file);
      }
      handleUploadFile(file);
    })
  }
  const handleChange = (e) => {
    handlePost(e.target.files)
    if(fileInput.current) {
      fileInput.current.value = ''
    }
  }
  return (
    <div className="upload-container">
      <input
        className='unload-input'
        type='file'
        multiple={multiple ? multiple : false}
        accept={accept ? accept : '*'}
        onChange={handleChange}
        ref={fileInput}
      />
    </div>
  )
}

export default UploadFile;