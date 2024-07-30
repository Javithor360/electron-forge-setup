import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Database } from '../../types/database';
import { MenuItem } from 'primereact/menuitem';
import { InputTextarea } from 'primereact/inputtextarea';
import { TieredMenu } from 'primereact/tieredmenu';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';
import Quill from 'quill';
import MentionBlot from '../util/MentionBlot';
import { Delta } from 'quill/core';
import { Button } from 'primereact/button';

const FinalMention = () => {
  // Simulated database object
  const database: any = {
    datname: "lumosapp",
    schemas_list: [
      {
        collection_name: "Home",
        collection_id: 1,
        tables: [
          {
            table_name: "FirstTable",
            table_uuid: 1,
            columns: {
              "1": { column_name: "date", column_datatype: "VARCHAR", column_index: 1 },
              "2": { column_name: "start_time", column_datatype: "VARCHAR", column_index: 2 },
              // ...otros campos
            },
          },
          {
            table_name: "SecondTable",
            table_uuid: 2,
            columns: {
              "1": { column_name: "age", column_datatype: "INTEGER", column_index: 1 },
              "2": { column_name: "name", column_datatype: "VARCHAR", column_index: 2 },
              "3": { column_name: "email", column_datatype: "VARCHAR", column_index: 3 },
              // ...otros campos
            },
          }
          // ...otras tablas
        ],
      },
      {
        collection_name: "Work",
        collection_id: 2,
        tables: [
          {
            table_name: "SecondTable",
            table_uuid: 3,
            columns: {
              "1": { column_name: "age", column_datatype: "INTEGER", column_index: 1 },
              "2": { column_name: "name", column_datatype: "VARCHAR", column_index: 2 },
              "3": { column_name: "email", column_datatype: "VARCHAR", column_index: 3 },
              // ...otros campos
            },
          },
          {
            table_name: "ThirdTable",
            table_uuid: 4,
            columns: {
              "1": { column_name: "address", column_datatype: "VARCHAR", column_index: 1 },
              "2": { column_name: "phone", column_datatype: "VARCHAR", column_index: 2 },
              // ...otros campos
            },
          }
          // ...otras tablas
        ],
      },
      {
        collection_name: "School",
        collection_id: 3,
        tables: [
          {
            table_name: "FirstTable",
            table_uuid: 5,
            columns: {
              "1": { column_name: "date", column_datatype: "VARCHAR", column_index: 1 },
              "2": { column_name: "start_time", column_datatype: "VARCHAR", column_index: 2 },
              // ...otros campos
            },
          },
          {
            table_name: "ThirdTable",
            table_uuid: 6,
            columns: {
              "1": { column_name: "address", column_datatype: "VARCHAR", column_index: 1 },
              "2": { column_name: "phone", column_datatype: "VARCHAR", column_index: 2 },
              // ...otros campos
            },
          }
          // ...otras tablas
        ],
      }
      // ...otros esquemas
    ],
  };

  const prevValueRef = useRef<string>('');
  const tieredMenuRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor>(null);

  const lastClickTimeRef = useRef<number>(0);

  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [isMentionActive, setIsMentionActive] = useState(false);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (tieredMenuRef.current && !tieredMenuRef.current.contains(event.target as Node)) {
      setMenuVisible(false);
      setIsMentionActive(false);
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setMenuVisible(false);
      setIsMentionActive(false); // Prevent showing the menu immediately after closing with Escape
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);

  useEffect(() => {
    Quill.register(MentionBlot, true); // Register the custom blot
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
  }, [])

  const showMenuAtPosition = (position: number) => {
    const editor = editorRef.current?.getQuill();
    if (editor) {
      const text = editor.getText().substring(0, position);
      const dummyElement = document.createElement('span');
      dummyElement.style.visibility = 'hidden';
      dummyElement.style.position = 'absolute';
      dummyElement.style.whiteSpace = 'pre';
      dummyElement.textContent = text;

      document.body.appendChild(dummyElement);

      const rect = dummyElement.getBoundingClientRect();
      const inputRect = editor.root.getBoundingClientRect();

      setMenuPosition({
        top: inputRect.top + window.scrollY + rect.height + 10,
        left: inputRect.left + window.scrollX + rect.width + 10
      });

      document.body.removeChild(dummyElement);
      setMenuVisible(true);
    }
  };

  // @ IS NOT BEING DETECTED WHEN WRITTEN AT THE END
  const handleChange = (e: EditorTextChangeEvent) => {
    const editor = editorRef.current?.getQuill();
    if (!editor) return;
  
    const value = editor.getText();
    const prevValue = prevValueRef.current;
    const cursorPosition = editor.getSelection()?.index ?? 0;
  
    // setShouldShowMenu(true); // Reactivate shouldShowMenu when something new is typed
  
    // Check if @ was just added
    if (value.length > prevValue.length) {
      const addedChar = value[cursorPosition - 1];
      const prevChar = cursorPosition > 1 ? value[cursorPosition - 2] : '';
      const nextChar = cursorPosition < value.length ? value[cursorPosition] : '';

      if (addedChar === '@' && (cursorPosition === 1 || prevChar === ' ' || prevChar === '\n')) {
        if (nextChar === '' || nextChar === ' ' || nextChar === '\n') {
          console.log('@ detected at position:', cursorPosition - 1);
          showMenuAtPosition(cursorPosition);
          setIsMentionActive(true);
        }
      } else if (isMentionActive) {
        // Close the menu when typing anything after an @
        setMenuVisible(false);
        setIsMentionActive(false);
      }
    } else if (value.length < prevValue.length) {
      // Text was deleted
      if (isMentionActive && (cursorPosition === 0 || value[cursorPosition - 1] !== '@')) {
        setMenuVisible(false);
        setIsMentionActive(false);
      }
    }
  
    // Update previous value reference
    prevValueRef.current = value;
  };

  const handleCursorChange = () => {
    const editor = editorRef.current?.getQuill();

    if (!editor) return;

    const cursorPosition = editor.getSelection()?.index ?? 0;
    const value = editor.getText();

    if (cursorPosition > 0 && value[cursorPosition - 1] === '@') {
      const prevChar = cursorPosition > 1 ? value[cursorPosition - 2] : '';
      const nextChar = cursorPosition < value.length ? value[cursorPosition] : '';

      if ((cursorPosition === 1 || prevChar === ' ' || prevChar === '\n') &&
          (nextChar === '' || nextChar === ' ' || nextChar === '\n')) {
        console.log('Cursor placed at position:', cursorPosition - 1, 'in front of @');
        showMenuAtPosition(cursorPosition);
        setIsMentionActive(true);
      } else {
        setMenuVisible(false);
        setIsMentionActive(false);
      }
    } else {
      setMenuVisible(false);
      setIsMentionActive(false);
    }
  };

  const focusEditor = () => {
    setTimeout(() => {
      const editor = editorRef.current?.getQuill();
      if (editor) {
        editor.focus();
      }
    }, 0);
  };

  // Function to insert a styled element in the editor
  const insertStyledElement = (content: string, dataObject: any,) => {
    const editor = editorRef.current?.getQuill(); // Get the Quill instance from the Editor component
    if (editor /* && editor.hasFocus() */) {
      const selection = editor.getSelection(); // Get the current selection
      if (selection) {
        const range = selection.index; // Determine the position of the cursor

        // Delete original @ symbol
        editor.deleteText(range - 1, 1, Quill.sources.USER);

        // Insert the styled element at the cursor position
        editor.insertEmbed(range - 1, 'mention', { ...dataObject, content: `@${content}` });

        // Move the cursor after the new content
        editor.setSelection(range - 1 + content.length + 1, Quill.sources.SILENT);

        // Delta instance to add a space after the new content
        const delta = new Delta().retain(range - 1 + content.length + 1).insert(' ');

        // Update the editor contents
        editor.updateContents(delta, Quill.sources.USER);

        // Move the cursor after the space
        editor.setSelection(range - 1 + content.length + 2, Quill.sources.SILENT);

        focusEditor();
      }
    }
  };

  const handleMenuClick = useCallback((item: MenuItem, dataObject: any, isParent: boolean) => {
    const currentTime = new Date().getTime();
    if (isParent) {
      if (currentTime - lastClickTimeRef.current < 300) {
        // Double click detected
        insertStyledElement(item.label as string, dataObject);
      }
      lastClickTimeRef.current = currentTime;
    } else {
      // Not a parent item, insert immediately
      insertStyledElement(item.label as string, dataObject);
    }
  }, [insertStyledElement]);

  const items = database.schemas_list.map((schema: any) => {
    return {
      label: schema.collection_name,
      icon: 'pi pi-fw pi-sitemap',
      command: () => handleMenuClick({ label: schema.collection_name }, { id: schema.collection_id }, true),
      items: schema.tables.map((table: any) => {
        return {
          label: table.table_name,
          icon: 'pi pi-fw pi-table',
          command: () => insertStyledElement(table.table_name, { uuid: table.table_uuid }),
          items: Object.values(table.columns).map((column: any) => {
            return {
              label: column.column_name,
              icon: 'pi pi-fw pi-database',
              command: () => insertStyledElement(column.column_name, { column_datatype: column.column_datatype, column_index: column.column_index })
            };
          })
        };
      })
    };
  });

  const readElementProps = () => {
    const editor = editorRef.current?.getQuill();
    if (editor) {
        const elements = editor.root.querySelectorAll('[data-props]'); // Get all elements with custom data
        elements.forEach((element: Element) => {
            const serializedData = element.getAttribute('data-props');
            if (serializedData) {
                const dataObject = JSON.parse(serializedData); // Parse the custom data
                console.log(dataObject); // Log the custom data
            }
        });
    }
  };

  return (
    <div>
      <h1 className='text-xl font-bold'>Final Custom mention</h1>
      <Editor
        ref={editorRef}
        showHeader={false}
        formats={['mention']}
        // autoResize
        // cols={60}
        onTextChange={handleChange}
        onClick={handleCursorChange} // Add onClick event to handle cursor changes
        onKeyUp={handleCursorChange} // Add onKeyUp event to handle cursor changes
        onFocus={handleCursorChange}
      />
      <Button severity="secondary" onClick={readElementProps}>Track Mentions</Button>
      {menuVisible && (
        <div ref={tieredMenuRef} style={{ position: 'absolute', top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}>
          <TieredMenu
            model={items}
          />
        </div>
      )}
    </div>
  )
}

export default FinalMention
