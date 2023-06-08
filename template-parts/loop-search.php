<?php
/**
 * Template part for displaying search result in loop
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SECLGroup
 */

$post_id = !empty($args) && isset($args['post_id']) ? $args['post_id'] : get_the_ID();
$post_title = get_the_title($post_id);
$post_excerpt = get_the_excerpt($post_id);
$post_type_name = ucfirst(__(get_post_type($post_id), theme_textdomain()));

?>
<li id="post-<?php echo $post_id; ?>" <?php post_class('', $post_id); ?>>

    <a href="<?php echo esc_url( get_permalink($post_id)) ?>" rel="bookmark" class="entry-title"><?php
        echo $post_title
    ?></a>

    <div class="entry-excerpt">
        <?php if ( $post_excerpt != $post_title ) : ?>
            <p><?php
                if ( ! empty($post_excerpt) ) {
                    echo  $post_type_name . '. ' . $post_excerpt;
                } else {
                    printf(
                        $post_type_name . '. ' . __( 'Published on: %s' ),
                        posted_on($post_id, true)
                    );
                }
            ?></p>
        <?php endif; ?>
    </div>

</li><!-- #post-<?php echo $post_id; ?> -->
