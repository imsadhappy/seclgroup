<?php
/**
 * Custom ACF blocks
 *
 * @package SECLGroup
 */

add_filter( 'block_categories_all', function ( $block_categories ) {

    $i18n = theme_textdomain();

    array_unshift( $block_categories, array(
        'slug'  => $i18n,
        'title' => _x( $i18n, 'block category', $i18n ),
        'icon'  => null,
    ) );

    return $block_categories;
} );

/**
 * Register blocks.
 */
add_action( 'acf/init', function () {

    $i18n = theme_textdomain();
    $folder = get_template_directory_uri();

    acf_register_block( array(
        'name'              => "$i18n-text-group",
        'title'             => __('Text Group', $i18n),
        'description'       => __('A custom text group with Title, Paragraph, Link and Block number.', $i18n),
        'render_template'   => 'blocks/text-group/template.php',
        'category'          => $i18n,
        'icon'              => 'text',
        'keywords'          => array( 'text', 'group' ),
        'enqueue_style' =>  "$folder/blocks/text-group/style.css",
    ) );

    acf_register_block( array(
        'name'              => "$i18n-contact-section",
        'title'             => __('Contact Section', $i18n),
        'description'       => __('A custom contact section with Paragraph, Link and Photo.', $i18n),
        'render_template'   => 'blocks/contact-section/template.php',
        'category'          => $i18n,
        'icon'              => 'money',
        'keywords'          => array( 'contact', 'section' ),
        'enqueue_style' =>  "$folder/blocks/contact-section/style.css",
    ) );

    acf_register_block( array(
        'name'              => "$i18n-jobs",
        'title'             => __('Jobs', $i18n),
        'description'       => __('A list of job vacancies.', $i18n),
        'render_template'   => 'blocks/jobs/template.php',
        'category'          => $i18n,
        'icon'              => 'id-alt',
        'keywords'          => array( 'job' ),
        'enqueue_style' =>  "$folder/blocks/jobs/style.css",
    ) );

    acf_register_block( array(
        'name'              => "$i18n-related-posts",
        'title'             => __('Related Posts', $i18n),
        'description'       => __('A list of related blog posts.', $i18n),
        'render_template'   => 'blocks/related-posts/template.php',
        'category'          => $i18n,
        'icon'              => 'columns',
        'keywords'          => array( 'post', 'related' ),
        'enqueue_style' =>  "$folder/blocks/related-posts/style.css",
    ) );

    acf_register_block( array(
        'name'              => "$i18n-blue-wave-background",
        'title'             => __('Blue Wave Background', $i18n),
        'description'       => __('A custom paralax blue wave/line background with.', $i18n),
        'render_template'   => 'blocks/blue-wave-background/template.php',
        'category'          => $i18n,
        'icon'              => 'chart-line',
        'keywords'          => array( 'blue', 'wave', 'background' ),
        'enqueue_style' =>  "$folder/blocks/blue-wave-background/style.css",
    ) );

    // Big Slider
    acf_register_block( array(
        'name'              => "$i18n-big-slider",
        'title'             => __('Big Slider', $i18n),
        'description'       => __('Add a Big slider.', $i18n),
        'render_template'   => 'blocks/big-slider/template.php',
        'category'          => $i18n,
        'icon'              => 'slides',
        'keywords'          => array( 'slider' ),
        'enqueue_style' =>  "$folder/blocks/big-slider/style.css",
    ) );

    // Team Slider
    acf_register_block( array(
        'name'              => "$i18n-team-slider",
        'title'             => __('Team Slider', $i18n),
        'description'       => __('Add a Team slider.', $i18n),
        'render_template'   => 'blocks/team-slider/template.php',
        'category'          => $i18n,
        'icon'              => 'slides',
        'keywords'          => array( 'slider' ),
        'enqueue_style' =>  "$folder/blocks/team-slider/style.css",
    ) );

    // Industries
    acf_register_block( array(
        'name'              => "$i18n-industries",
        'title'             => __('Industries', $i18n),
        'description'       => __('Add a Industries section.', $i18n),
        'render_template'   => 'blocks/industries/template.php',
        'category'          => $i18n,
        'icon'              => 'schedule',
        'keywords'          => array( 'section' ),
        'enqueue_style' =>  "$folder/blocks/industries/style.css",
    ) );

} );
