<?php

namespace App\Service\DatabaseConnectors;

use App\Service\DatabaseConnector;
use App\Contract\DatabaseConnectors\Mysql as Contract ;
class MySql extends DatabaseConnector implements Contract
{
    public function connect(): \PDO
    {
        $dsn = "mysql:host={$this->getHostName()};dbname={$this->getDatabaseName()};charset={$this->getCharset()};";
        return new \PDO($dsn,$this->getUserName(),$this->getPassword(),$this->getOptions());
    }
}