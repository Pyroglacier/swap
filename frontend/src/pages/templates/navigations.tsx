import React, { ReactNode } from 'react';

import { BottomBar } from '../../modules/navigation/bottom-bar';
import { TopBar } from '../../modules/navigation/top-bar';

type Props = {
    children?: ReactNode;
};

export function Navigations(props: Props) {
    const { children = null } = props;
    return (
        <div className="App">
            <TopBar />
            {children}
            <BottomBar />
        </div>
    );
}
