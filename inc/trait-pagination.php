<?php
/**
 * Pagination trait
 *
 * @package SECLGroup
 */

namespace SECLGroup;

if ( ! defined( 'ABSPATH' ) ) {
    http_response_code(403);
	exit; // Exit if accessed directly.
}

trait Pagination {

    private $pages = 0;

    private static $svg = array(
        'prev_text' => '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18"><path d="M22 9L2 9M2 9L10 17M2 9L10 0.999999" /></svg>',
        'next_text' => '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18"><path d="M0 9H20M20 9L12 1M20 9L12 17" /></svg>'
    );

    public function setup_pagination() {
        add_filter( 'the_posts_pagination', array($this, 'the_posts_pagination') );
        add_filter( 'paginate_links_output', array($this, 'paginate_links_output') );
        add_filter( 'get_page_of_block', array($this, 'get_page_of_block') );
        add_filter( 'the_blocks_pagination', array($this, 'the_blocks_pagination') );
        add_filter( 'render_block', array($this, 'paginate_block'), 10, 2 );
    }

    public function the_posts_pagination() {
        return self::$svg;
    }

    public function paginate_links_output($r) {

        if (strpos($r, 'class="prev ') === false) {
            $r = sprintf('<span class="prev disabled page-numbers">%s</span>', self::$svg['prev_text']) . $r;
        } elseif (strpos($r, 'class="next ') === false) {
            $r .= sprintf('<span class="next disabled page-numbers">%s</span>', self::$svg['next_text']);
        }

        return $r;
    }

    public function paginate_block($block_content, $block) {

        $prefix = 'Page ';
        $block_name = $this->get_block_name($block);

        if (!is_admin() && !wp_doing_ajax() && strpos($block_name, $prefix) === 0) {
            $n = intval(ltrim($block_name, $prefix));
            if ($n > $this->pages) $this->pages = $n;
            $paged = get_query_var('paged');
            if ($n != ($paged == 0 ? 1 : $paged)) $block_content = '';
        }

        return $block_content;
    }

    public function the_blocks_pagination() {

        global $wp_query;

        if ($this->pages > 1) {
            $wp_query->max_num_pages = $this->pages;
        }

        return $this->the_posts_pagination();
    }

    private function get_block_name($block) {

        $name = '';

        if (isset($block['attrs'])
            && isset($block['attrs']['metadata'])
            && isset($block['attrs']['metadata']['name']))
                $name = $block['attrs']['metadata']['name'];

        return $name;
    }
}
