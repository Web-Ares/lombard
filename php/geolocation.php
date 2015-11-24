<?php
$lat = $_GET['lat'];
$lng = $_GET['lng'];

$json_data = '{
                "html": "
                    <div class=\'popup__content popup__geolocation\'>
                        <span class=\'popup__close\'>ЗАКРЫТЬ</span>
                            <span class=\'geolocation__title\'>Выбор города</span>
                            <dl>
                                <dt>выберите свой город</dt>
                                <dd>
                                    <fieldset class=\'geolocation__nice-input\'>
                                        <input checked type=\'radio\' name=\'city\' id=\'nice1\'>
                                        <label for=\'nice1\'>Уфа</label>
                                    </fieldset>
                                    <fieldset class=\'geolocation__nice-input\'>
                                        <input type=\'radio\' name=\'city\' id=\'nice2\'>
                                        <label for=\'nice2\'>Октябрьский</label>
                                    </fieldset>
                                    <fieldset class=\'geolocation__nice-input\'>
                                        <input type=\'radio\' name=\'city\' id=\'nice3\'>
                                        <label for=\'nice3\'>Стерлитамак</label>
                                    </fieldset>
                                    <fieldset class=\'geolocation__nice-input\'>
                                        <input type=\'radio\' name=\'city\' id=\'nice4\'>
                                        <label for=\'nice4\'>Туймазы</label>
                                    </fieldset>
                                    <fieldset class=\'geolocation__nice-input\'>
                                        <input type=\'radio\' name=\'city\' id=\'nice5\'>
                                        <label for=\'nice5\'>Нефтекамск</label>
                                    </fieldset>
                                    <fieldset class=\'geolocation__nice-input\'>
                                        <input type=\'radio\' name=\'city\' id=\'nice6\'>
                                        <label for=\'nice6\'>Давлеканово</label>
                                    </fieldset>
                                    <fieldset class=\'geolocation__nice-input\'>
                                        <input type=\'radio\' name=\'city\' id=\'nice7\'>
                                        <label for=\'nice7\'>Чишмы</label>
                                    </fieldset>
                                    <fieldset class=\'geolocation__nice-input\'>
                                        <input type=\'radio\' name=\'city\' id=\'nice8\'>
                                        <label for=\'nice8\'>Раевка</label>
                                    </fieldset>
                                </dd>
                            </dl>
                    </div>
                   "
}';


$json_data = str_replace("\r\n",'',$json_data);
$json_data = str_replace("\n",'',$json_data);

echo $json_data;
exit;
?>