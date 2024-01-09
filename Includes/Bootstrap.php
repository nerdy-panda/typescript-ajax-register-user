<?php session_start();?>
<?php require_once __DIR__.'/Config.php'; ?>
<?php require_once dirname(__DIR__).'/vendor/autoload.php';?>
<?php
    use App\Service\DatabaseConnectors\MySql;
?>
<?php
    $mysqlConnector = new MySql(
        HOST,DATABASE_NAME, CHARSET ,
        USERNAME,PASSWORD, OPTIONS
    );
    $connection = $mysqlConnector->connect();
?>
