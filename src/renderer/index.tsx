import React from 'react';

import { HashRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Index from '../components/Index';

const Root = (): React.ReactElement => {
    return (
        <React.StrictMode>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                </Routes>
            </HashRouter>
        </React.StrictMode>
    )
}

const rootElement: HTMLElement | null = document.getElementById("root");
//@ts-ignore
const root = createRoot(rootElement);

root.render(<Root />);