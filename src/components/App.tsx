import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Index from './Index'
import Layout from './common/Layout'
import DraggableTabMenu from './DraggableTabMenu'
import DraggableElements from './DraggableElements'
import MentionSample from './MentionSample'
import MentionMenu from './MentionMenu'
import CustomMention from './Extra/CustomMention'

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path='/index' element={<Index />} />
                    <Route path='/test' element={<DraggableTabMenu />} />
                    <Route path='/draggable' element={<DraggableElements />} />
                    <Route path='/mention' element={<MentionSample />} />
                    <Route path='/mention-explorer-menu' element={<MentionMenu />} />
                    <Route path='/custom-mention' element={<CustomMention />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default App
