<?php

    class search_dao{
        static $_instance;

        private function __construct() {
        }
    
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        
        function select_sexo($db){
			$sql = "SELECT DISTINCT sexo FROM producto";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_categoria($db){
            $sql = "SELECT DISTINCT categoria FROM `producto`";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_sexo_categoria($db, $sexo){
            $sql = "SELECT DISTINCT categoria FROM `producto` WHERE sexo='$sexo'";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_auto_sexo($db, $sexo, $auto){
            $sql = "SELECT nombre FROM `producto` WHERE sexo='$sexo' AND nombre LIKE '$auto%'";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_auto_sexo_categoria($db, $sexo, $categoria, $auto){
            $sql = "SELECT nombre FROM `producto` WHERE sexo='$sexo' AND categoria='$categoria' AND nombre LIKE '$auto%'";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_auto_categoria($db, $categoria, $auto){
            $sql = "SELECT nombre FROM `producto` WHERE categoria='$categoria' AND nombre LIKE '$auto%'";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_auto($db, $auto){
            $sql = "SELECT nombre FROM `producto` WHERE nombre LIKE '$auto%'";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        
    }

?>