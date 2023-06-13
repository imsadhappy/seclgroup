<?php
/**
 * Big Slider Block Template.
 *
 * @package SECLGroup
 *
 */

$title  = get_field('big_slider_title');
$slides = get_field('big_slider_items');
$button = get_field('big_slider_button');
$see_all_button = function($button_class = '') use ($button){
    if ( is_array($button) ) {

        extract($button);

        if ( !empty($big_slider_button_url) && !empty($big_slider_button_text) )
            printf('<a href="%s" class="wp-element-button button-smaller %s">%s</a>',
                    esc_url($big_slider_button_url),
                    $button_class,
                    esc_html($big_slider_button_text));
    }
};

?>

<section <?php block_class(['mx-big-slider']) ?>>

    <div class="mx-big-slider--heading"><?php

        if ( ! empty($title) )
            printf('<div class="h2">%s</div>', esc_html($title));

        echo $see_all_button('mobile-hidden');

    ?></div>

    <?php if ( ! is_array($slides) || empty($slides) ) {

        esc_html_e('Please add slides', 'seclgroup');

    } else { ?>

        <div class="mx-big-slider--container">

            <div class="mx-big-slider--content"><?php

                foreach ( $slides as $slide ) :

                    if ( empty($slide['big_slider_item_image']) ) continue;

                    ?><div class="mx-big-slider--item">

                        <div class="mx-big-slider--item-imge">
                            <img src="<?php echo esc_url($slide['big_slider_item_image']) ?>" alt="">
                        </div>

                        <?php if ( !empty($slide['big_slider_item_title']) || !empty($slide['big_slider_item_sub_title']) ) : ?>
                            <div class="mx-big-slider--item-text-wrapper">
                                <?php if ( !empty($slide['big_slider_item_title']) ) : ?>
                                    <div class="h3"><?php esc_html_e($slide['big_slider_item_title']) ?></div>
                                <?php endif; ?>
                                <?php if ( !empty($slide['big_slider_item_sub_title']) ) : ?>
                                    <div><?php esc_html_e($slide['big_slider_item_sub_title']); ?></div>
                                <?php endif; ?>
                            </div>
                        <?php endif; ?>

                    </div><?php

                endforeach;

            ?></div>

        </div>

    <?php } ?>

    <div class="mx-big-slider--footer"><?php
        echo $see_all_button('desktop-hidden');
    ?></div>

</section>

<?php inline_script('big-slider');
