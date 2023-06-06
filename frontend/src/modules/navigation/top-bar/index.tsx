import React from 'react';

import { AppBar, Menu, MenuItem, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

import { routes } from '../routes';

export function TopBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                {Object.entries(routes).map(([path, record]) => (
                    <MenuItem key={path}>
                        <Link to={path}>{record.title}</Link>
                    </MenuItem>
                ))}
            </Toolbar>
        </AppBar>
    );
}
