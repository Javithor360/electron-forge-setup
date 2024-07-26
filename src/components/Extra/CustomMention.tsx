import { InputTextarea } from 'primereact/inputtextarea';
import { TieredMenu } from 'primereact/tieredmenu';
import React, { useRef, useState, useEffect, useCallback } from 'react';

const CustomMention = () => {
    const prevValueRef = useRef<string>('');
    const tieredMenuRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    
    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const [shouldShowMenu, setShouldShowMenu] = useState<boolean>(true);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (tieredMenuRef.current && !tieredMenuRef.current.contains(event.target as Node)) {
            setMenuVisible(false);
        }
    }, []);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setMenuVisible(false);
            setShouldShowMenu(false); // Prevent showing the menu immediately after closing with Escape
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

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const prevValue = prevValueRef.current;
        const cursorPosition = inputRef.current?.selectionStart ?? 0;

        setShouldShowMenu(true); // Reactivate shouldShowMenu when something new is typed

        // Detect if @ was just added or cursor is just in front of an @
        if (value.length > prevValue.length) {
            const addedChar = value[cursorPosition - 1];
            const prevChar = cursorPosition > 1 ? value[cursorPosition - 2] : '';

            if (addedChar === '@' && (cursorPosition === 1 || prevChar === ' ')) {
                const nextChar = cursorPosition < value.length ? value[cursorPosition] : ' ';
                if (nextChar === ' ' || nextChar === '') {
                    console.log('@ detected at position:', cursorPosition - 1);
                    showMenuAtPosition(cursorPosition);
                } else {
                    setMenuVisible(false);
                }
            } else {
                setMenuVisible(false);
            }
        } else if (cursorPosition > 0 && value[cursorPosition - 1] === '@') {
            const prevChar = cursorPosition > 1 ? value[cursorPosition - 2] : '';
            const nextChar = cursorPosition < value.length ? value[cursorPosition] : ' ';
            if ((cursorPosition === 1 || prevChar === ' ') && (nextChar === ' ' || nextChar === '')) {
                console.log('Cursor placed at position:', cursorPosition - 1, 'in front of @');
                showMenuAtPosition(cursorPosition);
            } else {
                setMenuVisible(false);
            }
        } else {
            setMenuVisible(false);
        }

        // Update previous value reference
        prevValueRef.current = value;
    };

    const handleCursorChange = () => {
        if (!shouldShowMenu) return setShouldShowMenu(true);

        const cursorPosition = inputRef.current?.selectionStart ?? 0;
        const value = inputRef.current?.value ?? '';

        if (cursorPosition > 0 && value[cursorPosition - 1] === '@') {
            const prevChar = cursorPosition > 1 ? value[cursorPosition - 2] : '';
            const nextChar = cursorPosition < value.length ? value[cursorPosition] : ' ';
            if ((cursorPosition === 1 || prevChar === ' ') && (nextChar === ' ' || nextChar === '')) {
                console.log('Cursor placed at position:', cursorPosition - 1, 'in front of @');
                showMenuAtPosition(cursorPosition);
            } else {
                setMenuVisible(false);
            }
        } else {
            setMenuVisible(false);
        }
    };

    const showMenuAtPosition = (position: number) => {
        if (inputRef.current) {
            const text = inputRef.current.value.substring(0, position);
            const dummyElement = document.createElement('span');
            dummyElement.style.visibility = 'hidden';
            dummyElement.style.position = 'absolute';
            dummyElement.style.whiteSpace = 'pre';
            dummyElement.textContent = text;

            document.body.appendChild(dummyElement);

            const rect = dummyElement.getBoundingClientRect();
            const inputRect = inputRef.current.getBoundingClientRect();

            setMenuPosition({
                top: inputRect.top + window.scrollY + rect.height + 15,
                left: inputRect.left + window.scrollX + rect.width + 10
            });

            document.body.removeChild(dummyElement);
            setMenuVisible(true);
        }
    };

    const items = [
        {
            label: 'Database1',
            icon: 'pi pi-fw pi-sitemap',
            data:  { id: 'sample_database_id1' },
            items: [
                { label: 'Table1', icon: 'pi pi-fw pi-table', items: [{ label: 'Column1', icon: 'pi pi-fw pi-database', data: { id: 'sample_column_id1' }}, { label: 'Column2', icon: 'pi pi-fw pi-database', data: { id: 'sample_column_id2' }}] },
                { label: 'Table2', icon: 'pi pi-fw pi-table', items: [{ label: 'Column3', icon: 'pi pi-fw pi-database', data: { id: 'sample_column_id3' }}, { label: 'Column4', icon: 'pi pi-fw pi-database', data: { id: 'sample_column_id4' }}] },
            ]
        },
        {
            label: 'Database2',
            icon: 'pi pi-fw pi-sitemap',
            data:  { id: 'sample_database_id2' },
            items: [
                { label: 'Table1', icon: 'pi pi-fw pi-table', items: [{ label: 'Column5', icon: 'pi pi-fw pi-database', data: { id: 'sample_column_id5' }}, { label: 'Column6', icon: 'pi pi-fw pi-database', data: { id: 'sample_column_id6' }}] },
                { label: 'Table2', icon: 'pi pi-fw pi-table', items: [{ label: 'Column7', icon: 'pi pi-fw pi-database', data: { id: 'sample_column_id7' }}, { label: 'Column7', icon: 'pi pi-fw pi-database', data: { id: 'sample_column_id8' }}] },
            ]
        }
    ];

    return (
        <div>
            <h1 className='text-xl font-bold'>Custom mention</h1>
            <InputTextarea
                ref={inputRef}
                autoResize
                cols={60}
                onChange={handleChange}
                onClick={handleCursorChange} // Add onClick event to handle cursor changes
                onKeyUp={handleCursorChange} // Add onKeyUp event to handle cursor changes
            />
            {menuVisible && (
                <div ref={tieredMenuRef} style={{ position: 'absolute', top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}>
                    <TieredMenu
                        model={items}
                    />
                </div>
            )}
        </div>
    );
}

export default CustomMention;
