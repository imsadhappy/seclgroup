<?php
/**
 * Admin trait
 *
 * @package Oceaa
 */

namespace Oceaa;

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
        $label = 'Terms & Conditions Page';
        $i18n = strtolower(__NAMESPACE__);

        add_action( 'admin_init', function () use ($skey, $label, $i18n) {

            register_setting( 'reading', $skey );

            add_settings_field(
                $skey,
                '<label for="' . $skey . '">' . __( $label, $i18n ) . ':</label>',
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

        add_filter( 'display_post_states', function ( $post_states, $post ) use ($skey, $label, $i18n) {

            if ( intval( get_option($skey) ) === intval($post->ID) )
                $post_states[$skey] = __( $label, $i18n );

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

    public function can_load_more( $post_types = array() ) {

        if ( ! function_exists('load_more_button') )
            return _doing_it_wrong(__FUNCTION__, 'Define function load_more_button', '1.0');

        add_action( 'wp_ajax_load_more', array($this, 'ajax_load_more') );
        add_action( 'wp_ajax_nopriv_load_more', array($this, 'ajax_load_more') );

        foreach ( $post_types as $post_type )
            add_action( "after_loop_$post_type", function ( $posts, $fields = false ) use ( $post_type ) {
                if ( ! is_array($fields) || ! empty($fields['show_load_more_button']) )
                    load_more_button($post_type);
            }, 10, 2 );
    }

    public function ajax_load_more() {

        $post_type = isset($_REQUEST['post_type']) && post_type_exists($_REQUEST['post_type']) ? $_REQUEST['post_type'] :'post';
        $args = array(
			'fields' => 'ids',
			'post_type' => $post_type,
            'offset' => 0,
            'numberposts' => get_option('posts_per_page')
        );

        if ( isset($_REQUEST['offset']) )
            $args['offset'] = intval($_REQUEST['offset']);

        if ( isset($_REQUEST['cat']) )
            $args['cat'] = intval($_REQUEST['cat']);

        if ( isset($_SERVER['HTTP_REFERER']) ) {
            $ref = wp_parse_url( $_SERVER['HTTP_REFERER'], PHP_URL_QUERY );
            wp_parse_str($ref, $q);
            if ( is_array($q) && isset($q['s']) && ! empty($q['s']) ) {
                $args['s'] = sanitize_text_field($q['s']);
                $args['post_type'] = 'any';
                $args['search_columns'] = array('post_title', 'post_excerpt', 'post_content');
                $post_type = 'search';
            }
        }

        foreach( get_posts($args) as $post_id )
            get_template_part( 'template-parts/loop', $post_type, compact('post_id') );

        exit;
    }

    public function can_count_posts( $post_types = array() ) {

        add_action( 'wp_ajax_count_posts', array($this, 'ajax_count_posts') );
        add_action( 'wp_ajax_nopriv_count_posts', array($this, 'ajax_count_posts') );
    }

    public function ajax_count_posts() {

        $results = wp_count_posts(sanitize_text_field($_GET['post_type']));

        exit(isset($results->publish) ? $results->publish : 0);
    }
}
