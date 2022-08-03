import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { StyledDropZone, StyledP } from '../styledComponents/styledDropZone'

const MyDropzone = ({currentImage, setImage, setSelection}) => {
  const onDrop = useCallback(acceptedFiles => {
    setImage({
      original: acceptedFiles[0],
      cropped: null
    })
    setSelection('Edit Photo')
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