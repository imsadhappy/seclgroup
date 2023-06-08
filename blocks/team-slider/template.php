<?php
/**
 * Team Slider Block Template.
 *
 * @package SECLGroup
 *
 */

$slides = get_field('team_slider_items');

?>

<section <?php block_class(['mx-team-slider-section']) ?>>

    <div class="mx-team-slider-header"></div>

    <?php if( $slides ) : ?>

        <div class="mx-team-slider-container">

            <div class="mx-team-slider-wrapper owl-carousel">

                <?php foreach( $slides as $slide ) : ?>

                    <div class="mx-team-slider-item">

                        <div class="mx-team-slider-item-teammate">

                            <img src="<?php echo $slide['team_slider_item_image']; ?>" alt="">

                            <h5><?php echo $slide['team_slider_item_name']; ?></h5>

                            <p><?php echo $slide['team_slider_item_position']; ?></p>

                        </div>

                    </div>

                <?php endforeach; ?>

            </div>

        </div>

        <?php inline_script('team-slider'); ?>

    <?php endif; ?>

</section>
