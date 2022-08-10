import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { StyledDropZone, StyledP } from '../styledComponents/styledDropZone'

const MyDropzone = ({currentImage, setImage}) => {
  const onDrop = useCallback(acceptedFiles => {
    setImage(acceptedFiles[0])
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, maxFiles: 1})

  return (
    <StyledDropZone {...getRootProps()}>
      <input {...getInputProps()} />
      {
        currentImage && currentImage.original
        ? 
        <StyledP> 
            {currentImage.original.name} 
        </StyledP>
        : isDragActive
            ? <StyledP>Drop the files here ...</StyledP>
            : <StyledP>Drag 'n' drop some files here, or click to select files</StyledP>
      }
    </StyledDropZone>
  )
}

export default MyDropzone
