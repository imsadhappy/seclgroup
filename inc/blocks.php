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
        'name'              => "seclgroup-text-group",
        'title'             => __('Text Group', 'seclgroup'),
        'description'       => __('A custom text group with Title, Paragraph, Link and Block number.', 'seclgroup'),
        'render_template'   => 'blocks/text-group/template.php',
        'category'          => 'seclgroup',
        'icon'              => 'text',
        'keywords'          => array( 'text', 'group' ),
        'enqueue_style' =>  "$folder/blocks/text-group/style.css",
    ) );

    acf_register_block( array(
        'name'              => "seclgroup-contact-section",
        'title'             => __('Contact Section', 'seclgroup'),
        'description'       => __('A custom contact section with Paragraph, Link and Photo.', 'seclgroup'),
        'render_template'   => 'blocks/contact-section/template.php',
        'category'          => 'seclgroup',
        'icon'              => 'money',
        'keywords'          => array( 'contact', 'section' ),
        'enqueue_style' =>  "$folder/blocks/contact-section/style.css",
    ) );

    acf_register_block( array(
        'name'              => "seclgroup-jobs",
        'title'             => __('Jobs', 'seclgroup'),
        'description'       => __('A list of job vacancies.', 'seclgroup'),
        'render_template'   => 'blocks/jobs/template.php',
        'category'          => 'seclgroup',
        'icon'              => 'id-alt',
        'keywords'          => array( 'job' ),
        'enqueue_style' =>  "$folder/blocks/jobs/style.css",
    ) );

    acf_register_block( array(
        'name'              => "seclgroup-related-posts",
        'title'             => __('Related Posts', 'seclgroup'),
        'description'       => __('A list of related blog posts.', 'seclgroup'),
        'render_template'   => 'blocks/related-posts/template.php',
        'category'          => 'seclgroup',
        'icon'              => 'columns',
        'keywords'          => array( 'post', 'related' ),
        'enqueue_style' =>  "$folder/blocks/related-posts/style.css",
    ) );

    // Big Slider
    acf_register_block( array(
        'name'              => "seclgroup-big-slider",
        'title'             => __('Big Slider', 'seclgroup'),
        'description'       => __('Add a Big slider.', 'seclgroup'),
        'render_template'   => 'blocks/big-slider/template.php',
        'category'          => 'seclgroup',
        'icon'              => 'slides',
        'keywords'          => array( 'slider' ),
        'enqueue_style' =>  "$folder/blocks/big-slider/style.css",
    ) );

    // Team Slider
    acf_register_block( array(
        'name'              => "seclgroup-team-slider",
        'title'             => __('Team Slider', 'seclgroup'),
        'description'       => __('Add a Team slider.', 'seclgroup'),
        'render_template'   => 'blocks/team-slider/template.php',
        'category'          => 'seclgroup',
        'icon'              => 'slides',
        'keywords'          => array( 'slider' ),
        'enqueue_style' =>  "$folder/blocks/team-slider/style.css",
    ) );

    // Industries
    acf_register_block( array(
        'name'              => "seclgroup-industries",
        'title'             => __('Industries', 'seclgroup'),
        'description'       => __('Add a Industries section.', 'seclgroup'),
        'render_template'   => 'blocks/industries/template.php',
        'category'          => 'seclgroup',
        'icon'              => 'schedule',
        'keywords'          => array( 'section' ),
        'enqueue_style' =>  "$folder/blocks/industries/style.css",
    ) );

} );
