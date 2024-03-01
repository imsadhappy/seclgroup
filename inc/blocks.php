<?php
/**
 * Custom ACF blocks
 *
 * @package SECLGroup
 */

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
        'title'             => __('Our Team', 'seclgroup'),
        'description'       => __('Grid outputs Team Members (custom post type) Name, Position & Photo.', 'seclgroup'),
        'render_template'   => 'blocks/our-team/template.php',
        'category'          => 'seclgroup',
        'icon'              => 'groups',
        'keywords'          => array( 'our', 'team' ),
        'enqueue_style' =>  "$folder/blocks/our-team/style.css",
    ) );

    acf_register_block( array(
        'name'              => "seclgroup-case-studies",
        'title'             => __('Case Studies', 'seclgroup'),
        'description'       => __('A custom slider with Title, Image, Description & Tags.', 'seclgroup'),
        'render_template'   => 'blocks/case-studies/template.php',
        'category'          => 'seclgroup',
        'icon'              => 'format-gallery',
        'keywords'          => array( 'case', 'study', 'studies' ),
        'enqueue_style' =>  "$folder/blocks/case-studies/style.css",
    ) );

    acf_register_block( array(
        'name'              => "seclgroup-review-slider",
        'title'             => __('Review Slider', 'seclgroup'),
        'description'       => __('A custom slider with Title, Image, Description.', 'seclgroup'),
        'render_template'   => 'blocks/review-slider/template.php',
        'category'          => 'seclgroup',
        'icon'              => 'format-gallery',
        'keywords'          => array( 'review', 'slider' ),
        'enqueue_style' =>  "$folder/blocks/review-slider/style.css",
    ) );

} );
