import React, { ComponentClass, FunctionComponent } from 'react';

import { AllTime } from '../../pages/all-time';
import { Homepage } from '../../pages/homepage';
import { PageNotFound } from '../../pages/page-not-found';
import { Today } from '../../pages/today';

type Routes = Record<string, RouteRecord>;

type RouteRecord = {
    component: FunctionComponent | ComponentClass;
    title?: string;
};

export const routes: Routes = {
    '/today': {
        title: 'Today',
        component: Today,
    },
    '/all-time': {
        title: 'AllTime',
        component: AllTime,
    },
    '/': {
        title: 'Home',
        component: Homepage,
    },
    '*': {
        title: 'Page Not Found',
        component: PageNotFound,
    },
};
