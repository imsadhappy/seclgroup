<?php
/**
 * Template part for displaying single job
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Oceaa
 */

$post_id = get_the_ID();
?>

<article id="post-<?php echo $post_id ?>" <?php post_class(); ?>>

	<header class="entry-header" <?php if ( has_post_thumbnail($post_id) )
        echo 'style="background-image:url(' . get_the_post_thumbnail_url($post_id, 'full') . ')"';
    ?>>

        <div class="entry-header--container">

            <div class="entry-header--content">

                <?php the_title('<h1 class="entry-title">', '</h1>'); ?>

                <div class="entry-tags"><?php
                    post_term_list($post_id, 'job-tag', '', ' | ', '');
                ?></div>

                <div class="entry-excerpt"><?php
                    the_excerpt();
                ?></div>

            </div>

        </div>

	</header><!-- .entry-header -->

	<section class="entry-content"><?php

        the_content();

    ?></section><!-- .entry-content -->

</article><!-- #post-<?php the_ID(); ?> -->
