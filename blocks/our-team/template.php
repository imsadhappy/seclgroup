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

$team_members = get_posts(['post_type' => 'team-member', 'numberposts' => -1]);
$block_id = uniqid('our_team_');
$team_json = '';
$imgs_json = function ($post_id, $img_size = 'medium') {
    $img = wp_get_attachment_image_src(get_post_thumbnail_id($post_id), $img_size);
    $json_obj = "img_0: { url: '{$img[0]}', width: {$img[1]}, height: {$img[2]} },\n";
    $json_str = function ($img_id, $img) use ($img_size) {
        return is_array($img) && isset($img['sizes'][$img_size]) ?
            sprintf("$img_id: { url: '%s', width: %d, height: %d },\n",
                            $img['sizes'][$img_size],
                            $img['sizes']["$img_size-width"],
                            $img['sizes']["$img_size-height"]) : '';
    };
    foreach (get_field('imgs', $post_id) as $i => $images) {
        foreach ($images as $n => $img) {
            $json_obj .= $json_str("img_" . ($i+1) . ($n === 'img' ? '' : "_$n"), $img);
        }
    }
    return $json_obj;
};

if (empty($team_members)) :

    $is_preview ? esc_html_e('Please add images', 'seclgroup') : '';

else : ?>

<div <?php block_class('our-team', $block) ?> id="<?php echo $block_id ?>">

    <?php if (!$is_preview) inline_script('/blocks/our-team/script.js');

    //$n = count($team_members);

    foreach ($team_members as $member) :

        //$z = 1; while ($n < 25 && $z <= ceil(25 / $n)) :

        $member_id = uniqid('our_team_member_');

        if (!$is_preview)
            $team_json .= "$member_id: { {$imgs_json($member->ID)} },"; ?>

        <div class="team-member" id="<?php echo $member_id ?>">

            <?php if ( $is_preview ) : ?>
                <img src="<?php echo get_the_post_thumbnail_url($member) ?>" class="img_0">
            <?php endif ?>

            <div class="team-member--details">
                <div class="team-member--name"><?php esc_html_e($member->post_title) ?></div>
                <div class="team-member--position"><?php esc_html_e(get_field('position', $member->ID)) ?></div>
            </div>

        </div>

    <?php //$z++; endwhile; ?>

    <?php endforeach; ?>

    <?php if (!$is_preview) : ?>
        <script>document.dispatchEvent(
            new CustomEvent(
                'ourTeam:init', <?php
                    echo "{ detail: { $block_id: { $team_json } } }"
                ?>)
        )</script>
    <?php endif ?>

</div>

<?php endif;
