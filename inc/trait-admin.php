<?php
/**
 * Admin trait
 *
 * @package SECLGroup
 */

namespace SECLGroup;

if ( ! defined( 'ABSPATH' ) ) {
    http_response_code(403);
	exit; // Exit if accessed directly.
}

trait Admin {

    protected function disable_comments() {

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

    protected function disable_post_type() {
        
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

    protected function remove_from_admin_bar( $nodes = array() ) {

        add_action( 'wp_before_admin_bar_render', function () use ($nodes) {

            /** @var \WP_Admin_Bar $wp_admin_bar */
            global $wp_admin_bar;

            foreach ( $nodes as $node )
                $wp_admin_bar->remove_node($node);
        } );
    }

    protected function add_support_for_( $additional_mime_types = array() ) {

        add_filter( 'upload_mimes', function($mime_types) use ($additional_mime_types ) {

            foreach ($additional_mime_types  as $key => $value)
                $mime_types[$key] = $value;

            return $mime_types;
        } );
    }

    protected function page_for_( $id, $title ) {

        if ( ! function_exists("get_the_{$id}_link") )
            return _doing_it_wrong(__FUNCTION__, "Define function get_the_{$id}_link", '1.0');

        $skey = "wp_page_for_$id";

        add_action( 'admin_init', function () use ( $skey, $title ) {

            register_setting( 'reading', $skey );

            add_settings_field(
                $skey,
                '<label for="' . $skey . '">' . __( $title, 'seclgroup' ) . ':</label>',
                function () use ($skey) {
                    echo wp_dropdown_pages(
                        array(
                            'name'              => $skey,
                            'echo'              => 0,
                            'show_option_none'  => __( '&mdash; Select &mdash;' ),
                            'option_none_value' => '0',
                            'selected'          => get_option( $skey ),
                        )
                    );
                },
                'reading'
            );
        } );

        add_filter( 'display_post_states', function ( $post_states, $post ) use ( $skey, $title ) {

            if ( intval( get_option($skey) ) === intval($post->ID) )
                $post_states[$skey] = __( $title, 'seclgroup' );

            return $post_states;
        }, 10, 2 );

        add_filter( 'body_class', function ($classes) use ($skey) {

            if ( intval( get_option($skey) ) === get_queried_object_id() )
                $classes[] = str_replace('_', '-', $skey);

            return $classes;
        } );

        add_filter( 'block_classes', function ($classes) use ($skey) {

            if ( intval( get_option($skey) ) === intval( get_the_ID() ) )
                $classes[] = 'on-' . str_replace('_', '-', $skey);

            return $classes;
        } );
    }
}
