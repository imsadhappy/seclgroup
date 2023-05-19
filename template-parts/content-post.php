<?php
/**
 * Template part for displaying single post
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Oceaa
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

    <?php if ( ! in_category('whitepapers') ) : ?>

        <header class="entry-header">

            <div class="entry-details">

                <div class="entry-categories"><?php
                    echo get_the_category_list(', ')
                ?></div>

                <?php

                    posted_on();
                    the_title( '<h1 class="entry-title">', '</h1>' );
                    posted_by();

                ?>

            </div>

            <?php if ( has_post_thumbnail() ) : ?>

                <div class="entry-thumbnail"><?php
                    echo thumbnail_with_alt(null, 'full')
                ?></div>

            <?php endif; ?>

        </header>

    <?php endif; ?>

    <section class="entry-content">

        <?php the_content(); ?>

    </section>

</article>
