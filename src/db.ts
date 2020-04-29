import { Pool } from "pg";

const pool: Pool = new Pool();

export const query = (query: string, params?: any) => pool.query(query, params);