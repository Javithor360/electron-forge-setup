import { Tree } from 'primereact/tree'
import { useNavigate } from 'react-router-dom';
import React from 'react'

const Sidebar = () => {

    const navigate = useNavigate();

    const handleNodeSelect = (event: any) => {
        const selectedNodeKey = event.node.key;
        switch (selectedNodeKey) {
            case 'child1-1':
                navigate('/index');
                break;
            case 'child1-2':
                navigate('/test');
                break;
            case 'child1-3':
                navigate('/draggable');
                break;
            case 'child1-4':
                navigate('/mention');  
                break;
            case 'child1-5':
                navigate('/mention-explorer-menu');  
                break;
            case 'child2-1':
                navigate('/custom-mention');
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <Tree onNodeDoubleClick={handleNodeSelect} value={[
                {
                    key: 'parent1',
                    label: 'Main',
                    children: [
                        {
                            key: 'child1-1',
                            label: 'Index'
                        },
                        {
                            key: 'child1-2',
                            label: 'Draggable TabMenu',
                        },
                        {
                            key: 'child1-3',
                            label: 'Draggable Elements',
                        },
                        {
                            key: 'child1-4',
                            label: 'Mention Explorer',
                        },
                        {
                            key: 'child1-5',
                            label: 'Mention Explorer Menu'
                        }
                    ]
                },
                {
                    key: 'parent2',
                    label: 'Extra',
                    children: [
                        {
                            key: 'child2-1',
                            label: 'Custom Mention',
                            icon: 'pi pi-fw pi-file'
                        }
                    ]
                }
                // {
                //     key: 'parent2',
                //     label: 'Parent 2',
                //     children: [
                //         {
                //             key: 'child2-1',
                //             label: 'Child 2.1',
                //             children: [
                //                 { key: 'subchild2-1-1', label: 'Subchild 2.1.1' },
                //                 { key: 'subchild2-1-2', label: 'Subchild 2.1.2' },
                //                 { key: 'subchild2-1-3', label: 'Subchild 2.1.3' },
                //                 { key: 'subchild2-1-4', label: 'Subchild 2.1.4' }
                //             ]
                //         },
                //         {
                //             key: 'child2-2',
                //             label: 'Child 2.2',
                //             children: [
                //                 { key: 'subchild2-2-1', label: 'Subchild 2.2.1' },
                //                 { key: 'subchild2-2-2', label: 'Subchild 2.2.2' },
                //                 { key: 'subchild2-2-3', label: 'Subchild 2.2.3' },
                //                 { key: 'subchild2-2-4', label: 'Subchild 2.2.4' }
                //             ]
                //         },
                //         {
                //             key: 'child2-3',
                //             label: 'Child 2.3',
                //             children: [
                //                 { key: 'subchild2-3-1', label: 'Subchild 2.3.1' },
                //                 { key: 'subchild2-3-2', label: 'Subchild 2.3.2' },
                //                 { key: 'subchild2-3-3', label: 'Subchild 2.3.3' },
                //                 { key: 'subchild2-3-4', label: 'Subchild 2.3.4' }
                //             ]
                //         }
                //     ]
                // }
            ]} />
        </div>
    )
}

export default Sidebar
