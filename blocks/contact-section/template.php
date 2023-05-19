<?php
/**
 * Contact Section Block Template.
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

$text = get_field('section_contact_text');
$small_text = get_field('section_contact_small_text');
$image = get_field('section_contact_image');
$links = get_field('section_contact_links');
$links = get_field('section_contact_links');
$background_color = boolval(get_field('section_contact_background_color'));

if ( empty($text) )
   $text = esc_html__('Please enter text', theme_textdomain());

?>

<section <?php block_class(array('contact-section', $background_color ? 'orange' : 'blue'), $block) ?>>

    <?php if ( is_array($image) ) {

            $image_attributes = array(
                'alt' => esc_attr($text)
            );

            $image_attributes = get_field('section_contact_image_attributes');

            if ( ! empty($image_attributes) ) {

                $image_inline_styles = array();

                if ( isset($image_attributes['width']) )
                    $image_inline_styles[] = 'max-width:' . $image_attributes['width'] . 'px';

                if ( isset($image_attributes['offset_x']) )
                    $image_inline_styles[] = 'margin-right:' . $image_attributes['offset_x'] . 'px';

                if ( isset($image_attributes['offset_y']) )
                    $image_inline_styles[] = 'margin-top:' . $image_attributes['offset_y'] . 'px';

                if ( ! empty($image_inline_styles) )
                    $image_attributes['style'] = implode(';', $image_inline_styles);
            }

            echo wp_get_attachment_image($image['id'], 'full', false, $image_attributes);
        }
    ?>

    <div class="contact-section--content">

        <div class="contact-section--text"><?php
            esc_html_e($text);
        ?></div>

        <?php if ( ! empty($small_text) ) : ?>
            <div class="contact-section--small-text"><?php
                esc_html_e($small_text);
            ?></div>
        <?php endif; ?>

        <?php if ( ! empty($links) ) : ?>
            <div class="contact-section--links">
                <?php foreach ( $links as $link ) :
                    $has_text = ! empty($link['text']);
                    $has_icon = ! empty($link['icon']);
                    if ( $has_text || $has_icon ) :
                        ?><a href="<?php echo esc_url($link['url']) ?>"
                            class="contact-section--link <?php echo $has_text ? 'has-text':'' ?>"
                            target="_blank" rel="nofollow"><?php
                                if ($has_icon) echo $link['icon'];
                                if ($has_text) printf('<span>%s</span>', esc_html__($link['text']));
                        ?></a><?php
                    endif;
                endforeach; ?>
            </div>
        <?php endif; ?>

    </div>

</section>
