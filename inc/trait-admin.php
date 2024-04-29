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

    protected function remove_from_admin_bar( $nodes = array() ) {

        add_action( 'wp_before_admin_bar_render', function () use ($nodes) {

            /** @var \WP_Admin_Bar $wp_admin_bar */
            global $wp_admin_bar;

            foreach ( $nodes as $node )
                $wp_admin_bar->remove_node($node);
        } );
    }

    protected function avif_support() {

        add_filter( 'upload_mimes', function($mime_types) {

            $mime_types['avif'] = 'image/avif';
            $mime_types['avifs'] = 'image/avif-sequence';

            return $mime_types;
        } );
    }

    protected function heix_support() {

        add_filter( 'upload_mimes', function($mime_types) {

            $mime_types['heic'] = 'image/heic';
            $mime_types['heif'] = 'image/heif';
            $mime_types['heics'] = 'image/heic-sequence';
            $mime_types['heifs'] = 'image/heif-sequence';

            return $mime_types;
        } );
    }

    protected function page_for_terms_and_conditions() {

        if ( ! function_exists('get_the_terms_and_conditions_link') )
            return _doing_it_wrong(__FUNCTION__, 'Define function get_the_terms_and_conditions_link', '1.0');

        $skey = 'wp_page_for_terms_and_conditions';

        add_action( 'admin_init', function () use ($skey) {

            register_setting( 'reading', $skey );

            add_settings_field(
                $skey,
                '<label for="' . $skey . '">' . __( 'Terms & Conditions Page', 'seclgroup' ) . ':</label>',
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

        add_filter( 'display_post_states', function ( $post_states, $post ) use ($skey) {

            if ( intval( get_option($skey) ) === intval($post->ID) )
                $post_states[$skey] = __( 'Terms & Conditions Page', 'seclgroup' );

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
