<?php require_once dirname(__DIR__,2).'/Includes/Bootstrap.php' ; ?>
<?php /** @var PDO $connection */?>
<?php
    #sleep(rand(1,2));
    header('Content-type:Application/Json');
?>
<?php
    $name = $_POST["name"];
    $email = $_POST["email"];
    $password = $_POST["password"];
?>
<?php
    $code = 201 ;
    $response = ["message"=> null , "code" => $code ];
?>
<?php
    $query = "select count(`id`) as 'user_is_exists' from `users` where `email`=:email limit 1;";
    $statement = $connection->prepare($query);
    $statement->bindValue(":email",$email);
    $executed = $statement->execute();
    $dataTable = $statement->fetch();
    $hasUser = (bool) $dataTable->user_is_exists;
    if ($hasUser){
        $code = 409 ;
        http_response_code($code);
        $response = ["message"=> "email `$email` is exists !!! ", "status" => $code ];
        echo json_encode($response);
        exit();
    }
    $binds = [":name"=>$name , ":email" => $email , ":password" => $password ];
    $query = "insert into `users` (`name`,`email`,`password`) value (:name,:email,sha1(:password));";
    $statement = $connection->prepare($query);
    foreach ($binds as $bindKey => $bindValue)
        $statement->bindValue($bindKey,$bindValue);
    $executed = $statement->execute();

    http_response_code(200);
    $response["message"]="successfully registered user";
    echo json_encode($response);


