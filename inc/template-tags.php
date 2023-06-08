<?php
/**
 * Template Tags
 *
 * @package SECLGroup
 */

if ( ! function_exists( 'theme_textdomain' ) ) {

	function theme_textdomain() {

		global $theme_textdomain;

		return $theme_textdomain;
    }
}

if ( ! function_exists( 'posted_on' ) ) {
	/**
	 * Prints HTML with meta information for the current post-date/time.
	 */
	function posted_on( $post_id = false, $return = false ) {

		$time_template = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';

		if ( get_the_time('U', $post_id) !== get_the_modified_time('U', $post_id) ) {
			$time_template = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
		}

		$time_string = sprintf(
			$time_template,
			esc_attr( get_the_date(DATE_W3C, $post_id) ),
			ucfirst( esc_html( get_the_date('', $post_id) ) ),
			esc_attr( get_the_modified_date(DATE_W3C, $post_id) ),
			ucfirst( esc_html( get_the_modified_date('', $post_id) ) )
		);

		$str = sprintf('<span class="posted-on"><a href="%s" rel="bookmark">%s</a></span>', esc_url( get_permalink($post_id) ), $time_string); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		if ( $return )
			return $str;

		echo $str;
	}
}

if ( ! function_exists( 'posted_by' ) ) {
	/**
	 * Prints HTML with meta information for the current author.
	 */
	function posted_by() {

		$author_id = get_the_author_meta( 'ID' );
		$avatar = get_field( 'user_avatar', "user_$author_id" );
		$author =  esc_html( get_the_author() );

		printf('<div class="posted-by byline">
					<span class="author vcard">
						<a class="url fn n" href="%s">%s%s</a>
					</span>
				</div>',
				esc_url( get_author_posts_url( $author_id ) ),
				wp_attachment_is_image($avatar) ? wp_get_attachment_image($avatar) : '',
				$author);
	}
}

if ( ! function_exists( 'the_logo' ) ) {
	/**
	 * Prints HTML with site logo (SVG, custom logo or text).
	 */
	function the_logo() {

		$logo_id = get_theme_mod( 'custom_logo' );
		$site_name = get_bloginfo( 'name', 'display' );
		$site_description = get_bloginfo( 'description', 'display' );

		if ( $logo_id ) {

			if ( 'image/svg+xml' === get_post_mime_type( $logo_id ) ) {
				?><div class="site-logo">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>"
						class="custom-logo-link"
						 aria-label="<?php esc_html_e("Homepage") ?>"
						  rel="home">
						<?php echo str_replace( 'php_generate_unique_id', uniqid('logo_'), file_get_contents( get_attached_file( $logo_id ) ) ) ?>
					</a>
				</div><?php
			} else {
				the_custom_logo();
			}

		} else { ?>
				<div class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php
					echo $site_name;  // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				?></a></div>
			<?php

			if ( $site_description || is_customize_preview() ) : ?>
				<p class="site-description"><?php
					echo $site_description; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				?></p>
			<?php endif;
		}
	}
}

if ( ! function_exists( 'category_list' ) ) {
	/**
	 * Prints HTML with list of all categories.
	 */
	function category_list() {

		$current_category_id = get_query_var( 'cat' );
		$categories = get_categories();
		$blog_url = get_post_type_archive_link( 'post' );

		if ( count($categories) === 0 )
			return;

		?><div class="category-links">

			<a class="category-link <?php echo is_home() ? 'active' : '' ?>" href="<?php echo $blog_url ?>"><?php
				echo get_post_type_object('post')->labels->all_items;
			?></a><?php

		foreach ( $categories as $category ) :

			?><a class="category-link <?php echo $category->term_id === $current_category_id ? 'active' : '' ?>"
				 href="<?php echo get_category_link($category->term_id)?>"><?php
				 	echo $category->name
				?></a><?php endforeach; ?>

		</div><!-- .category-links --><?php
	}
}

