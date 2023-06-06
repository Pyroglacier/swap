import React from 'react';

import { useDrag } from 'react-dnd';

import { BlockTransferData } from './block-transfer-data.interface';
import { ItemTypes } from './item-types.const';

interface Style {
    style?: Record<string, any>;
}

export function withDrag() {
    return function (InnerComponent: React.ComponentType) {
        return function (props: BlockTransferData & Style) {
            const { reference, style } = props;
            const [, drag] = useDrag(() => ({
                type: ItemTypes.BLOCK,
                item: { reference },
            }));
            return (
                <div ref={drag} style={style ?? {}}>
                    <InnerComponent />
                </div>
            );
        };
    };
}
