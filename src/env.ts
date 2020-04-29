import dotenv from 'dotenv';

// load environment variables
dotenv.config();

export const LISTEN_PORT: number = process.env.LISTEN_PORT != undefined ? Number(process.env.LISTEN_PORT) : 3000;

export const LISTEN_ADDRESS: string =
  process.env.LISTEN_ADDRESS != undefined ? process.env.LISTEN_ADDRESS : '127.0.0.1';
