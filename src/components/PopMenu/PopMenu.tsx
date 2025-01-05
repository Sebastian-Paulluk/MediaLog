import * as React from 'react';
import './PopMenu.scss'
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';

interface PopMenuTypes {
    children: React.ReactNode;
    options: { name: string; icon: string; onClick: () => void }[];
    header?: string;
    vertical?: 'top' | 'center' | 'bottom'; 
    horizontal?: 'left' | 'center' | 'right'; 
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
        border: '1px solid #606060',
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


export const PopMenu: React.FC<PopMenuTypes> = ({ children, options, header, vertical, horizontal }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const buttonRef = React.useRef<HTMLDivElement | null>(null); 

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);

        if (buttonRef.current) {
            buttonRef.current.focus();
        }
    };

    const handleOptionFunction = (optionOnClick: () => void) => {
        setAnchorEl(null);
        optionOnClick();
    };

    const handleMenuClick = (e: React.MouseEvent) => {
        e.stopPropagation();  
    };

    return (
        <div className="pop-menu" onClick={handleMenuClick}>

            <div ref={buttonRef} onClick={handleClick}>
                {children}
            </div>

            <StyledMenu
                id="menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                    autoFocus: false, 
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{
                    vertical: vertical || 'top',
                    horizontal: horizontal || 'right',
                }}
            >
                {header && [
                    <MenuItem
                        key="header"
                        style={{ 
                            color: '#bbbbbb',
                            pointerEvents: 'none', 
                            cursor: 'default',
                            display: 'flex',     
                            justifyContent: 'center', 
                            alignItems: 'center',  
                            textAlign: 'center',
                            paddingTop: '10px',   
                            paddingBottom: '4px', 
                            minHeight: 'unset',
                            backgroundColor: '#303030'
                        }}
                    >
                        {header}
                    </MenuItem>,
                    <Divider key="divider" sx={{ borderColor: '#606060' }} />
                ]}

                {options.map((option, index) => (
                    <MenuItem key={index} onClick={()=>handleOptionFunction(option.onClick)} disableRipple>
                        {
                            option.icon === 'edit' ? ( <EditIcon /> ) :
                            option.icon === 'move' ? ( <SwapHorizIcon /> ) :
                            option.icon === 'delete' ? ( <DeleteIcon /> ) :
                            option.icon === 'logout' ? ( <LogoutIcon /> ) :
                            option.icon === 'settings' ? ( <SettingsIcon /> ) :
                            null
                        }
                        
                        {option.name}
                    </MenuItem>
                ))}
                

            </StyledMenu>
        </div>
    )
}


