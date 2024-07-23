import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Index from './Index'
import Layout from './common/Layout'
import DraggableTabMenu from './DraggableTabMenu'
import DraggableElements from './DraggableElements'

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path='/index' element={<Index />} />
                    <Route path='/test' element={<DraggableTabMenu />} />
                    <Route path='/draggable' element={<DraggableElements />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default App
