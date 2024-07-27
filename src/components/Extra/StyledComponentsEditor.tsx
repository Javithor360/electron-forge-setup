import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor';
import { useRef, useState, useEffect } from 'react';
import Quill from 'quill';
import { Delta } from 'quill/core';

// Creating a custom Blot for the mention (maybe this could be defined outside)
class MentionBlot extends (Quill.import('blots/inline') as any) {
    static create(value: any) {
        const node = super.create() as HTMLElement;
        node.setAttribute('data-props', JSON.stringify(value)); // Store the custom data in the element
        node.setAttribute('class', 'mention-highlight'); // Add a class for unique styling
        node.setAttribute('contenteditable', 'false'); // Avoid edit content
        node.textContent = value.content; // Set the text content
        return node;
    }

    static formats(node: HTMLElement) {
        const data = node.getAttribute('data-props'); // Retrieve the custom data from the element
        return data ? JSON.parse(data) : {};
    }
}

MentionBlot.blotName = 'mention'; // Define the name of the custom blot
MentionBlot.tagName = 'span'; // Define the tag name for the custom blot
Quill.register(MentionBlot); // Register the custom blot

const StyleComponentEditor = () => {
    const [text, setText] = useState('');
    const editorRef = useRef<Editor>(null);

    // Add a matcher to the clipboard module to handle the copy-paste of the custom elements
    useEffect(() => {
        const editor = editorRef.current?.getQuill();
        if (editor) {
            editor.clipboard.addMatcher('SPAN', (node: HTMLElement, delta: Delta) => {
                const data = JSON.parse((node as HTMLElement).getAttribute('data-props') || '{}'); // Retrieve the custom data
                delta.ops = delta.ops.map(op => {
                    if (op.insert && typeof op.insert === 'string' && (node as HTMLElement).textContent === op.insert) {
                        return { insert: { mention: data } };
                    }
                    return op;
                });
                return delta;
            });
        }
    }, []);

    // Function to insert a styled element in the editor
    const insertStyledElement = (dataObject: any, content: string) => {
        const editor = editorRef.current?.getQuill(); // Get the Quill instance from the Editor component
        if (editor) {
            const selection = editor.getSelection(); // Get the current selection
            if (selection) {
                const range = selection.index; // Determine the position of the cursor

                // Insert the styled element at the cursor position
                editor.insertEmbed(range, 'mention', { ...dataObject, content });

                // Move the cursor after the new content
                editor.setSelection(range + content.length, Quill.sources.SILENT);

                // Delta instance to add a space after the new content
                const delta = new Delta().retain(range + content.length).insert(' ');

                // Update the editor contents
                editor.updateContents(delta, Quill.sources.USER);

                // Move the cursor after the space
                editor.setSelection(range + content.length + 1, Quill.sources.SILENT);

                // Update the text state
                setText(editor.root.innerHTML);
            }
        }
    };

    const readElementProps = () => {
        const editor = editorRef.current?.getQuill();
        if (editor) {
            const elements = editor.root.querySelectorAll('[data-props]'); // Get all elements with custom data
            elements.forEach((element: Element) => {
                const serializedData = element.getAttribute('data-props');
                if (serializedData) {
                    const dataObject = JSON.parse(serializedData); // Parse the custom data
                    console.log(`ID: ${dataObject.id}, Name: ${dataObject.name}, UUID: ${dataObject.uuid}`); // Log the custom data
                }
            });
        }
    };

    return (
        <div>
            <Editor ref={editorRef} value={text} onTextChange={(e) => setText(e.htmlValue as string)} showHeader={false} formats={['mention']} />
            <div className="flex gap-8 mt-4">
                <Button onClick={() => insertStyledElement({ id: 1, name: 'Test1', uuid: '1234' }, '@Test1')}>Insertar Texto 1</Button>
                <Button severity="warning" onClick={() => insertStyledElement({ id: 2, name: 'Test2', uuid: '5678' }, '@Test2')}>Insertar Texto 2</Button>
                <Button severity="secondary" onClick={readElementProps}>Leer Props de los Elementos</Button>
            </div>
        </div>
    );
};

export default StyleComponentEditor;
