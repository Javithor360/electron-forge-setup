import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Index from './Index'
import Layout from './common/Layout'
import DraggableTabMenu from './DraggableTabMenu'
import DraggableElements from './DraggableElements'
import MentionSample from './MentionSample'
import MentionMenu from './MentionMenu'
import CustomMention from './Extra/CustomMention'
import StyleComponentEditor from './Extra/StyledComponentsEditor'
import FinalMention from './Extra/FinalMention'

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
                    <Route path='/text-editor' element={<StyleComponentEditor />} />
                    <Route path='/final-mention' element={<FinalMention />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default App
