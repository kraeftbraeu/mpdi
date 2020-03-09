<?php

$link = false;
{
    /** docker **/
    $dbServername = "mysql";
    $dbUsername = "alwrfhowugh";
    $dbPassword = "aec9rjhtmqoexg";
    $dbName = "wunschliste";
    $pathToVendor = "";
    //*/

    /** server ** /
    $dbServername = "mysql57";
    $dbUsername = "mk4_wurschtinger";
    $dbPassword = "feqVW2z&Uh";
    $dbName = "mk4_wurschtinger";
    $pathToVendor = "../";
    //*/

    try {
    $link = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);
    if (!$link)
        die('<p>keine SQL-Verbindung möglich!</p>');
    mysqli_set_charset($link,'utf8');
    } catch(Exception $e) { echo $e->getMessage(); }
}
if($link === false) {
    die('<p>keine SQL-Verbindung möglich!</p>');
}

$GLOBALS["logDb"] = false;
?>
