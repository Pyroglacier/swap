import React from 'react';

import { Typography } from '@mui/material';

import { EntityNode } from '../../middlewares/node-entity/models';
import { useDropzone } from '../drag-handle/use-dropzone.hook';

type Props = {
    node: EntityNode;
};

export function Inner(props: Props) {
    const { node } = props;
    const { ref, data } = node;
    const [dropProps, drop] = useDropzone(ref);
    const { hovered, canDrop } = dropProps || {};
    const backgroundColor = hovered && canDrop ? 'pink' : 'white';
    return (
        <div ref={drop} style={{ flex: 1, backgroundColor }}>
            <Typography style={{ flex: 1 }}>{data || 'EMPTY'}</Typography>
        </div>
    );
}
