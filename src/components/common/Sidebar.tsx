import { Tree } from 'primereact/tree'
import React from 'react'

const Sidebar = () => {
  return (
    <div>
      <Tree value={[
        {
            key: 'parent1',
            label: 'Parent 1',
            children: [
                {
                    key: 'child1-1',
                    label: 'Child 1.1',
                    children: [
                        { key: 'subchild1-1-1', label: 'Subchild 1.1.1' },
                        { key: 'subchild1-1-2', label: 'Subchild 1.1.2' },
                        { key: 'subchild1-1-3', label: 'Subchild 1.1.3' },
                        { key: 'subchild1-1-4', label: 'Subchild 1.1.4' }
                    ]
                },
                {
                    key: 'child1-2',
                    label: 'Child 1.2',
                    children: [
                        { key: 'subchild1-2-1', label: 'Subchild 1.2.1' },
                        { key: 'subchild1-2-2', label: 'Subchild 1.2.2' },
                        { key: 'subchild1-2-3', label: 'Subchild 1.2.3' },
                        { key: 'subchild1-2-4', label: 'Subchild 1.2.4' }
                    ]
                },
                {
                    key: 'child1-3',
                    label: 'Child 1.3',
                    children: [
                        { key: 'subchild1-3-1', label: 'Subchild 1.3.1' },
                        { key: 'subchild1-3-2', label: 'Subchild 1.3.2' },
                        { key: 'subchild1-3-3', label: 'Subchild 1.3.3' },
                        { key: 'subchild1-3-4', label: 'Subchild 1.3.4' }
                    ]
                }
            ]
        },
        {
            key: 'parent2',
            label: 'Parent 2',
            children: [
                {
                    key: 'child2-1',
                    label: 'Child 2.1',
                    children: [
                        { key: 'subchild2-1-1', label: 'Subchild 2.1.1' },
                        { key: 'subchild2-1-2', label: 'Subchild 2.1.2' },
                        { key: 'subchild2-1-3', label: 'Subchild 2.1.3' },
                        { key: 'subchild2-1-4', label: 'Subchild 2.1.4' }
                    ]
                },
                {
                    key: 'child2-2',
                    label: 'Child 2.2',
                    children: [
                        { key: 'subchild2-2-1', label: 'Subchild 2.2.1' },
                        { key: 'subchild2-2-2', label: 'Subchild 2.2.2' },
                        { key: 'subchild2-2-3', label: 'Subchild 2.2.3' },
                        { key: 'subchild2-2-4', label: 'Subchild 2.2.4' }
                    ]
                },
                {
                    key: 'child2-3',
                    label: 'Child 2.3',
                    children: [
                        { key: 'subchild2-3-1', label: 'Subchild 2.3.1' },
                        { key: 'subchild2-3-2', label: 'Subchild 2.3.2' },
                        { key: 'subchild2-3-3', label: 'Subchild 2.3.3' },
                        { key: 'subchild2-3-4', label: 'Subchild 2.3.4' }
                    ]
                }
            ]
        }
    ]} />
    </div>
  )
}

export default Sidebar
