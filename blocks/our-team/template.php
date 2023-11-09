<?php
/**
 * Our Team Block Template.
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

$team_members = get_field('team_members');
$block_id = uniqid('our_team_');
$image_count = 0;

if ( ! empty($team_members) ) : ?>

<div <?php block_class('wp-block-our-team', $block) ?>>

    <?php inline_script('/blocks/our-team/script.js') ?>

    <div id="<?php echo $block_id ?>">

        <div class="masonry-size"><!-- Masonry columnWidth template --></div>

        <?php foreach ($team_members as $team_member) :

            if (empty($team_member['photo']))
                continue;

            $image_count++; ?>

            <div class="team-member display-<?php echo empty($team_member['display_bigger']) ? 'smaller' : 'bigger' ?>">
                <img class="team-member--photo"
                    src="<?php echo esc_url($team_member['photo']) ?>"
                    alt="<?php esc_attr_e($team_member['name']) ?>"
                    onload="window.MasonryLoader.imageLoaded('<?php echo $block_id ?>')"
                    onerror="window.MasonryLoader.imageLoaded('<?php echo $block_id ?>')">
                <?php if (!empty($team_member['photo_alt'])) : ?>
                <img class="team-member--photo alt"
                    src="<?php echo esc_url($team_member['photo_alt']) ?>"
                    alt="<?php esc_attr_e($team_member['name']) ?>">
                <?php endif; ?>
                <div class="team-member--details">
                    <div class="team-member--name"><?php esc_html_e($team_member['name']) ?></div>
                    <div class="team-member--position"><?php esc_html_e($team_member['position']) ?></div>
                </div>
            </div>

        <?php endforeach; ?>

    </div>

    <script>window.MasonryLoader.load('<?php echo $block_id ?>', <?php echo $image_count ?>);</script>

</div>

<?php endif;
