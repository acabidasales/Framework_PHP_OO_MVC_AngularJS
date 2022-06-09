<?php
    class controller_login {
        function login() {
            echo json_encode(common::load_model('login_model', 'get_login', [$_POST['username'], $_POST['password']]));
        }

        function social_login() {
            echo json_encode(common::load_model('login_model', 'get_social_login', $_POST['profile']));
        } 

        function social_register() {
            echo json_encode(common::load_model('login_model', 'get_social_register', [$_POST['uid'], $_POST['username'], $_POST['email'], $_POST['avatar']]));
        } 
    
        function register() {
            $resultado = json_encode(common::load_model('login_model', 'get_register', [$_POST['username'], $_POST['email'],  $_POST['password']]));
            if($resultado != '"false"'){
                $message = [ 'type' => 'validate', 
                                'token' => $resultado, 
                                'toEmail' => $_POST['email']];
                $email = json_decode(mail::send_email($message), true);
				if (!empty($email)) {
                    echo json_encode($resultado);
					return;  
				}
            }else{
                echo json_encode($resultado);
                return;
            }
        }

        function verify_email() {
            $verify = json_encode(common::load_model('login_model', 'get_verify_email', $_POST['token']));
        }

        function send_recover_email() {
            $resultado = json_encode(common::load_model('login_model', 'get_recover_email', $_POST['email']));
            if($resultado != '"false"'){
                $message = ['type' => 'recover', 
                            'token' => $resultado, 
                            'toEmail' => $_POST['email']];
                $email = json_decode(mail::send_email($message), true);
				if (!empty($email)) {
					//echo json_encode($email); 
                    //echo json_encode($result);
                    echo json_encode(str_replace( array( '\'', '"', ',' , ';', '<', '>', ), '',$resultado));
					return;  
				}
            }else{
                echo json_encode("fail");
                return;
            }
        }

        function verify_token() {
            $verify = json_encode(common::load_model('login_model', 'get_verify_token', $_POST['token']));
            if (!empty($verify)) {
                echo $verify;
                return;
            }
        }

        function new_password() {
            $password = json_encode(common::load_model('login_model', 'get_new_password', [$_POST['token'], $_POST['password']]));
            if (!empty($password)) {
                echo $password;
                return;
            }
        }  
    
        function logout() {
            echo json_encode('Done');
        } 

        function data_user() {
            echo json_encode(common::load_model('login_model', 'get_data_user', $_POST['token']));
        } 
    
    }
    
?>