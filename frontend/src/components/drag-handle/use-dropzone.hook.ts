import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { CreateRelationshipNodeDto } from '../../middlewares/node-relationship/models/create-relationship-node.dto';
// import { addRelationship } from '../../middlewares/node-relationship/slice';
import { createRelationship as addRelationship } from '../../middlewares/node-relationship/thunks';

import { BlockTransferData } from './block-transfer-data.interface';
import { ItemTypes } from './item-types.const';

export function useDropzone(reference: string) {
    const dispatch = useDispatch();
    return useDrop(() => ({
        accept: ItemTypes.BLOCK,
        drop: (item: BlockTransferData) => {
            dispatch(
                addRelationship(
                    new CreateRelationshipNodeDto({
                        from: item.reference,
                        to: reference,
                    })
                )
            );
        },
        collect: (monitor) => ({
            hovered: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item) => item.reference !== reference,
    }));
}
