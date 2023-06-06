import React from 'react';

import { Delete } from '@mui/icons-material';
import { Card, Typography } from '@mui/material';

import { useAppDispatch } from '../../middlewares/hooks';
import { EntityNode } from '../../middlewares/node-entity/models';
import { deleteEntity } from '../../middlewares/node-entity/thunks';
import { DragDeletable } from '../drag-deletable';
import { BlockDragHandle } from '../drag-handle';

import { DeleteButton } from './delete-button';
import { Inner } from './inner';

type Props = {
    data: EntityNode;
};

export function SketchEntry(props: Props) {
    const { data } = props;
    const dispatch = useAppDispatch();
    // if (!data.data) return null;
    // const onDelete = () => {};
    const onDelete = () => dispatch(deleteEntity(data.ref));
    return (
        <DragDeletable onDelete={onDelete}>
            <Card
                style={{
                    padding: 10,
                    marginTop: 5,
                    marginBottom: 5,
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'stretch',
                }}
            >
                <BlockDragHandle reference={data.ref} />
                <Inner node={data} />
                <DeleteButton onDelete={onDelete} />
            </Card>
        </DragDeletable>
    );
}
