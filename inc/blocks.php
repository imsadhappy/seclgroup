<?php
/**
 * Custom ACF blocks
 *
 * @package SECLGroup
 */

if ( ! defined( 'ABSPATH' ) ) {
    http_response_code(403);
	exit; // Exit if accessed directly.
}

add_filter( 'style_loader_src', function( $src, $handle ) {

    if ( strpos($handle, 'block-acf-seclgroup') === 0 )
        $src = str_replace(constant('ACF_VERSION'), wp_get_theme()->get('Version'), $src);

    return $src;
}, 10, 2 );

add_filter( 'block_categories_all', function ( $block_categories ) {

    array_unshift( $block_categories, array(
        'slug'  => 'seclgroup',
        'title' => _x( 'SECLGroup', 'block category', 'seclgroup' ),
        'icon'  => null,
    ) );

    return $block_categories;
} );

/**
 * Register blocks.
 */
add_action( 'acf/init', function () {

    $folder = get_template_directory_uri();

    acf_register_block( array(
        'name'              => "seclgroup-our-team",
        'title'             => __('Team Members', 'seclgroup'),
        'description'       => __('Grid outputs Team Members (custom post type) Name, Position & Photo.', 'seclgroup'),
        'render_template'   => 'blocks/our-team/template.php',
        'category'          => 'seclgroup',
        'icon'              => 'groups',
        'keywords'          => array( 'our', 'team' ),
        'enqueue_style' =>  "$folder/blocks/our-team/style.css",
    ) );

    acf_register_block( array(
        'name'              => "seclgroup-review-slider",
        'title'             => __('Reviews', 'seclgroup'),
        'description'       => __('A custom slider with Title, Image & Review Text.', 'seclgroup'),
        'render_template'   => 'blocks/review-slider/template.php',
        'category'          => 'seclgroup',
        'icon'              => 'format-quote',
        'keywords'          => array( 'review', 'slider' ),
        'enqueue_style' =>  "$folder/blocks/review-slider/style.css",
    ) );

    acf_register_block( array(
        'name'              => "seclgroup-project-logo",
        'title'             => __('Project Logo', 'seclgroup'),
        'description'       => __('A custom project logo set in project', 'seclgroup'),
        'render_template'   => 'blocks/project-logo/template.php',
        'category'          => 'seclgroup',
        'icon'              => 'format-image',
        'keywords'          => array( 'project', 'logo' )
    ) );

    acf_register_block( array(
        'name'              => "seclgroup-project-list",
        'title'             => __('Project List', 'seclgroup'),
        'description'       => __('A custom project list', 'seclgroup'),
        'render_template'   => 'blocks/project-list/template.php',
        'category'          => 'seclgroup',
        'icon'              => 'format-gallery',
        'keywords'          => array( 'project', 'list' ),
        'enqueue_style' =>  "$folder/blocks/project-list/style.css",
    ) );

    acf_register_block( array(
        'name'              => "seclgroup-pagination",
        'title'             => __('Pagination', 'seclgroup'),
        'description'       => __('A custom block pagination', 'seclgroup'),
        'render_template'   => 'blocks/pagination/template.php',
        'category'          => 'seclgroup',
        'icon'              => 'image-flip-horizontal',
        'keywords'          => array( 'pagination' ),
        //'enqueue_style' =>  "$folder/blocks/pagination/style.css",
    ) );

} );
