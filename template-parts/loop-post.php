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

$post_id = !empty($args) && isset($args['post_id']) ? $args['post_id'] : get_the_ID();
$show_excerpt = !empty($args) && isset($args['show_excerpt']) ? $args['show_excerpt'] : true;
$post_title = get_the_title($post_id);
$post_permalink = get_permalink($post_id);

?>
<li id="post-<?php echo $post_id; ?>" <?php post_class('', $post_id); ?>>

    <div class="post-meta"><?php
        posted_on($post_id);
        posted_by();
    ?></div>

    <a href="<?php echo esc_url( $post_permalink ) ?>" rel="bookmark">
        <h3 class="post-title dotdotdot"><?php
            esc_html_e($post_title);
        ?></h3>
    </a>

    <?php if ($show_excerpt) : ?>
        <a href="<?php echo esc_url( $post_permalink ) ?>" class="post-excerpt"><?php
            echo get_the_excerpt($post_id);
        ?></a>
    <?php endif ?>

    <div class="posted-in"><?php
        echo get_the_category_list(' ', '', $post_id)
    ?></div>

</li><!-- #post-<?php echo $post_id; ?> -->
