<?php require_once dirname(__DIR__)."/Includes/Bootstrap.php"; ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>login</title>
    <link rel="stylesheet" href="Css/Pages/Home.css" type="text/css">
    <script src="Js/Pages/Home/launcher.js" type="module"></script>
</head>
<body>
    <div id="notification-container"></div>
    <form action="Ajax/register.php" method="post">
        <div>
            <label for="name">name:</label>
            <input type="text" name="name">
        </div>
        <div>
            <label for="email">email:</label>
            <input type="text" name="email">
        </div>
        <div>
            <label for="password">password:</label>
            <input type="text" name="password">
        </div>
        <div>
            <button>register</button>
        </div>
        <div id="loading">
            <img src="img/loading.svg" alt="">
        </div>
    </form>
</body>
</html>