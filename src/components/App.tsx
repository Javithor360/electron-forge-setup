import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Index from './Index'
import Layout from './common/Layout'

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Index />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default App
