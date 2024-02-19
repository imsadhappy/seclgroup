<?php
/**
 * Review Slider Block Template.
 *
 * @package SECLGroup
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during backend preview render.
 * @param   int $post_id The post ID the block is rendering content against.
 *          This is either the post ID currently being displayed inside a query loop,
 *          or the post ID of the post hosting this block.
 * @param   array $context The context provided to the block by the post or it's parent block.
 */

$reviews = get_field('review_slider');
$layout = get_field('review_slider_layout');
$block_id = uniqid('review_slider_');

if (empty($reviews)) :

    $is_preview ? esc_html_e('Please add reviews', 'seclgroup') : '';

else : ?>

<div <?php block_class('wp-block-review-slider', $block) ?>>

    <?php if (!$is_preview) inline_script('/blocks/review-slider/script.js'); ?>

    <div id="<?php echo $block_id ?>" class="review-slider <?php echo "layout-$layout" ?>">

        <?php foreach ($reviews as $review) :

            extract($review);

            if (empty($content) || empty($author))
                continue;

            ?>

            <div class="review-slide">

                <div class="review-slide--inner <?php echo "layout-$layout" ?>">

                    <div class="review-slide--header">

                        <?php if (!empty($image)) : ?>
                            <img class="review-slide--image"
                                src="<?php echo esc_url($image['url']) ?>"
                                alt="<?php esc_attr_e($author) ?>"
                                width="<?php echo intval($image['width']) ?>"
                                height="<?php echo intval($image['height']) ?>">
                        <?php endif; ?>

                        <div class="review-slide--author">

                            <div class="review-slide--name h6"><?php
                                esc_html_e($author)
                            ?></div>

                            <?php if (!empty($position)) : ?>
                                <div class="review-slide--position"><?php
                                    esc_html_e($position)
                                ?></div>
                            <?php endif; ?>

                            <?php if (!empty($date)) : ?>
                                <div class="review-slide--date"><?php
                                    esc_html_e($date)
                                ?></div>
                            <?php endif; ?>

                        </div>

                    </div>

                    <div class="review-slide--content"><?php
                        esc_html_e($content)
                    ?></div>

                </div>

            </div>

        <?php endforeach; ?>

    </div>

</div>

<?php endif;
