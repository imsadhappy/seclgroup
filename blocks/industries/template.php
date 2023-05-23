<?php

/**
 * Industries Block Template.
 *
 * @package Oceaa
 *
 */

$title  = get_field('industries_title');
$description  = get_field('industries_description');
$button  = get_field('industries_view_all');
$view_all_button = function($button_class = '') use ($button){
    if ( is_array($button) ) {

        extract($button);

        if ( !empty($industries_viwe_all_link) && !empty($industries_viwe_all_label) )
            printf('<a href="%s" class="button-view-all button-right-arrow %s">%s</a>',
                    esc_url($industries_viwe_all_link),
                    $button_class,
                    esc_html($industries_viwe_all_label));
    }
};

$items = get_field('industries_items');
?>

<section <?php block_class(['mx-industries']) ?>>

    <div class="mx-industries--content">

        <div class="mx-industries--heading">
            
            <div class="mx-industries--heading--text wow slideInRight">

                <?php

                if (!empty($title)) {
                    printf('<div class="h2">%s</div>', esc_html($title));
                }

                if (!empty($description)) {
                    printf('<div class="description">%s</div>', esc_html($description));            
                }

                ?>

            </div>

            <div class="mx-industries--heading--button wow slideInLeft">

                <?php echo $view_all_button(); ?>

            </div>
            
        </div>

        <div class="mx-industries--container wow zoomIn">

            <?php if ( ! is_array($items) || empty($items) ) : ?>

                <?php esc_html_e('Please add Items', theme_textdomain()); ?>

            <?php else : ?>

                <?php foreach( $items as $item ) : ?>

                    <?php if ( empty($item['industries_item_image']) ) continue; ?>

                    <div class="mx-industries--container--item">

                        <a href="<?php echo esc_url($item['industries_items_url']); ?>">

                            <?php if( ! empty($item['industries_item_image']) ) : ?>

                                <img src="<?php echo esc_url($item['industries_item_image']); ?>" alt="">

                            <?php endif; ?>

                            <?php if( ! empty($item['industries_item_title']) ) : ?>

                                <p>
                                    <?php esc_html_e( $item['industries_item_title'] ); ?>
                                </p>

                            <?php endif; ?>                        
                            
                        </a>

                    </div>

                <?php endforeach; ?>

            <?php endif; ?>

        </div>

    </div>

</section>