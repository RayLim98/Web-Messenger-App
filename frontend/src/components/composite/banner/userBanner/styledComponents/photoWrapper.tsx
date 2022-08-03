import { Box } from '@mui/material'

interface Props {
  size?:number 
  children: any
  onClick: ()=> void
}

const PhotoWrapper = ({size, onClick, children}: Props) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        backgroundColor: '#153b60',
        borderRadius: '15px',
        padding: '10px',
        height: `${ size || 10 }rem`,
        width: `${ size || 10 }rem`,
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
        {children}
    </Box>
  )
}

export default PhotoWrapper