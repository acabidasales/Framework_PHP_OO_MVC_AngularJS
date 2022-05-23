<?php
    class controller_home {

        function marcas_carousel() {
            echo json_encode(common::load_model('home_model', 'get_marcas_carousel'));
        }

        function tipo_carousel() {
            echo json_encode(common::load_model('home_model', 'get_tipo_carousel'));
        }

        function categoria_carousel() {
            echo json_encode(common::load_model('home_model', 'get_categoria_carousel'));
        }

        /* function load_more() {
            echo json_encode(common::load_model('home_model', 'get_load_more'));
        }
 */
    }
?>