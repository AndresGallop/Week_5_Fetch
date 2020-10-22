<?php
    require('connect.php');

    function getAllUsers($conn) {
        $getUsers = 'SELECT * FROM users';
        $runQuery = $conn->query($getUsers);

        $result = array();

        while($row = $runQuery->fetch(PDO::FETCH_ASSOC)) {
            // push each row of data into our arry to make it easy to iterate over
            $result[] = $row;
        }

        return $result;
    }

    function getSingleUser($conn) {
        // run same query with a where clause
    }