<?php
namespace App\Service;
use App\Contract\DatabaseConnector as Contract;
abstract class DatabaseConnector implements Contract
{
    protected string $hostName;
    protected string $databaseName ;
    protected string $charset;
    protected string $username;
    protected string $password;
    protected array $options;
    public function __construct(
        string $hostName, string $databaseName, string $charset ,string $username, string $password, array $options = []
    )
    {
        $this->hostName = $hostName ;
        $this->databaseName = $databaseName ;
        $this->charset = $charset;
        $this->username = $username;
        $this->password = $password;
        $this->options = $options;
    }

    public function getHostName(): string
    {
        return $this->hostName;
    }

    public function setHostName(string $hostName): void
    {
        $this->hostName = $hostName;
    }

    public function getDatabaseName(): string
    {
        return $this->databaseName;
    }

    public function setDatabaseName(string $databaseName): void
    {
        $this->databaseName = $databaseName;
    }
    public function getCharset():string
    {
        return $this->charset;
    }
    public function setCharset(string $charset):void
    {
        $this->charset = $charset;
    }
    public function getUserName(): string
    {
        return $this->username;
    }

    public function setUserName(string $username): void
    {
        $this->username = $username;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    public function getOptions(): array
    {
        return $this->options;
    }

    public function setOptions(array $options): void
    {
        $this->options = $options;
    }

}