import * as React from 'react';
import './PopMenu.scss'
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface PopMenuTypes {
    children: React.ReactNode;
    options: {
        name: string;
        icon: string;
        onClick: (() => void) | ((e: React.MouseEvent) => void); 
    }[];
}

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
    ))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 120,
        color: '#bbbbbb',
        backgroundColor: '#303030',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '0px',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: '#bbbbbb',
                marginRight: theme.spacing(1.5),
                transition: 'color 0.3s ease',
            },
            transition: 'background-color 0.3s ease, color 0.3s ease',
            '&:hover': {
                backgroundColor: '#505050',
                color: 'white',
                '& .MuiSvgIcon-root': {
                    color: 'white',  
                }
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
        ...theme.applyStyles('dark', {
            color: theme.palette.grey[300],
        }),
    },
}));


export const PopMenu: React.FC<PopMenuTypes> = ({ children, options }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOptionFunction = (e: React.MouseEvent,optionOnClick: (() => void) | ((e: React.MouseEvent) => void)) => {
        setAnchorEl(null);
        if (optionOnClick.length === 1) {
            (optionOnClick as (e: React.MouseEvent) => void)(e); 
        } else {
            (optionOnClick as () => void)(); 
        }
    };

    return (
        <div className='pop-menu'>

            <div onClick={handleClick}>
                {children}
            </div>

            <StyledMenu
                id="menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        onClick={(e)=>handleOptionFunction(e, option.onClick)}
                        disableRipple
                    >
                        {
                            option.icon === 'edit' ? ( <EditIcon /> ) :
                            option.icon === 'delete' ? ( <DeleteIcon /> ) :
                            null
                        }
                        
                        {option.name}
                    </MenuItem>
                ))}
                

            </StyledMenu>
        </div>
    )
}


