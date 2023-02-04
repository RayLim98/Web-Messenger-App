import { styled } from '@mui/material'

const StyledDropZone = styled('div')`
  display: flex;
  justify-content: center;
  background-color: rgba(255,255,255,0.1);
  width: 90%;
  height: 90%;
  min-height: 15rem;
  border: rgba(255,255,255,0.1) dashed 2px;
  border-radius: 25px;
  cursor: pointer; 
  :hover {
    background-color: rgba(255,255,255,0.3);
    border: rgba(255,255,255,0.3) dashed 2px;
  }
`

const StyledP = styled('p')`
  color: white;
  text-align: center;
`
export {
    StyledDropZone,
    StyledP
}