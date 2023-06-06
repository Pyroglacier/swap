import * as React from 'react';

import { Favorite, Folder, LocationOn, Restore } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';

import { logger } from '../../../utils';

export function BottomBar() {
    const [value, setValue] = React.useState('recents');

    const handleChange = (e: any, newValue: any) => {
        setValue(newValue);
        logger.debug(newValue);
        // logger.error(e);
    };

    return (
        <Paper
            sx={{ position: 'sticky', bottom: 0, left: 0, right: 0 }}
            elevation={3}
        >
            <BottomNavigation
                // sx={{ width: 500 }}
                value={value}
                onChange={handleChange}
            >
                <BottomNavigationAction
                    label="Recents"
                    value="recents"
                    icon={<Restore />}
                />
                <BottomNavigationAction
                    label="Favorites"
                    value="favorites"
                    icon={<Favorite />}
                />
                <BottomNavigationAction
                    label="Nearby"
                    value="nearby"
                    icon={<LocationOn />}
                />
                <BottomNavigationAction
                    label="Folder"
                    value="folder"
                    icon={<Folder />}
                />
            </BottomNavigation>
        </Paper>
    );
}
