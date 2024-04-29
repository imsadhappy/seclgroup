<?php
/**
 * Template part for displaying single post
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SECLGroup
 */
if ( ! defined( 'ABSPATH' ) ) {
    http_response_code(403);
	exit; // Exit if accessed directly.
}

?>

<div class="three-columns">

    <aside class="uses-widget--blog-aside js-inject-content"><?php

        dynamic_sidebar('blog-aside');

    ?></aside>

    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

        <header class="entry-header">

            <div class="entry-meta"><?php

                posted_on();
                posted_by();

            ?></div>

            <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>

            <?php /* if ( has_post_thumbnail() ) : ?>

                <div class="entry-thumbnail"><?php
                    echo thumbnail_with_alt(null, 'full')
                ?></div>

            <?php endif; */ ?>

        </header>

        <section class="entry-content js-inject-container"><?php

            the_content()

        ?></section>

        <footer class="entry-footer">

            <div class="entry-categories"><?php

                echo get_the_category_list(' ')

            ?></div>

            <div class="entry-author">

                <div class="entry-author__heading"><?php

                    esc_html_e('Author', 'seclgroup')

                ?></div>

                <?php posted_by('extended') ?>

            </div>

            <?php related_posts() ?>

        </footer>

    </article>

    <aside class="js-inject-content"><?php

        related_links();

    ?></aside>

</div>

<?php blog_content() ?>
