<?php
	class login_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = login_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function manage_register_BLL($args) {
			$username = $args[0];
			$postemail = $args[1];
			$psswd = $args[2];
			$resultado = common::load_model('login_model', 'get_register', [$username, $postemail,  $psswd]);
            if($resultado != "false"){
                $message = [ 'type' => 'validate', 
                                'token' => $resultado, 
                                'toEmail' => $postemail];
                $email = json_decode(mail::send_email($message), true);
				if (!empty($email)) {
					/* str_replace( array( '\'', '"', ',' , ';', '<', '>', ), '',$resultado); */
					return json_encode($resultado);
				}
            }else{
				/* str_replace( array( '\'', '"', ',' , ';', '<', '>', ), '',$resultado); */
                return json_encode($resultado);
            }
		}

		public function manage_recover_email_BLL($args) {
			$postemail = $args;
			$resultado = common::load_model('login_model', 'get_recover_email', $postemail);
            if($resultado != "fail"){
                $message = ['type' => 'recover', 
                            'token' => $resultado, 
                            'toEmail' => $postemail];
                $email = json_decode(mail::send_email($message), true);
				if (!empty($email)) {
					return json_encode($resultado);
				}
            }else{
                return json_encode("fail");
            }
		}

		public function get_register_BLL($args) {
			$hashed_pass = password_hash($args[2], PASSWORD_DEFAULT);
			$hashavatar = md5(strtolower(trim($args[1]))); 
			$avatar = "https://robohash.org/$hashavatar";
			$token = common::generate_Token_secure(20);
			$result = $this -> dao -> insert_user($this->db, $args[0], $args[1], $hashed_pass, $avatar, $token);
			if ($result == "true") {
				return $token;
			}else {
				return "false";
			}
		}

		public function get_social_register_BLL($args) {
			$token = common::generate_Token_secure(20);
			$this -> dao -> insert_social_login($this->db, $args[0], $args[1], $args[2], $args[3]);
			return $token;
		}

		public function get_login_BLL($args) {
			$user = $this -> dao -> select_user($this->db, $args[0]);
			if (!empty($user)) {
				if (password_verify($args[1], $user[0]['password'])) {
					$jwt = jwt_process::encode($user[0]['username']);
					$this -> dao -> update_token_jwt($this->db, $jwt, $user[0]['email']);
					return json_encode($jwt);
				}
			}
			return 'fail';
		}

		public function get_social_login_BLL($args) {
			if(empty($this -> dao -> select_social_login($this->db, $args['id']))){
				$this -> dao -> insert_social_login($this->db, $args['id'], $args['username'], $args['email'], $args['avatar']);
			}
			$jwt = jwt_process::encode($args['username']);
			//$this -> dao -> update_token_jwt($this->db, $jwt, $args['email']);
			return $jwt;
		}

		public function get_verify_email_BLL($args) {
			$token = str_replace( array( '\'', '"', ',' , ';', '<', '>', ), '',$args);
			if($this -> dao -> select_verify_email($this->db, $token)){
				$this -> dao -> update_verify_email($this->db, $token);
				return 'verify';
			}
			return 'fail';
		}

		public function get_recover_email_BBL($args) {
			$user = $this -> dao -> select_recover_password($this->db, $args);
			$token = common::generate_Token_secure(20);
			if (!empty($user)) {
				$this -> dao -> update_recover_password($this->db, $args, $token);
				return $token;
			}
			return "fail"; 
		}

		public function get_verify_token_BLL($args) {
			$token = str_replace( array( '\'', '"', ',' , ';', '<', '>' ), '', $args);
			if($this -> dao -> select_verify_email($this->db, $token)){
				return 'verify';
			}
			return 'fail';
		}

		public function get_new_password_BLL($args) {
			$hashed_pass = password_hash($args[1], PASSWORD_DEFAULT, ['cost' => 12]);
			if($this -> dao -> update_new_passwoord($this->db, $args[0], $hashed_pass)){
				return 'new_password';
			}
			return 'fail';
		}

		public function get_data_user_BLL($args) {
			
			$token = str_replace( array( '\'', '"', ',' , ';', '<', '>' ), '', $args);
			$JWT = jwt_process::decode($token);
			$json = json_decode($JWT, TRUE);
			return $this -> dao -> select_data_user($this->db, $json['name']);
		}

		public function select_user_BLL($args) {
			return $this -> dao -> select_user_by_uid($this->db, $args);
		}
	}