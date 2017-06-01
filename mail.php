<?php
header('Content-Type: application/json');

$name = $_POST['name'];
$phone = $_POST['phone'];
$street = $_POST['street'];
$house = $_POST['house'];
$block = $_POST['block'];
$apartment = $_POST['apartment'];
$floor = $_POST['floor'];
$comment = $_POST['comment'];
$payment = $_POST['payment'];
$callback = $_POST['callback'];

$message = "Сообщение от пользователя: $name, $phone, $street, $house, $block, $apartment, $floor, $comment, $payment, $callback ";

$result = mail($street, 'Тема письма', $message);

echo json_encode(array(
	'status' => $result

	));

?>