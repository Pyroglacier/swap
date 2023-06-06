import React from 'react';

import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';

type Props = {
    onDelete: () => void;
};

export function DeleteButton(props: Props) {
    const { onDelete = () => {} } = props;
    const display = 'hidden';
    return (
        <Button style={{ display }} onClick={onDelete}>
            <Delete />
        </Button>
    );
}
