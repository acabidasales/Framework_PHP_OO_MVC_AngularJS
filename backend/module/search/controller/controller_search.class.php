<?php
    class controller_search {
        function marca() {
            echo json_encode(common::load_model('search_model', 'get_select_marca'));
        }

        function modelo() {
            echo json_encode(common::load_model('search_model', 'manage_modelo', $_POST['marca']));
        }
        
        function autocomplete() {
            echo json_encode(common::load_model('search_model', 'manage_autocomplete', [$_POST['marca'], $_POST['modelo'], $_POST['complete']]));
        }
    }

?>