import React from 'react';

import { createRoot } from 'react-dom/client';

import App from '../components/App';
import { PrimeReactProvider } from 'primereact/api';

const Root = (): React.ReactElement => {
    return (
        <React.StrictMode>
            <PrimeReactProvider>
                <App />
            </PrimeReactProvider>
        </React.StrictMode>
    )
}

const rootElement: HTMLElement | null = document.getElementById("root");
//@ts-ignore
const root = createRoot(rootElement);

root.render(<Root />);