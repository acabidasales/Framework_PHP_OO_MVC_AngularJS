<?php
    class controller_shop {

        function filters() {
            echo json_encode(common::load_model('shop_model', 'get_filters'));
        }

        function list_products() {
            echo json_encode(common::load_model('shop_model', 'get_list_products'));
        }

        function list_filters_products() {
            echo json_encode(common::load_model('shop_model', 'get_list_filters_products', $_POST['filters']));
        }

        function pagination() {
            echo json_encode(common::load_model('shop_model', 'get_pagination'));
        }

        function pagination_filters() {
            echo json_encode(common::load_model('shop_model', 'get_pagination_filters', $_POST['filters']));
        }

        function details() {
            echo json_encode(common::load_model('shop_model', 'get_details', $_POST['codigo_producto']));
        }

        function most_visit() {
            echo json_encode(common::load_model('shop_model', 'get_most_visit', $_POST['id']));
        }

        function load_like() {
            echo json_encode(common::load_model('shop_model', 'get_load_like', $_POST['user']));
        }

        function click_like() {
            echo json_encode(common::load_model('shop_model', 'get_click_like', [$_POST['id'], $_POST['user']]));
        }

        function insert_cart() {
            echo json_encode(common::load_model('shop_model', 'get_insert_cart', [$_POST['user'], $_POST['id']]));
        }

    }
?>
