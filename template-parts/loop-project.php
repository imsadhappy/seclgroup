<?php
/**
 * Template part for displaying post card in loop
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SECLGroup
 */
if ( ! defined( 'ABSPATH' ) ) {
    http_response_code(403);
	exit; // Exit if accessed directly.
}

$post_id = get_the_ID();
$show_excerpt = false;
$show_explore = false;
$show_logo = false;
if (!empty($args)) extract($args);
if (!empty($fields)) extract($fields);
$post_title = get_the_title($post_id);
$post_permalink = get_permalink($post_id);
$logo = get_field('project_logo', $post_id);
$industry = get_field('project_industry', $post_id);

?>

<li id="project-<?php echo $post_id ?>"
    onclick="goToProject(this)"
    data-url="<?php echo esc_url($post_permalink) ?>"
    <?php post_class(array('project-item', 'go-to-project'), $post_id); ?>>

    <div class="project--thumbnail">

        <?php if ( has_post_thumbnail($post_id) ) : ?>

            <?php project_stain($post_id) ?>

            <?php if (!empty($industry)) : ?>
                <div class="project--industry"><?php
                    esc_html_e($industry)
                ?></div>
            <?php endif; ?>

            <?php echo thumbnail_with_alt($post_id, 'full') ?>

        <?php endif ?>

    </div><!-- .project-thumbnail -->

    <div class="project--content">

        <?php if ( $show_logo && !empty($logo) ) project_logo($logo); ?>

        <h5 class="project--title dotdotdot"><?php
            esc_html_e( $post_title )
        ?></h5>

        <?php if ( $show_excerpt ) : ?>
            <div class="project--excerpt has-text-secondary-color"><?php
                echo get_the_excerpt( $post_id )
            ?></div>
        <?php endif ?>

        <div class="taxonomy-project-category wp-block-post-terms"><?php
            echo get_the_term_list( $post_id, 'project-category' )
        ?></div>

        <?php if ( $show_explore ) : ?>
            <div class="project--explore wp-block-button is-style-outline has-arrow-right mobile-full-width has-medium-font-size">
                <a href="<?php echo esc_url( $post_permalink ) ?>" class="wp-element-button"><?php
                    esc_html_e('Explore', 'seclgroup')
                ?></a>
            </div>
        <?php endif ?>

    </div>

</li><!-- #project-<?php echo $post_id ?> -->
