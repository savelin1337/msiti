<?php
/**
 * Created by PhpStorm.
 * User: Dmitry Zhegalkin
 * Date: 21.04.2021
 * Time: 11:45
 */

set_time_limit(7200);

$logFileName = "log.txt";
$ck = "ck_459c482dd2f0d9b6baf31067202a144a3e96cebe";
$cs = "cs_92e29977be369953ea950f11b8a7b297d52f35bc";
$host = "https://jetcamp.ru";
$api_key = "612c5fac68c747f99c9ade7dcf0aa02b";

ini_set('error_reporting', E_ERROR);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);


function CallAPI($method, $url, $data = false)
{
    $curl = curl_init();

    switch ($method)
    {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);

            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_PUT, 1);
            $headers = [
                'Accept: application/json',
                'Content-Type: application/x-www-form-urlencoded; charset=utf-8',
            ];
            curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
            break;
        default:
            if ($data) {
                // $query = http_build_query($data);
                // $url = sprintf("%s?%s", $url, http_build_query($data));
            }
    }

//    echo "<br><br>$data<br>";
//    echo "$url<br><br>";

    // Optional Authentication:
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($curl, CURLOPT_USERPWD, "ck_459c482dd2f0d9b6baf31067202a144a3e96cebe:cs_92e29977be369953ea950f11b8a7b297d52f35bc");

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($curl);

    curl_close($curl);

    return $result;
}