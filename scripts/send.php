<?php

include_once __DIR__ . '/../vendor/autoload.php';

header('Content-type: application/json');

define('STATUS_SUCCESS', 'success');
define('STATUS_ERROR', 'error');

$type_map = [
    'selection' => 'Подбор авто',
    'contact' => 'Сообщение',
    'callback' => 'Обратный звонок',
];

/**
 * @param string $status
 * @param array $data
 * @param string $error_message
 */
function response($status, $data = [], $error_message = null){
    $response = ['status' => $status];
    if($status == STATUS_SUCCESS){
        $response['data'] = $data;
    }else{
        $response['message'] = $error_message;
    }

    echo json_encode($response);
    exit();
}

/**
 * @param string $key
 * @return mixed|null
 */
function requestPostVar($key){
    return isset($_POST[$key]) && !empty($_POST[$key]) ? addslashes($_POST[$key]) : null;
}



$mailer = new PHPMailer();
$mailer->set('CharSet', 'UTF-8');
$mailer->set('From', 'order@autogal.online');
$mailer->set('FromName', 'ПодборАВТО');

$type = requestPostVar('type');
if(!isset($type_map[$type])){
    response(STATUS_ERROR, [], 'Unknown type');
}

$mailer->set('Subject', "Заявка с сайта::$type_map[$type]");

switch($type){
    case 'selection':
        if(!requestPostVar('brand') || !requestPostVar('phone')){
            response(STATUS_ERROR, [], 'Fill in all fields');
        }

        $message = 'Марка авто: ' . requestPostVar('brand') . "\n";
        $message .= 'Телефон: ' . requestPostVar('phone') . "\n";

        break;
    case 'contact':
        if(!requestPostVar('name') || !requestPostVar('email') || !requestPostVar('message')){
            response(STATUS_ERROR, [], 'Fill in all fields');
        }

        $message = 'Имя: ' . requestPostVar('name') . "\n";
        $message .= 'Email: ' . requestPostVar('email') . "\n";
        $message .= 'Телефон: ' . requestPostVar('phone') . "\n";
        $message .= 'Сообщене: ' . requestPostVar('message') . "\n";

        break;
    case 'callback':
        if(!requestPostVar('name') || !requestPostVar('phone')){
            response(STATUS_ERROR, [], 'Fill in all fields');
        }

        $message = 'Имя: ' . requestPostVar('name') . "\n";
        $message .= 'Телефон: ' . requestPostVar('phone') . "\n";

        break;
    default:
        $message = null;
        break;
}

$mailer->set('Body', $message);

$mailer->addAddress('autogal-info@mail.ru');

response(STATUS_SUCCESS);

if($mailer->send()){
    response(STATUS_SUCCESS);
}else{
    response(STATUS_ERROR, [], 'Error while sending mail');
}