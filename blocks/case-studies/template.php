<?php
/**
 * Case Studies Block Template.
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

$case_studies = get_field('case_studies');
$block_id = uniqid('case_studies_');

if (empty($case_studies)) :

    $is_preview ? esc_html_e('Please add content', 'seclgroup') : '';

else : ?>

<div <?php block_class('wp-block-case-studies', $block) ?>>

    <?php if (!$is_preview) inline_script('/blocks/case-studies/script.js'); ?>

    <div id="<?php echo $block_id ?>">

        <?php foreach ($case_studies as $case_study) :

            extract($case_study);

            if (empty($image) || empty($title))
                continue;

            ?>

            <div class="case-study <?php printf('style-%d', intval($style)) ?>"
                 <?php if (!empty($url) && !$is_preview) : ?>
                    onclick="goToCaseStudy(this)"
                    data-url="<?php echo esc_url($url) ?>"
                 <?php endif; ?>>

                <img class="case-study--hover-image"
                     src="<?php printf('%s/assets/case-study-style-%d.svg', get_template_directory_uri(), intval($style)) ?>"
                     alt="<?php esc_attr_e($title) ?>">

                <div class="case-study--content1">

                    <img class="case-study--image"
                        src="<?php echo esc_url($image['url']) ?>"
                        alt="<?php esc_attr_e($title) ?>"
                        width="<?php echo intval($image['width']) ?>"
                        height="<?php echo intval($image['height']) ?>">

                    <div class="case-study--hover-content">

                        <?php if (!empty($description)) : ?>
                            <div class="case-study--description"><?php
                                esc_html_e($description)
                            ?></div>
                        <?php endif; ?>

                        <?php if (!empty($url)) : ?>
                            <a class="case-study--read-more" href="<?php echo esc_url($url) ?>"><?php
                                esc_html_e('Project details', 'seclgroup')
                            ?></a>
                        <?php endif; ?>

                    </div>

                </div>

                <?php if (!empty($industry)) : ?>
                    <div class="case-study--industry"><?php
                        esc_html_e($industry)
                    ?></div>
                <?php endif; ?>

                <div class="case-study--title h5"><?php
                    esc_html_e($title)
                ?></div>

                <?php if (!empty($tags)) :
                    $tags = array_map('trim', explode(',', esc_html($tags)));
                    ?>
                    <div class="case-study--tags"><span><?php
                        echo implode('</span><span>', $tags)
                    ?></span></div>
                <?php endif; ?>

            </div>

        <?php endforeach; ?>

    </div>

</div>

<?php endif;
