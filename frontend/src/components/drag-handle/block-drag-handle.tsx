import { DragIndicator } from '@mui/icons-material';

import { withDrag } from './with-drag.hoc';

export const BlockDragHandle = withDrag()(DragIndicator);
