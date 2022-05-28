# Notes on PostgreSQL

## `psql`

- `\?` for help. It shows all available commands.
- `\l` to list all databases.
- Connect to a database: `\c [database name]`
- `\d` to list all tables.
- `\d [table name]` to see all columns in `[table name]`

## Useful SQL Commands

- `CREATE DATBASE [database name];` to create a new database.
- `DROP DATABASE [database name]`: to delete a database.
- Creating a new table called `products`:

```sql
CREATE TABLE products (
    id INT,
    name VARCHAR (50) UNIQUE NOT NULL,
    price INT,
    on_sale BOOLEAN
);
```

- Dropping existing table: `DROP TABLE [table name];`

- Adding/Removing columns:

```sql
-- adding a new column
ALTER TABLE table_name
ADD COLUMN new_column_name data_type;

-- removing existing column
ALTER TABLE table_name
DROP COLUMN old_column_name;
```

- Adding records to tables:

```sql
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);
```

```sql
-- inserts a new record and returns it
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3) returning *;
```

- Updating a record

```sql
UPDATE table_name SET column1 = new_value1, column2 = new_value2, column3 = new_value3 where id = record_id;
```

- Deleting record

```sql
DELETE FROM table_name where id = record_id;
```
