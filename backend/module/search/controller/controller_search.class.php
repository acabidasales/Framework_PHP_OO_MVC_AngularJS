<?php
    class controller_search {
        function marca() {
            echo json_encode(common::load_model('search_model', 'get_select_marca'));
        }

        function modelo() {
            if(empty($_POST['marca'])){
                echo json_encode(common::load_model('search_model', 'get_select_modelo'));
            }else{
                echo json_encode(common::load_model('search_model', 'get_select_marca_modelo', $_POST['marca'] ));
            }
        }
        
        function autocomplete() {
            if (!empty($_POST['marca']) && empty($_POST['modelo'])){
                echo json_encode(common::load_model('search_model', 'get_auto_marca', [$_POST['marca'], $_POST['complete']]));
            }else if(!empty($_POST['marca']) && !empty($_POST['modelo'])){
                echo json_encode(common::load_model('search_model', 'get_select_auto_marca_modelo', [$_POST['complete'], $_POST['marca'], $_POST['modelo']]));
            }else if(empty($_POST['marca']) && !empty($_POST['modelo'])){
                echo json_encode(common::load_model('search_model', 'get_select_auto_modelo', [$_POST['modelo'], $_POST['complete']]));
            }else {
                echo json_encode(common::load_model('search_model', 'get_select_auto', $_POST['complete']));
            }
        }
    }

?>