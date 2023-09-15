<?php
/**
 * Pagination trait
 *
 * @package SECLGroup
 */

namespace SECLGroup;

trait Pagination {

    private static $svg = array(
        'prev_text' => '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18"><path d="M22 9L2 9M2 9L10 17M2 9L10 0.999999" /></svg>',
        'next_text' => '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18"><path d="M0 9H20M20 9L12 1M20 9L12 17" /></svg>'
    );

    public function setup_pagination() {
        add_filter( 'the_posts_pagination', array($this, 'the_posts_pagination') );
        add_filter( 'paginate_links_output', array($this, 'paginate_links_output') );
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
}
