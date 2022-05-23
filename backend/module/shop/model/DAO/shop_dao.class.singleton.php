<?php
    class shop_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_filters($db) {
            $array_filters = array('talla' , 'color', 'categoria');
            $array_return = array();
            foreach ($array_filters as $row) {
                $sql = 'SELECT DISTINCT ' . $row . ' FROM producto';
                $stmt = $db->ejecutar($sql);
                if (mysqli_num_rows($stmt) > 0) {
                    while ($row_inner[] = mysqli_fetch_assoc($stmt)) {
                        $array_return[$row] = $row_inner;
                    }// end_while
                    unset($row_inner);
                }// end_if
            }//end_foreach
            return $array_return;
        }

        public function sql_query($filters){
            $continue = "";
            $continue1 = "";
            $count = 0;
            $count1 = 0;
            $count2 = 0;
            $where = ' WHERE ';
            $like = false;
            foreach ($filters as $key => $row) {
                if($count == 0){
                    foreach ( $row as $row_inner) {
                        if($row_inner == "nombre"){
                            $like = true;
                        }
                        if($like == true){
                            if($count1 == 0){
                                $continue = $continue . $row_inner. " LIKE '";
                                $count1++;
                            }else{
                                $continue = $continue . $row_inner . "%'";
                            }
                        }else{
                            if($count1 == 0){
                                $continue = $continue . $row_inner. " IN ('";
                                $count1++;
                            }else{
                                foreach ( $row_inner as $value) {
                                    if($count2 == 0){
                                        $continue = $continue . $value;
                                        $count2++;
                                    }else{
                                        $continue = $continue ."', '". $value;
                                    }
                                }
                                $continue = $continue ."')";
                            }
                        }
                    }
                    $count++;
                    $count1 = 0;
                    $count2 = 0;
                }else{
                    foreach ( $row as $row_inner) {
                        if($row_inner == "nombre"){
                            $like = true;
                        }
                        if($like == true){
                            if($count1 == 0){
                                $continue = $continue . " AND " . $row_inner. " LIKE '";
                                $count1++;
                            }else{
                                $continue = $continue . $row_inner . "%'";
                            }
                        }else{
                            if($count1 == 0){
                                $continue = $continue . " AND " . $row_inner. " IN ('";
                                $count1++;
                            }else{
                                foreach ( $row_inner as $value) {
                                    if($count2 == 0){
                                        $continue = $continue . $value;
                                        $count2++;
                                    }else{
                                        $continue = $continue ."', '". $value;
                                    }
                                }
                                $continue = $continue ."')";
                            }
                        }
                    }
                    $count1 = 0;
                    $count2 = 0;
                }
            }
            $where = $where . $continue;
            return $where;
        }

        public function select_list_products($db) {
            $sql = "SELECT * FROM producto ORDER BY likes DESC";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_list_filters_products($db, $query) {
            $filters = self::sql_query($query);
            $sql = "SELECT codigo_producto, nombre, precio, images FROM producto $filters ORDER BY likes";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_pagination($db){
            $sql = "SELECT COUNT(*) AS n_prod FROM producto";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_pagination_filters($db, $query){
            $filters = self::sql_query($query);
            $sql = "SELECT COUNT(*) AS n_prod FROM producto $filters";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_filters_pagination($db, $filters){
            $sql = "SELECT COUNT(*) AS n_prod FROM producto $filters";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_details($db, $id){
            $sql = "SELECT codigo_producto, nombre, precio, talla, color, descripcion, images FROM `producto` WHERE codigo_producto = '$id'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function update_most_visit($db, $id){
            $sql = "UPDATE producto SET likes = likes + 1 WHERE codigo_producto = '$id'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_load_likes($db, $user){
            $sql = "SELECT codigo_producto FROM `likes` WHERE user='$user'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_likes($db, $id, $user){
            $sql = "SELECT user, codigo_producto FROM `likes` WHERE user='$user' AND codigo_producto='$id'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function insert_likes($db, $id, $user){
            $sql = "INSERT INTO likes (user, codigo_producto) VALUES ('$user','$id')";
            $stmt = $db->ejecutar($sql);
            return "like";
        }

        function delete_likes($db, $id, $user){
            $sql = "DELETE FROM `likes` WHERE user='$user' AND codigo_producto='$id'";
            $stmt = $db->ejecutar($sql);
            return "unlike";
        }

        public function select_product($db, $user, $id){
            $sql = "SELECT * FROM cart WHERE user='$user' AND codigo_producto='$id'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function insert_product($db, $user, $id){
            $sql = "INSERT INTO cart (user, codigo_producto, qty) VALUES ('$user','$id', '1')";
            $stmt = $db->ejecutar($sql);
            return "insert";
        }

        public function update_product($db, $user, $id){
            $sql = "UPDATE cart SET qty = qty+1 WHERE user='$user' AND codigo_producto='$id'";
            $stmt = $db->ejecutar($sql);
            return "update";
        }
    }

