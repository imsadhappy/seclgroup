<?php
/**
 * No Blog - when page_for_posts not set
 *
 * @package SECLGroup
 */

namespace SECLGroup;

include 'exit.php';

class NoBlog {

    function __construct() {

        if (get_option('page_for_posts')) return;
        
        add_action( 'template_redirect', function() {

            if ( ! is_post_type_archive('post') && 'post' !== get_post_type() )
                return;

            wp_redirect( home_url(), 307 );

            exit;
        } );

        add_filter( 'display_post_states', function ( $post_states, $post ) {

            if ( 'post' === $post->post_type )
                $post_states['wp_no_page_for_posts'] = __( "No blog", 'seclgroup' );

            return $post_states;
        }, 10, 2 );
    }
}