if ( ! function_exists( 'term_list' ) ) {
	/**
	 * Prints HTML with list of all terms.
	 */
	function term_list( $current_post_type = '' ) {

		if ( empty($current_post_type) )
			$current_post_type = get_query_var( 'post_type' );

		$taxonomies = array();
		$current_taxonomy = get_query_var( 'taxonomy' );
		$post_types = array( $current_post_type );

		if ( ! empty( $post_types ) )
			$taxonomies = get_object_taxonomies( $post_types[0] );

		if ( ! empty( $current_taxonomy ) ) {
			$post_types = get_taxonomy( $current_taxonomy )->object_type;
			foreach ( $post_types as $post_type ) {
				$taxonomies = array_merge( $taxonomies, get_object_taxonomies( $post_type ) );
			}
		}

		?><div class="term-links"><?php

		foreach ( $post_types as $post_type ) :

			?><a class="term-link <?php echo $current_post_type === $post_type ? 'active' : '' ?>"
				 href="<?php echo get_post_type_archive_link($post_type) ?>"><?php
					echo get_post_type_object($post_type)->labels->all_items;
			?></a><?php

		endforeach;

		foreach ( $taxonomies as $taxonomy ) {

			$terms = get_terms( array( 'taxonomy' => $taxonomy ) );

			if ( ! is_array($terms) )
				continue;

			foreach ( $terms as $term ) :

				?><a class="term-link <?php echo $term->slug === get_query_var( 'term' ) ? 'active' : '' ?>"
					href="<?php echo get_term_link($term) ?>"><?php
						echo $term->name;
				?></a><?php endforeach;

		} ?>

		</div><!-- .term-links --><?php
	}
}

if ( ! function_exists( 'post_term_list' ) ) {
	/**
	 * Prints HTML with list of all post term links.
	 */
	function post_term_list( $post_id = false, $terms = array(), $before = '', $separator = ', ', $after = '' ) {

		$post_id = $post_id ? $post_id : get_the_ID();
		$post_term_list = array();

		if ( is_string($terms) )
			$terms = array($terms);

		foreach ( $terms as $term ) {

			$term_list = get_the_term_list($post_id, $term, $before, $separator, $after);

			if ( ! empty($term_list) && ! is_wp_error($term_list) )
				$post_term_list[] = $term_list;
		}

		echo implode(', ', $post_term_list);
	}
}

if ( ! function_exists( 'related_posts' ) ) {
	/**
	 * Prints HTML with list of related posts.
	 */
	function related_posts( $post_id ) {

		$i18n = theme_textdomain();
		$related_posts = get_post_meta($post_id, 'related_posts', true);

		if ( ! empty($related_posts) ) : ?>

			<div class="related-entries">

				<div class="flex-space-between">
					<div class="h3"><?php esc_html_e('Related posts', $i18n) ?></div>
					<a href="<?php echo get_post_type_archive_link( 'post' ); ?>" class="wp-element-button mobile-hidden button-smaller"><?php esc_html_e('See all', $i18n) ?></a>
				</div>

				<ul class="post-list">

				<?php foreach( $related_posts as $post_id ) :

					get_template_part( 'template-parts/loop',
										get_post_type( $post_id ),
										compact('post_id') );

				endforeach; ?>

				</ul><!-- .posts-list -->

			</div><!-- .related-entries -->

		<?php endif;
	}
}

if ( ! function_exists( 'block_loop_template' ) ) {
	/**
	 * Prints HTML with list of posts in block.
	 */
	function block_loop_template( $block, $post_type = 'post', $fields = null, $page_id = null ) {

		if ( ! post_type_exists($post_type) )
			return;

		$i18n = theme_textdomain();
		$block_name = str_replace("acf/$i18n-", '', $block['name']);
		$args = array(
			'fields' => 'ids',
			'post_type' => $post_type,
			'numberposts' => -1
		);

		if ( ! empty($fields['selected_items']) ) {
			$args['include'] = $fields['selected_items'];
			$args['orderby'] = 'post__in';
			$args['order'] = 'DESC';
		} elseif ( ! empty($fields['number_of_items']) ) {
			$args['numberposts'] = $fields['number_of_items'];
		} elseif ( ! empty($fields['show_load_more_button']) ) {
			$args['numberposts'] = get_option('posts_per_page');
		}

		$see_all_button = function($button_class = '') use ($fields, $post_type, $i18n) {
			if (!empty($fields['show_see_all_button']))
				printf('<a href="%s" class="wp-element-button button-smaller %s">%s</a>',
						esc_url(get_post_type_archive_link($post_type)),
						$button_class,
						esc_html_x(empty($fields['button_text']) ? 'See all' : $fields['button_text'], $post_type, $i18n));
		};

		$posts = get_posts($args);

		?>
		<div <?php block_class( array('wp-block', $block_name), $block ) ?>>

			<?php if (!empty($fields['show_heading'])) : ?>

				<div class="<?php echo $block_name ?>--heading wp-block-list--heading">

					<h2><?php
						echo esc_html_x(
							empty($fields['heading_text']) ?
							$block['title'] :
							$fields['heading_text'],
						$post_type, $i18n);
					?></h2>

					<?php $see_all_button('mobile-hidden') ?>

				</div>

			<?php endif; ?>

			<?php $fields = apply_filters($post_type.'_loop_fields', $fields, $posts); ?>

			<ul class="post-list"><?php

				foreach( $posts as $post_id )
					get_template_part( 'template-parts/loop', $post_type, compact('post_id', 'block', 'fields', 'page_id') );

			?></ul><!-- .posts-list -->

			<?php do_action("after_loop_$post_type", $posts, $fields); ?>

			<div class="<?php echo $block_name ?>--footer wp-block-list--footer"><?php
				$see_all_button('desktop-hidden');
			?></div>

		</div><?php
	}
}

