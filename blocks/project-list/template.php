<?php
/**
 * Project List Block Template.
 *
 * @package Oceaa
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during backend preview render.
 * @param   int $post_id The post ID the block is rendering content against.
 *          This is either the post ID currently being displayed inside a query loop,
 *          or the post ID of the post hosting this block.
 * @param   array $context The context provided to the block by the post or it's parent block.
 */

if ( ! defined( 'ABSPATH' ) ) {
    http_response_code(403);
	exit; // Exit if accessed directly.
}

if ( boolval( get_field('as_slider') ) ) : ?>

<div <?php block_class('wp-block-case-studies', $block) ?>>

    <div id="<?php echo uniqid('case_studies_') ?>" class="scrollable hoverscrolled-alt mobile-not-scrollable">

        <?php

            $get_block_posts = function() {

                $args = array(
                    'fields' => 'ids',
                    'post_type' => 'project',
                    'numberposts' => -1
                );

                $selected_items = get_field('selected_items');

                if ( !empty($selected_items) ) {
                    $args['include'] = $selected_items;
                    $args['orderby'] = 'post__in';
                    $args['order'] = 'DESC';
                }

                return get_posts($args);
            };

            foreach ($get_block_posts() as $post_id) :

                $post_permalink = get_permalink($post_id);
                $post_title = get_the_title($post_id);
                $industry = get_field('project_industry', $post_id);

            ?>

            <div class="case-study go-to-project <?php printf('style-%d', intval(get_field('project_style', $post_id))) ?>"
                data-url="<?php echo esc_url($post_permalink) ?>">

                <div class="case-study--container">

                    <?php project_stain($post_id, "case-study--hover-image") ?>

                    <div class="case-study--content">

                        <?php echo thumbnail_with_alt($post_id, 'full') ?>

                        <div class="case-study--hover-content">

                            <div class="case-study--description"><?php
                                echo get_the_excerpt($post_id)
                            ?></div>

                            <a class="case-study--read-more" href="<?php echo esc_url($post_permalink) ?>"><?php
                                esc_html_e('Project details', 'seclgroup')
                            ?></a>

                        </div>

                    </div>

                    <?php if (!empty($industry)) : ?>
                        <div class="case-study--industry"><?php
                            esc_html_e( $industry )
                        ?></div>
                    <?php endif; ?>

                </div>

                <div class="case-study--meta">

                    <div class="case-study--title h5"><?php
                        esc_html_e( $post_title )
                    ?></div>

                    <div class="taxonomy-project-category wp-block-post-terms case-study--tags"><?php
                        echo get_the_term_list( $post_id, 'project-category' )
                    ?></div>

                </div>

            </div>

        <?php endforeach; unset( $get_block_posts, $post_id ); ?>

    </div>

    <?php if (!$is_preview) inline_script('/blocks/project-list/script.js'); ?>

</div>

<?php else :

    block_loop_template( $block, 'project', get_fields(), $post_id );

endif;
