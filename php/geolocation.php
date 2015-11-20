<?php
$lat = $_GET['lat'];
$lng = $_GET['lng'];

$json_data = '{
                "html": ""
}';


$json_data = str_replace("\r\n",'',$json_data);
$json_data = str_replace("\n",'',$json_data);

echo $json_data;
exit;
?>