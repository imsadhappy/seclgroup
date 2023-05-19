<?php
/**
 * Custom Post Type abstract
 *
 * @package Oceaa
 */

namespace Oceaa;

abstract class Post_Type {

    public $post_type = '';
    public $skey = '';
    public $slabel = '';
    public $features = array();

    abstract public function register();

    function __construct() {

        add_action( 'init', array($this, 'register'), 11 );

        foreach ( $this->features as $feature )
            if ( method_exists($this, $feature) )
                $this->{$feature}();
    }

    public static function i18n() {
        return strtolower(__NAMESPACE__);
    }

    protected function page_for_posts() {

        add_action( 'admin_init', function () {

            register_setting( 'reading', $this->skey );

            add_settings_field(
                $this->skey,
                '<label for="' . $this->skey . '">' . __( $this->slabel , self::i18n() ) . ':</label>',
                function () {
                    echo wp_dropdown_pages(
                        array(
                            'name'              => $this->skey,
                            'echo'              => 0,
                            'show_option_none'  => __( '&mdash; Select &mdash;' ),
                            'option_none_value' => '0',
                            'selected'          => get_option( $this->skey ),
                        )
                    );
                },
                'reading'
            );
        } );

        add_filter( 'display_post_states', function ( $post_states, $post ) {

            if ( intval( get_option($this->skey) ) === intval($post->ID) )
                $post_states[$this->skey] = __( $this->slabel, self::i18n() );

            return $post_states;
        }, 10, 2 );

        add_filter( 'post_type_archive_link', function ( $link, $post_type ) {

            if ( $this->post_type === $post_type ) {

                $selected_page = get_option($this->skey);

                if ( ! empty($selected_page) )
                    return get_permalink($selected_page);
            }

            return $link;

        }, 10, 2 );

        add_filter( 'body_class', function ( $classes ) {

            if ( intval( get_option($this->skey) ) === get_queried_object_id() )
                $classes[] = str_replace('_', '-', $this->skey);

            return $classes;
        } );

        add_filter( 'block_classes', function ( $classes ) {

            if ( intval( get_option($this->skey) ) === intval( get_the_ID() ) )
                $classes[] = 'on-' . str_replace('_', '-', $this->skey);

            return $classes;
        } );
    }

    protected function archive_redirect() {

        add_action( 'template_redirect', function() {

            if ( ! is_post_type_archive($this->post_type) )
                return;

            $selected_page = get_option($this->skey);

            if ( empty($selected_page) )
                return;

            wp_redirect( get_permalink($selected_page), 301 );

            exit;
        } );
    }

    protected function singular_redirect() {

        add_action( 'template_redirect', function() {

            if ( ! is_singular($this->post_type) )
                return;

            $selected_page = get_option($this->skey);

            wp_redirect( empty($selected_page) ? get_post_type_archive_link($this->post_type) : get_permalink($selected_page), 301 );

            exit;
        } );
    }

    protected function pre_get_posts() {

        add_action( 'pre_get_posts', function( $query ) {
            if ( $query->is_main_query() && $query->is_post_type_archive($this->post_type) ) {
                $query->set( 'posts_per_page', -1 );
                $query->set( 'orderby', array( 'menu_order' => 'ASC' ) );
            }
        } );
    }
}
