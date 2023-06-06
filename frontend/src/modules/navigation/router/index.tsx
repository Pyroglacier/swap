import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from '../routes';

function CustomRoutes() {
    return (
        <Routes>
            {Object.entries(routes).map(([path, record]) => {
                const { component } = record;
                return (
                    <Route
                        key={path}
                        path={path}
                        element={React.createElement(component)}
                    />
                );
            })}
        </Routes>
    );
}

export function Router() {
    return (
        <BrowserRouter>
            <CustomRoutes />
        </BrowserRouter>
    );
}
