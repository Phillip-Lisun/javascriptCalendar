<?php

require "calDatabase.php";

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

$added = false;

//Variables can be accessed as such:
$title = $json_obj['title'];
$day = $json_obj['day'];
$month = $json_obj['month'];
$year = $json_obj['year'];
$time = $json_obj['time'];
$description = $json_obj['description'];
$user_id = $json_obj['user_id'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

$stmt = $mysqli->prepare("insert into events (title, day, month, year, time, user_id) values (?, ?, ?, ?, ?, ?)");

if (!$stmt) {
    $message = printf("Query Prep Failed: %s\n", $mysqli->error);

    echo json_encode(array(
        "success" => false,
        "message" => $message
    ));
    exit;
}

$stmt->bind_param('siiisi', $title, $day, $month, $year, $time, $user_id);
if($stmt->execute()) {
    $added = true;
}
$stmt->close();

if($added == true){
    echo json_encode(array(
        "success" => true
    ));
    exit;
}else{
    echo json_encode(array(
        "success" => false,
        "message" => "Add Failed"
    ));
    exit;
}
?>