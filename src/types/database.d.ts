export interface Column {
    column_name: string;
    column_datatype: string;
    column_index: number;
}

export interface Table {
    table_name: string;
    columns: Record<string, Column>;
}

export interface Schema {
    collection_name: string;
    tables: Table[];
}

export interface Database {
    datname: string;
    schemas_list: Schema[];
}