import { useState, useRef, useEffect, TransitionEventHandler } from 'react'
import { Autocomplete, Box, IconButton } from '@mui/material'
import { StyledInput } from './styles';
import SearchIcon from './SvgIcon';


const options = ['The Godfather', 'Pulp Fiction'];

interface SearchProps {
    value: string | null
    setValue: (value: string | null) => void
}

const SearchField = ({value, setValue}: SearchProps) => {
    const [width, setWidth] = useState<number>(0)
    const [active, setActive] = useState<boolean>(false)
    const textinput = useRef<HTMLInputElement>()

    const onBlur = () => setWidth(0)
    
    const onFocus = async () => {
        setWidth(100);
        setActive(true)
    }

    const onAnimateEnd = ({propertyName}: {propertyName: string}) => {
        if(propertyName === 'width')  
            if(width === 0) setActive(false)
            else if(textinput.current) textinput.current.focus()
    }
    

    return (
        <Box 
            sx = {{
                maxWidth: '232px',
                display: 'flex',
                flex:1,
                justifyContent: 'flex-end',
            }}
        >
            <Autocomplete
                value={value}
                onChange={(e, newValue) => setValue(newValue)}
                onBlur={onBlur}
                onFocus={onFocus}
                onTransitionEnd={event => onAnimateEnd(event)}
                options={options}
                forcePopupIcon={false}
                id="search-expanding-box"
                sx={{ width: `${width}%`, transition: 'width 200ms ease-out', }}
                renderInput={(params) => 
                    <Box 
                        sx = {{ 
                            display: 'flex', 
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            width: '100%' ,
                        }}
                    >
                        <IconButton 
                            onClick={onFocus}
                        >
                            <SearchIcon fontSize='medium'/>
                        </IconButton>
                        <StyledInput
                            {...params}
                            placeholder='Search for channels'
                            variant='standard'
                            inputRef={textinput}
                            InputProps={{...params.InputProps, disableUnderline: true}}
                            active={active}
                        />
                    </Box>
            }
            />
        </Box>
    )
}

export default SearchField