if ( ! function_exists( 'block_class' ) ) {

	function block_class( $classes = array(), $block = array() ) {

		if ( is_string($classes) )
			$classes = array($classes);

		if ( ! empty( $block['align'] ) )
			$classes[] = 'align' . $block['align'];

		if ( ! empty( $block['className'] ) )
			$classes[] = $block['className'];

		printf( 'class="%s"', esc_attr( implode( ' ', apply_filters( 'block_classes', $classes ) ) ) );
	}
}

if ( ! function_exists( 'inline_script' ) ) {

	function inline_script( $script_name, $once = true ) {

		$script = get_template_directory() . "/js/$script_name.js";

		if ( ! file_exists($script) )
			return;

		if ( $once ) {

			if ( ! isset($GLOBALS['inlined_scripts']) )
				$GLOBALS['inlined_scripts'] = array();

			if ( in_array($script_name, $GLOBALS['inlined_scripts']) )
				return;

			$GLOBALS['inlined_scripts'][] = $script_name;
		}

		printf('<script id="inline-%s-js">%s</script>', $script_name, file_get_contents($script));
	}
}

if ( ! function_exists( 'thumbnail_with_alt' ) ) {

	function thumbnail_with_alt( $post_id = null, $size = 'post-thumbnail' ) {

		return get_the_post_thumbnail( $post_id, $size, array(
			'alt' => the_title_attribute( array(
				'echo' => false,
				'post' => $post_id
			) )
		) );
	}
}

if ( ! function_exists( 'get_the_terms_and_conditions_link' ) ) {

	/**
	 * Returns the terms & conditions link with formatting, when applicable.
	 *
	 * @param string $before Optional. Display before terms & conditions link. Default empty.
	 * @param string $after  Optional. Display after terms & conditions link. Default empty.
	 * @return string Markup for the link and surrounding elements. Empty string if it
	 *                doesn't exist.
	 */
	function get_the_terms_and_conditions_link( $before = '', $after = '' ) {

		$link = '';
		$page_id = (int) get_option( 'wp_page_for_terms_and_conditions' );
		$page_title = $page_id ? get_the_title( $page_id ) : '';
		$page_url = $page_id ? get_permalink($page_id) : '';

		if ( $page_url && $page_title ) {
			$link = sprintf(
				'<a class="terms-and-conditions-link" href="%s">%s</a>',
				esc_url( $page_url ),
				esc_html( $page_title )
			);
		}

		/**
		 * Filters the terms & conditions link.
		 *
		 * @since 4.9.6
		 *
		 * @param string $link               The terms & conditions link. Empty string if it
		 *                                   doesn't exist.
		 * @param string $page_url The URL of the terms & conditions. Empty string
		 *                                   if it doesn't exist.
		 */
		$link = apply_filters( 'the_terms_and_conditions_link', $link, $page_url );

		if ( $link ) {
			return $before . $link . $after;
		}

		return '';
	}
}

if ( ! function_exists( 'the_terms_and_conditions_link' ) ) {

	/**
	 * Displays the terms & conditions link with formatting, when applicable.
	 *
	 * @param string $before Optional. Display before terms & conditions link. Default empty.
	 * @param string $after  Optional. Display after terms & conditions link. Default empty.
	 */
	function the_terms_and_conditions_link( $before = '', $after = '' ) {
		echo get_the_terms_and_conditions_link( $before, $after );
	}
}

if ( ! function_exists( 'load_more_button' ) ) {

	function load_more_button( $post_type = 'post' ) {

		$i18n = theme_textdomain();

		?><button type="button"
			data-offset="<?php echo get_option('posts_per_page') ?>"
			data-post_type="<?php echo $post_type ?>"
			data-cat="<?php echo get_query_var( 'cat' ) ?>"
			class="ajax-load-more ajax-count-<?php echo $post_type ?>">
			<span><?php esc_html_e( 'Load more items', $i18n ) ?></span>
			<span class="on-none"><?php esc_html_e( 'No more items', $i18n ) ?></span>
		</button><?php

		inline_script('ajax-load-more');
	}
}
