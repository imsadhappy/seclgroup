<?php
/**
 * The template to redirect attachment
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SECLGroup
 */

if ( $post->post_parent ) {
    wp_redirect( get_permalink($post->post_parent) );
} else {
    wp_redirect( home_url() );
}

exit;
