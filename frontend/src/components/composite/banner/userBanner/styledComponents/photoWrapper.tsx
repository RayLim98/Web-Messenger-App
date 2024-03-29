import { Box } from '@mui/material'

interface Props {
  size?:number 
  children: any
  onClick: ()=> void
}

const PhotoWrapper = ({size, onClick, children}: Props) => {
  const padding = size? size/2 : 10;
  return (
    <Box 
      sx={{
        display: 'flex',
        borderRadius: '25rem',
        padding: `${padding}px`,
        height: `${ size || 10 }rem`,
        width: `${ size || 10 }rem`,
        cursor: 'pointer',
        backgroundColor: 'primary.main',
        justifyContent: "center",
      }}
      onClick={onClick}
    >
        {children}
    </Box>
  )
}

export default PhotoWrapper