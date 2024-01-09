<?php

namespace App\Contract;

interface DatabaseConnector
{
    public function __construct(
        string $hostName , string $databaseName , string $charset ,  string $username ,
        string $password , array $options = []
    );
    public function getHostName():string;
    public function setHostName(string $hostName):void;
    public function getDatabaseName():string;
    public function setDatabaseName(string $dbName):void;
    public function getCharset():string;
    public function setCharset(string $charset):void;
    public function getUserName():string;
    public function setUserName(string $userName):void;
    public function getPassword():string;
    public function setPassword(string $password):void;
    public function getOptions():array;
    public function setOptions(array $options):void;
    public function connect():\PDO;
}