<?php

// Exit if accessed directly
if (!defined('ABSPATH')) exit;

class MXLTCSHooks
{

    public function addHooks()
    {
        
        // Add Button to Header menu
        add_action( 'secl_group_after_menu', function() { ?>
            <a href="#" class="secl-group-transparent-btn">Request</a>
        <?php } );

    }

}

( new MXLTCSHooks() )->addHooks();