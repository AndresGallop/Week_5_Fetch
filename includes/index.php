<?php
    require('functions.php');

    if (isset($_GET['user'])) {
        $user = getSingleUser($pdo);
    } else {
        $user = getAllUser($pdo);
    }

    echo json_encode($user);