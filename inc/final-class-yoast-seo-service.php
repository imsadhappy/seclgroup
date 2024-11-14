<?php
/**
 * YoastSEO Service
 *
 * @package SECLGroup
 */

namespace SECLGroup;

if ( ! defined( 'ABSPATH' ) ) {
    http_response_code(403);
	exit; // Exit if accessed directly.
}

final class YoastSEOService {

    function __construct()
    {
        $this->enchanced_schema_author_graph();
        $this->uppercase_url_redirect();
        $this->fill_void_image_alt();
        $this->projects_breadcrumbs();
        $this->noindex_override();
        $this->fix_rel_canonical();
        $this->fix_permalink_redirect();
        $this->draft_breadcrumb_single_link();

        add_filter( 'disable_wpseo_json_ld_search', '__return_true' );
    }

    private function uppercase_url_redirect() {

        if (is_admin() || wp_doing_ajax() || wp_doing_cron()) return;

        $url = $_SERVER['REQUEST_URI'];

        // If URL contains a period, halt (likely contains a filename and filenames are case specific)
        if ( preg_match('/[\.]/', $url) ) return;

        if ( preg_match('/[A-Z]/', $url) ) {

            $lc_url = empty($_SERVER['QUERY_STRING']) ? strtolower($url) : strtolower( strtok($url, '?') ) . '?' . $_SERVER['QUERY_STRING'];

            if ($lc_url !== $url) {
                header("Location: " . sanitize_url($lc_url), TRUE, 301);
                exit;
            }
        }
    }

    private function fix_rel_canonical() {

        add_filter( 'wpseo_canonical', function ( $canonical, $presentation ) {

            if ('category' === $presentation?->model?->object_sub_type) {
                return get_post_type_archive_link( 'post' );
            }

            return $canonical;
        }, 999, 2 );
    }

    private function enchanced_schema_author_graph() {

        add_filter( 'wpseo_schema_author', function ( $graph_piece, $context, $graph_piece_generator, $graph_piece_generators ) {

            $author_url = get_field( 'author_page', "user_{$context->indexable->author_id}" );

            if ($author_url)
                $graph_piece["url"] = esc_url($author_url);

            $role = get_field( 'user_role', "user_{$context->indexable->author_id}" );

            if ($role)
                $graph_piece["jobTitle"] = esc_html($role);

            return $graph_piece;
        }, 10, 4 );
    }

    private function fill_void_image_alt() {

        $n = 0;
        $alt = '%s, Image %d';
        $page_title = esc_attr(get_bloginfo('name'));

        add_action( 'wp_body_open', function () use ( &$page_title ) {
            if (!function_exists('YoastSEO')) return;
            $page_title = \YoastSEO()->meta->for_current_page()->title;
            $page_title = preg_replace("/[^A-Za-z0-9 ]/", '', $page_title);
            $page_title = preg_replace('!\s+!', ' ', $page_title);
            $page_title = esc_attr($page_title);
        } );

        add_filter( 'render_block', function ( $block_content ) use ( &$page_title, &$n, $alt ) {
            $x = 'alt=""';
            return strpos($block_content, $x) === false ? $block_content :
                    str_replace($x, sprintf('alt="'.$alt.'"', $page_title, ++$n), $block_content);
        } );

        add_filter( 'wp_get_attachment_image_attributes', function ( $attr ) use ( &$page_title, &$n, $alt ) {
            if (!isset($attr['alt']) || $attr['alt'] == '') {
                $attr['alt'] = sprintf($alt, $page_title, ++$n);
            }
            return $attr;
        } );
    }

    private function custom_post_type_breadcrumb( $post_type, $text, $url ) {

        add_filter( 'wpseo_breadcrumb_links', function ( $links ) use ( $post_type, $text, $url ) {

            if ( get_post_type() === $post_type ) {
                $breadcrumb[] = array(
                    'url' => $url,
                    'text' => $text,
                );

                array_splice( $links, 1, -2, $breadcrumb );
            }

            return $links;
        } );
    }

    private function projects_breadcrumbs() {

		$page_id = (int) get_option( 'wp_page_for_projects' );

        if ( ! $page_id || get_post_status( $page_id ) !== 'publish' )
            return;

        $this->custom_post_type_breadcrumb( 'project', get_the_title( $page_id ), get_permalink($page_id) );
    }

    private function noindex_override() {

        add_filter('wpseo_robots', function ($robots_string) {

            if (isset($_GET['query-0-page'])) {
                $robots_string = "noindex";
            }

            return $robots_string;
        });
    }

    private function fix_permalink_redirect() {

        add_action('init', function(){

            $blog_id = get_option('page_for_posts');

            if (!$blog_id) return;

            if ('/%postname%/' !== get_option('permalink_structure')) return;
            
            $blog_slug = get_post($blog_id)->post_name;

            $pattern = sprintf('/^\/%s\/\d{4}\/\d{2}\/\d{2}\/(.*)$/', $blog_slug);
            if (preg_match($pattern, $_SERVER['REQUEST_URI'], $matches)) {
                wp_redirect(site_url($matches[1]));
                exit;
            }

            $pattern = sprintf('/^\/%s\/project\/(.*)$/', $blog_slug);
            if (preg_match($pattern, $_SERVER['REQUEST_URI'], $matches)) {
                wp_redirect(site_url($matches[1]));
                exit;
            }
        });
    }

    private function draft_breadcrumb_single_link() {

        add_filter( 'wpseo_breadcrumb_links', function ( $links ) {

            global $wpdb;

            $ids = join(',', array_filter(array_map(fn ($link) => isset($link['id']) ? $link['id'] : 0, $links)));
            $statuses = $wpdb->get_results("SELECT ID, post_status FROM $wpdb->posts WHERE ID IN ($ids)", OBJECT_K);

            foreach ($links as &$link) {
                if (empty($link['id'])) continue;
                if (!isset($statuses[$link['id']])) continue;
                if (!isset($statuses[$link['id']]->post_status)) continue;
                if ($statuses[$link['id']]->post_status === 'publish') continue;
                $link['url'] = '#';
            }

            return $links;
        }, 99 );
    }
}
