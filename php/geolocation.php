<?php
$lat = $_GET['lat'];
$lng = $_GET['lng'];

$json_data = '{
                "html": "
                    <div class=\'popup__content popup__geolocation\'>
                        <div class=\'geolocation\'>
                            geolocation
                        </div>
                    </div>"
}';


$json_data = str_replace("\r\n",'',$json_data);
$json_data = str_replace("\n",'',$json_data);

echo $json_data;
exit;
?>