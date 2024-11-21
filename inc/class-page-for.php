<?php
/**
 * PageFor
 *
 * @package SECLGroup
 */

namespace SECLGroup;

include 'exit.php';

class PageFor {

    function __construct( $id, $title ) {

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

        add_filter( 'body_class', function ( $classes ) use ( $skey ) {

            if ( intval( get_option($skey) ) === get_queried_object_id() )
                $classes[] = str_replace('_', '-', $skey);

            return $classes;
        } );

        add_filter( 'block_classes', function ( $classes ) use ( $skey ) {

            if ( intval( get_option($skey) ) === intval( get_the_ID() ) )
                $classes[] = 'on-' . str_replace('_', '-', $skey);

            return $classes;
        } );
    }
}
