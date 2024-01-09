<?php
const HOST = 'localhost';
const DATABASE_NAME = 'javascript';
const CHARSET = 'utf8mb4';
const USERNAME = 'root';
const PASSWORD = 'root';
const OPTIONS = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION ,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ ,
];