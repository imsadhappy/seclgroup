<?php
/**
 * Template part for displaying job in loop
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SECLGroup
 */

$post_id = !empty($args) && isset($args['post_id']) ? $args['post_id'] : get_the_ID();
$post_url = esc_url( get_permalink($post_id) );

?>

<li id="job-<?php echo $post_id; ?>" <?php post_class('', $post_id); ?>>

    <a class="job-title" href="<?php echo $post_url ?>"><?php
        echo get_the_title($post_id);
    ?></a>

    <ul class="job-tags"><?php
        post_term_list($post_id, 'job-tag', '<li>', '</li><li>', '</li>');
    ?></ul>

    <a class="read-more" href="<?php echo $post_url ?>">
        <span class="screen-reader-text"><?php
            esc_html_e('View job', 'seclgroup');
        ?></span>
    </a>

</li><!-- #job-<?php echo $post_id; ?> -->
