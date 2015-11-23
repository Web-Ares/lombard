<?php
    $json_data = str_replace("\r\n",'',$json_data);
    $json_data = str_replace("\n",'',$json_data);

    $mail = "test@test.com";
    $subject = "Заявка на". $_GET['service'];

    $headers = "From: \"application\" \n";
    $headers .= "Content-type: text/html; charset=utf-8 \r\n";

    $message = "<h2>Заявка на $_GET[service]</h2><hr>
				<p><strong>Дата и время:</strong> ".date("Y-m-d H:i:s")."</p>
				<p><strong>Услуга:</strong> $_GET[service]</p>
				<p><strong>Имя:</strong> $_GET[name]</p>
				<p><strong>Телефон:</strong> $_GET[phone]</p>
				<p><strong>Удобное время:</strong> $_GET[message]</p>
	";

    mail($mail, $subject, $message, $headers);

    exit;
?>

