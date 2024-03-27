<?php
/**
 * Template part for displaying single ?
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SECLGroup
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<?php /* header class="entry-header"><?php

		if ( is_singular() ) {

			the_title( '<h1 class="entry-title">', '</h1>' );

			if ( 'post' === get_post_type() ) : ?>

				<div class="entry-meta"><?php

					posted_on();
					posted_by();

				?></div><!-- .entry-meta -->

			<?php endif;

		} else {

			if ( 'post' === get_post_type() ) : ?>

				<div class="entry-meta"><?php

					echo get_the_category_list(', ');

				?></div><!-- .entry-meta -->

			<?php endif;

			the_title( '<h2 class="entry-title dotdotdot"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );

		}

	?></header><!-- .entry-header -->

	<?php if ( has_post_thumbnail() ) : ?>

		<div class="entry-thumbnail"><?php

			echo thumbnail_with_alt(null, 'full');

		?></div><!-- .entry-thumbnail -->

	<?php endif */ ?>

	<section class="entry-content"><?php

		the_content();

	?></section><!-- .entry-content -->

</article><!-- #post-<?php the_ID(); ?> -->
