<?php
/**
 * Template part for displaying post card in loop
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Oceaa
 */

$post_id = !empty($args) && isset($args['post_id']) ? $args['post_id'] : get_the_ID();
$post_title = get_the_title($post_id);
$post_permalink = get_permalink($post_id);

?>
<li id="post-<?php echo $post_id; ?>" <?php post_class('', $post_id); ?>>

    <?php if ( has_post_thumbnail($post_id) ) : ?>

        <a class="post-thumbnail" href="<?php echo $post_permalink ?>" aria-hidden="true" tabindex="-1"><?php
            echo thumbnail_with_alt($post_id);
        ?></a>

    <?php endif; ?>

    <div class="post-details">

        <?php posted_on($post_id); ?>

        <h3 class="post-title dotdotdot">
            <a href="<?php echo esc_url( $post_permalink ) ?>" rel="bookmark"><?php
                esc_html_e($post_title);
            ?></a>
        </h3>

        <div class="posted-in"><?php
            echo get_the_category_list(', ', '', $post_id)
        ?></div>

        <a class="read-more" href="<?php echo esc_url( $post_permalink ) ?>" rel="bookmark">
            <span class="screen-reader-text"><?php
                esc_html_e("Read more");
            ?></span>
        </a>

    </div>

</li><!-- #post-<?php echo $post_id; ?> -->
