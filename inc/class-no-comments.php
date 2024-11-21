<?php
/**
 * No Comments
 *
 * @package SECLGroup
 */

namespace SECLGroup;

include 'exit.php';

class NoComments {

    function __construct() {

        add_filter('comments_open', '__return_false', 20, 2);
        add_filter('pings_open', '__return_false', 20, 2);
        add_filter('comments_array', '__return_empty_array', 10, 2);

        add_action('init', function(){
            remove_post_type_support('page', 'comments');
            remove_post_type_support('post', 'comments');
        }, 99);

        add_action('admin_menu', function () {
            remove_menu_page('edit-comments.php');
        });
    }
}
