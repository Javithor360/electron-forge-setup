import { Mention } from 'primereact/mention';
import React, { useState } from 'react';

interface Column {
    column_name: string;
    column_datatype: string;
    column_index: number;
}

interface Table {
    table_name: string;
    columns: Record<string, Column>;
}

interface Schema {
    collection_name: string;
    tables: Table[];
}

interface Database {
    datname: string;
    schemas_list: Schema[];
}

const MentionSample: React.FC = () => {
    const database: Database = {
        datname: "lumosapp",
        schemas_list: [
            {
                collection_name: "Home",
                tables: [
                    {
                        table_name: "FirstTable",
                        columns: {
                            "1": { column_name: "date", column_datatype: "VARCHAR", column_index: 1 },
                            "2": { column_name: "start_time", column_datatype: "VARCHAR", column_index: 2 },
                            // ...otros campos
                        },
                    },
                    {
                        table_name: "SecondTable",
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
                tables: [
                    {
                        table_name: "SecondTable",
                        columns: {
                            "1": { column_name: "age", column_datatype: "INTEGER", column_index: 1 },
                            "2": { column_name: "name", column_datatype: "VARCHAR", column_index: 2 },
                            "3": { column_name: "email", column_datatype: "VARCHAR", column_index: 3 },
                            // ...otros campos
                        },
                    },
                    {
                        table_name: "ThirdTable",
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
                tables: [
                    {
                        table_name: "FirstTable",
                        columns: {
                            "1": { column_name: "date", column_datatype: "VARCHAR", column_index: 1 },
                            "2": { column_name: "start_time", column_datatype: "VARCHAR", column_index: 2 },
                            // ...otros campos
                        },
                    },
                    {
                        table_name: "ThirdTable",
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

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [text, setText] = useState<string>('');

    const fetchSuggestions = (event: { query: string }) => {
        const query = event.query;
        const parts = query.split('/');
        let newSuggestions: string[] = [];

        if (parts.length === 1) {
            newSuggestions = database.schemas_list.map(schema => schema.collection_name);
        } else if (parts.length === 2) {
            const schema = database.schemas_list.find(schema => schema.collection_name === parts[0]);
            if (schema) {
                newSuggestions = schema.tables.map(table => table.table_name);
            }
        } else if (parts.length === 3) {
            const schema = database.schemas_list.find(schema => schema.collection_name === parts[0]);
            const table = schema?.tables.find(table => table.table_name === parts[1]);
            if (table) {
                newSuggestions = Object.values(table.columns).map(column => column.column_name);
            }
        }

        setSuggestions(newSuggestions);
    };

    const onMentionSelect = (e: any) => {
        const mentionValue = e.suggestion.value;
        const parts = text.split(' ');
        const lastPart = parts[parts.length - 1];
        const baseText = parts.slice(0, parts.length - 1).join(' ');

        let newMention = lastPart;
        if (newMention.startsWith('@')) {
            newMention = newMention.substring(1); // Remove leading '@' if it exists
        }

        const mentionParts = newMention.split('/');
        mentionParts[mentionParts.length - 1] = mentionValue;
        const updatedMention = mentionParts.join('/');

        const newText = `${baseText} @${updatedMention}`.trim();
        setText(newText);
        setSuggestions([]);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const itemTemplate = (suggestion: { value: string }) => {
        const parts = text.split('@').pop()?.split('/') || [];
        let iconClass = '';

        if (parts.length === 1) {
            iconClass = 'pi pi-sitemap'; // Icon for database
        } else if (parts.length === 2) {
            iconClass = 'pi pi-table'; // Icon for table
        } else if (parts.length === 3) {
            iconClass = 'pi pi-database'; // Icon for column
        }

        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <i className={iconClass} style={{ marginRight: '0.5rem' }}></i>
                <span>{suggestion.value}</span>
            </div>
        );
    };

    return (
        <div>
            <h1>Sample</h1>
            <Mention
                autoResize
                trigger="@"
                suggestions={suggestions.map(s => ({ value: s }))}
                onSearch={fetchSuggestions}
                onSelect={onMentionSelect}
                field="value"
                itemTemplate={itemTemplate}
                inputStyle={{ width: '100%' }}
                value={text}
                onChange={handleTextChange}
                cols={60}
            />
        </div>
    );
};

export default MentionSample;