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
$team_json = '';
$member_json = function ($member, $img_size = 'large') {
    $json_obj = '';
    $json_str = function ($img_id) use ($member, $img_size) {
        $img = @$member[$img_id];
        return is_array($img) && isset($img['sizes'][$img_size]) ?
            sprintf("$img_id: { url: '%s', width: %d, height: %d },\n",
                            $img['sizes'][$img_size],
                            $img['sizes']["$img_size-width"],
                            $img['sizes']["$img_size-height"]) : '';
    };
    $i = 0;
    while ($i <= 4) {
        if (!empty(@$member["img_{$i}"])) {
            $n = 1;
            $json_obj .= $json_str("img_{$i}");
            while ($n <= 8) {
                $json_obj .= $json_str("img_{$i}_alt_{$n}");
                $n++;
            }
        }
        $i++;
    }
    return $json_obj;
};

if (empty($team_members)) :

    $is_preview ? esc_html_e('Please add images', 'seclgroup') : '';

else : ?>

<div <?php block_class('our-team', $block) ?> id="<?php echo $block_id ?>">

    <?php if (!$is_preview) inline_script('/blocks/our-team/script.js') ?>

    <?php foreach ($team_members as $member) :

    $z = 1;

    while ($z <= 25):

        if (empty($member['img_1']))
            continue;

        $member_id = uniqid('our_team_member_');

        if (!$is_preview)
            $team_json .= "$member_id: { {$member_json($member)} },"; ?>

        <div class="team-member" id="<?php echo $member_id ?>">

            <?php if ( $is_preview ) : ?>
                <img src="<?php echo $member['img_0']['sizes']['medium'] ?>" class="img_0">
            <?php endif ?>

            <div class="team-member--details">
                <div class="team-member--name"><?php esc_html_e($member['name']) ?></div>
                <div class="team-member--position"><?php esc_html_e($member['position']) ?></div>
            </div>

        </div>

    <?php $z++; endwhile; endforeach; ?>

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
