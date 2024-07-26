import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Mention } from 'primereact/mention';
import { TieredMenu } from 'primereact/tieredmenu';

const MyComponent: React.FC = () => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const menuRef = useRef<TieredMenu>(null);

    const items = [
        {
            label: 'Category 1',
            items: [
                { label: 'Option 1.1' },
                { label: 'Option 1.2' },
            ]
        },
        {
            label: 'Category 2',
            items: [
                { label: 'Option 2.1' },
                { label: 'Option 2.2' },
            ]
        }
    ];

    const mentions = [
        { trigger: '@', suggestions: ['User1', 'User2', 'User3'] },
        { trigger: '#', suggestions: ['Tag1', 'Tag2', 'Tag3'] }
    ];

    const handleMentionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleShowMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (menuRef.current) {
            menuRef.current.toggle(event);
        }
    };

    const handleFilterSuggestions = (event: { query: string }) => {
        const query = event.query;
        const filteredSuggestions = mentions.flatMap(mention =>
            mention.suggestions.filter(suggestion => suggestion.toLowerCase().includes(query.toLowerCase()))
        );
        setSuggestions(filteredSuggestions);
    };

    return (
        <div>
            <div className="p-inputgroup">
                <Mention
                    trigger="@"
                    suggestions={suggestions}
                    onSearch={handleFilterSuggestions}
                    onChange={handleMentionChange}
                    placeholder="Type @ to mention a user or # to mention a tag"
                />
                <Button icon="pi pi-search" onClick={handleShowMenu} />
            </div>
            <TieredMenu model={items} popup ref={menuRef} />
        </div>
    );
};

export default MyComponent;
