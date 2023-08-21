<?php
/*
Plugin Name: my json library
Description: A personal plugin to manage json file on github.
Version: 1.0
Author: Marisabel Munoz


this is the main code for the plugin. The form is and scripts are on the html file being called.

*/

wp_enqueue_script('my-json-library', plugin_dir_url(__FILE__) . 'my-json-library.js', array('jquery'), null, true);
wp_enqueue_style('my-json-library-style', plugin_dir_url(__FILE__) . 'my-json-library.css');

function my_plugin_menu() {
    add_menu_page(
        'Library',
        'my library',
        'manage_options',
        'github-commit-plugin',
        'github_commit_plugin_page'
		
    );
}

function github_commit_plugin_page() {
    echo '<div class="wrap">';
    echo '<h1>My Library Manager</h1>';

// THE HTML FILE HERE!

    $html_content = file_get_contents(plugin_dir_path(__FILE__) . 'books.html');
    echo $html_content;

    echo '</div>';
}

add_action('admin_menu', 'my_plugin_menu');
