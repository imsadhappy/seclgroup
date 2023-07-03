<?php
/**
 * Custom ACF blocks
 *
 * @package SECLGroup
 */

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
        'description'       => __('A custom masonry grid with Name, Position & Photo.', 'seclgroup'),
        'render_template'   => 'blocks/our-team/template.php',
        'category'          => 'seclgroup',
        'icon'              => 'groups',
        'keywords'          => array( 'our', 'team' ),
        'enqueue_style' =>  "$folder/blocks/our-team/style.css",
    ) );

    acf_register_block( array(
        'name'              => "seclgroup-case-studies",
        'title'             => __('Case Studies', 'seclgroup'),
        'description'       => __('A custom slider for with Title, Image, Description & Tags.', 'seclgroup'),
        'render_template'   => 'blocks/case-studies/template.php',
        'category'          => 'seclgroup',
        'icon'              => 'format-gallery',
        'keywords'          => array( 'case', 'study', 'studies' ),
        'enqueue_style' =>  "$folder/blocks/case-studies/style.css",
    ) );

} );
