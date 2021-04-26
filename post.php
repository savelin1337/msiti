<?php
/**
 * Created by PhpStorm.
 * User: Kristina
 * Date: 18.02.2021
 * Time: 13:26
 */

if (strlen($_POST['question']) < 10) { // test
    http_response_code(422);
    echo '{ "errors": { "question": [ "The contact name field is required." ] }, "message": "The given data was invalid." }';
} else {
    echo '{"message" : "Заявка успешно отправлена!"}';
}

// echo '<div class="form-message"><p>Заявка успешно отправлена!</p></div>';