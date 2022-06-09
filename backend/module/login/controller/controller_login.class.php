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
            echo json_encode(common::load_model('login_model', 'manage_register', [$_POST['username'], $_POST['email'],  $_POST['password']]));
        }

        function verify_email() {
            $verify = json_encode(common::load_model('login_model', 'get_verify_email', $_POST['token']));
        }

        function send_recover_email() {
            echo json_encode(common::load_model('login_model', 'manage_recover_email', $_POST['email']));
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