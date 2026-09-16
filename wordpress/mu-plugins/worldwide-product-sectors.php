<?php
/**
 * Plugin Name: Worldwide Supply 28 - Product Sectors
 * Description: Registers the "Product Sectors" custom post type with ACF fields (background image, names, badge, description, link) and exposes them over the REST API for the Next.js frontend.
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) exit;

define('WORLDWIDE_SECTOR_CPT', 'product_sector');
define('WORLDWIDE_SECTOR_SEED', 'worldwide_product_sectors_seeded');

/**
 * 1. The custom post type.
 *
 * `public` and `publicly_queryable` are false because sectors are never browsed
 * on the WordPress side - they are content for the headless frontend. `show_ui`
 * still puts them in wp-admin, and the default `post` capabilities mean only a
 * logged-in editor or administrator can create or change one.
 */
add_action('init', function () {
    register_post_type(WORLDWIDE_SECTOR_CPT, array(
        'labels' => array(
            'name'               => 'Product Sectors',
            'singular_name'      => 'Product Sector',
            'menu_name'          => 'Product Sectors',
            'add_new'            => 'Add Sector',
            'add_new_item'       => 'Add Product Sector',
            'edit_item'          => 'Edit Product Sector',
            'new_item'           => 'New Product Sector',
            'view_item'          => 'View Product Sector',
            'search_items'       => 'Search Product Sectors',
            'not_found'          => 'No product sectors yet',
            'not_found_in_trash' => 'No product sectors in trash',
            'all_items'          => 'All Product Sectors',
        ),
        'public'             => false,
        'publicly_queryable' => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_rest'       => true,
        'menu_position'      => 3,
        'menu_icon'          => 'dashicons-screenoptions',
        'hierarchical'       => false,
        'has_archive'        => false,
        'rewrite'            => false,
        'query_var'          => false,
        'capability_type'    => 'post',
        'map_meta_cap'       => true,
        'supports'           => array('title', 'thumbnail', 'page-attributes'),
    ));
});

/**
 * 2. ACF fields for a sector.
 */
function worldwide_sector_field_group() {
    return array(
        'key'    => 'group_worldwide_product_sector',
        'title'  => 'Product Sector - Card Content',
        'fields' => array(
            array(
                'key'          => 'field_ws_sector_tab_content',
                'label'        => 'Sector Card',
                'name'         => '',
                'type'         => 'tab',
                'instructions' => 'The post title above is the English name shown on the card.',
                'placement'    => 'top',
                'endpoint'     => 0,
            ),
            array(
                'key'          => 'field_ws_sector_name_es',
                'label'        => 'Sector Name (Spanish)',
                'name'         => 'sector_name_es',
                'type'         => 'text',
                'instructions' => 'Shown when a visitor switches the site to Spanish. Leave empty to reuse the English title.',
            ),
            array(
                'key'          => 'field_ws_sector_badge_en',
                'label'        => 'Badge Text (English)',
                'name'         => 'sector_badge_en',
                'type'         => 'text',
                'instructions' => 'Small pill label at the top of the card, for example "Prestige Brands".',
            ),
            array(
                'key'   => 'field_ws_sector_badge_es',
                'label' => 'Badge Text (Spanish)',
                'name'  => 'sector_badge_es',
                'type'  => 'text',
            ),
            array(
                'key'          => 'field_ws_sector_description_en',
                'label'        => 'Description (English)',
                'name'         => 'sector_description_en',
                'type'         => 'textarea',
                'rows'         => 3,
                'instructions' => 'Used on the categories page and for SEO context.',
            ),
            array(
                'key'   => 'field_ws_sector_description_es',
                'label' => 'Description (Spanish)',
                'name'  => 'sector_description_es',
                'type'  => 'textarea',
                'rows'  => 3,
            ),
            array(
                'key'           => 'field_ws_sector_background_image',
                'label'         => 'Background Image',
                'name'          => 'sector_background_image',
                'type'          => 'image',
                'instructions'  => 'Full-bleed image behind the card. Landscape or square, at least 800px wide.',
                'return_format' => 'array',
                'preview_size'  => 'medium',
                'library'       => 'all',
            ),
            array(
                'key'           => 'field_ws_sector_link',
                'label'         => 'Card Link',
                'name'          => 'sector_link',
                'type'          => 'text',
                'instructions'  => 'Where the card goes when clicked. A site path such as /contact, or a full https:// URL.',
                'default_value' => '/contact',
                'placeholder'   => '/contact',
            ),
            array(
                'key'           => 'field_ws_sector_show_on_homepage',
                'label'         => 'Show on Website',
                'name'          => 'sector_show_on_homepage',
                'type'          => 'true_false',
                'instructions'  => 'Turn off to keep the sector in WordPress without showing its card on the site.',
                'default_value' => 1,
                'ui'            => 1,
            ),
            array(
                'key'       => 'field_ws_sector_message_order',
                'label'     => '',
                'name'      => '',
                'type'      => 'message',
                'message'   => 'To reorder the cards, set <strong>Order</strong> in the "Page Attributes" box - a lower number shows first.',
                'new_lines' => 'wpautop',
                'esc_html'  => 0,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => WORLDWIDE_SECTOR_CPT,
                ),
            ),
        ),
        'menu_order'            => 0,
        'position'              => 'normal',
        'style'                 => 'default',
        'label_placement'       => 'top',
        'instruction_placement' => 'label',
        'hide_on_screen'        => array('the_content', 'excerpt', 'discussion', 'comments', 'slug', 'author', 'format', 'categories', 'tags', 'send-trackbacks'),
        'active'                => true,
        'description'           => 'Background image, names, badge, description and link for one Product Sector card.',
        'show_in_rest'          => 1,
    );
}

add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) return;

    // Registered from code, not imported into the database: this file is the
    // single source of truth for the field definitions, so they cannot drift
    // and cannot be lost with a database restore. Editors still fill the fields
    // in normally on the Product Sector edit screen.
    acf_add_local_field_group(worldwide_sector_field_group());
});

/**
 * 3. Seed the sectors that used to be hard-coded in the frontend, once.
 *
 * Guarded by an option so later edits made in wp-admin are never overwritten.
 */
add_action('init', function () {
    if (get_option(WORLDWIDE_SECTOR_SEED)) return;
    if (!function_exists('update_field')) return;

    $seeds = array(
        array(
            'title'   => 'Perfumes & Fragrances',
            'name_es' => 'Perfumes y Fragancias',
            'badge_en' => 'Prestige Brands',
            'badge_es' => 'Marcas Prestige',
            'desc_en' => 'High-end luxury perfumes from premier global fashion houses and prestige beauty groups.',
            'desc_es' => 'Perfumes de lujo de alta gama de las principales casas de moda y grupos de belleza prestige.',
            'image'   => 71,
        ),
        array(
            'title'   => 'Niche Fragrances',
            'name_es' => 'Fragancias de Nicho',
            'badge_en' => 'Artisanal & Niche',
            'badge_es' => 'Artesanal y Nicho',
            'desc_en' => 'Exclusive, artisanal perfumery collections crafted for discerning collectors and specialized boutiques.',
            'desc_es' => 'Colecciones de perfumeria artesanal y exclusiva disenadas para coleccionistas exigentes y boutiques especializadas.',
            'image'   => 59,
        ),
        array(
            'title'   => 'Luxury Cosmetics & Skincare',
            'name_es' => 'Cosmetica de Lujo y Cuidado de la Piel',
            'badge_en' => 'Skincare & Beauty',
            'badge_es' => 'Belleza y Cuidado',
            'desc_en' => 'Premium skincare formulations, luxury color cosmetics, and advanced beauty treatments.',
            'desc_es' => 'Formulaciones avanzadas para el cuidado de la piel, cosmetica de color de lujo y tratamientos de belleza.',
            'image'   => 54,
        ),
        array(
            'title'   => 'Wines, Spirits & Champagne',
            'name_es' => 'Vinos, Licores y Champagne',
            'badge_en' => 'Fine Beverages',
            'badge_es' => 'Bebidas Finas',
            'desc_en' => 'Curated selections of fine champagne, prestige wines, and rare spirits for duty-free and luxury retail.',
            'desc_es' => 'Selecciones de fino champagne, vinos prestige y licores exclusivos para duty-free y minoristas de lujo.',
            'image'   => 65,
        ),
        array(
            'title'   => 'Travel Sets & Exclusive Kits',
            'name_es' => 'Sets de Viaje y Kits Exclusivos',
            'badge_en' => 'Travel Retail Exclusives',
            'badge_es' => 'Exclusivos Travel Retail',
            'desc_en' => 'Tailored travel retail exclusives, fragrance miniatures, and multi-piece gift box sets.',
            'desc_es' => 'Exclusivos de travel retail a medida, miniaturas de fragancias y juegos de regalos en estuches de lujo.',
            'image'   => 63,
        ),
        array(
            'title'   => 'Fashion & Textiles',
            'name_es' => 'Moda y Textiles',
            'badge_en' => 'Lifestyle & Apparel',
            'badge_es' => 'Estilo de Vida y Moda',
            'desc_en' => 'Fine silk scarves, luxury leather goods accessories, and premium textile creations.',
            'desc_es' => 'Panuelos de seda fina, accesorios de marroquineria de lujo y creaciones textiles de primera calidad.',
            'image'   => 56,
        ),
        array(
            'title'   => 'Fine Jewelry & Timepieces',
            'name_es' => 'Joyeria Fina y Relojeria',
            'badge_en' => 'Luxury Accessories',
            'badge_es' => 'Accesorios de Lujo',
            'desc_en' => 'Elegant crafted jewelry pieces, luxury watches, and high-end statement accessories.',
            'desc_es' => 'Piezas de joyeria elegantemente disenadas, relojes de lujo y accesorios de alta gama.',
            'image'   => 57,
        ),
        array(
            'title'   => 'Luxury Accessories',
            'name_es' => 'Accesorios de Lujo',
            'badge_en' => 'Lifestyle Accents',
            'badge_es' => 'Accesorios de Estilo',
            'desc_en' => 'Curated lifestyle accents, designer eyewear accessories, and travel companion items.',
            'desc_es' => 'Detalles para el estilo de vida, accesorios de diseno y articulos de transporte y viaje.',
            'image'   => 53,
        ),
    );

    foreach ($seeds as $index => $seed) {
        $post_id = wp_insert_post(array(
            'post_type'   => WORLDWIDE_SECTOR_CPT,
            'post_title'  => $seed['title'],
            'post_status' => 'publish',
            'menu_order'  => ($index + 1) * 10,
        ));

        if (is_wp_error($post_id) || !$post_id) continue;

        update_field('sector_name_es', $seed['name_es'], $post_id);
        update_field('sector_badge_en', $seed['badge_en'], $post_id);
        update_field('sector_badge_es', $seed['badge_es'], $post_id);
        update_field('sector_description_en', $seed['desc_en'], $post_id);
        update_field('sector_description_es', $seed['desc_es'], $post_id);
        update_field('sector_background_image', $seed['image'], $post_id);
        update_field('sector_link', '/contact', $post_id);
        update_field('sector_show_on_homepage', 1, $post_id);

        set_post_thumbnail($post_id, $seed['image']);
    }

    update_option(WORLDWIDE_SECTOR_SEED, '1');
});

/**
 * Resolve an ACF image value (id, array or URL) to a plain URL.
 */
function worldwide_sector_image_url($value) {
    if (!$value) return null;
    if (is_array($value)) return isset($value['url']) ? $value['url'] : null;
    if (is_numeric($value)) {
        $url = wp_get_attachment_url((int) $value);
        return $url ? $url : null;
    }
    if (is_string($value) && preg_match('#^https?://#', $value)) return $value;
    return null;
}

/**
 * Build the sector list the frontend consumes.
 */
function worldwide_get_product_sectors() {
    $posts = get_posts(array(
        'post_type'      => WORLDWIDE_SECTOR_CPT,
        'post_status'    => 'publish',
        'posts_per_page' => -1,
        'orderby'        => array('menu_order' => 'ASC', 'title' => 'ASC'),
    ));

    $sectors = array();

    foreach ($posts as $post) {
        $fields = function_exists('get_fields') ? get_fields($post->ID) : array();
        $fields = is_array($fields) ? $fields : array();

        if (isset($fields['sector_show_on_homepage']) && !$fields['sector_show_on_homepage']) {
            continue;
        }

        $image = worldwide_sector_image_url(isset($fields['sector_background_image']) ? $fields['sector_background_image'] : null);
        if (!$image) {
            $thumb = get_the_post_thumbnail_url($post->ID, 'full');
            $image = $thumb ? $thumb : null;
        }

        // Decode entities: titles saved without the unfiltered_html capability
        // store "&" as "&amp;", which React would render literally.
        $name_en = html_entity_decode($post->post_title, ENT_QUOTES, 'UTF-8');

        $sectors[] = array(
            'id'   => $post->post_name,
            'name' => array(
                'en' => $name_en,
                'es' => !empty($fields['sector_name_es']) ? $fields['sector_name_es'] : $name_en,
            ),
            'badge' => array(
                'en' => isset($fields['sector_badge_en']) ? (string) $fields['sector_badge_en'] : '',
                'es' => isset($fields['sector_badge_es']) ? (string) $fields['sector_badge_es'] : '',
            ),
            'description' => array(
                'en' => isset($fields['sector_description_en']) ? (string) $fields['sector_description_en'] : '',
                'es' => isset($fields['sector_description_es']) ? (string) $fields['sector_description_es'] : '',
            ),
            'image' => $image,
            'link'  => !empty($fields['sector_link']) ? $fields['sector_link'] : '/contact',
            'order' => (int) $post->menu_order,
        );
    }

    return $sectors;
}

/**
 * 4. REST: a dedicated route, plus the same payload merged into the existing
 * /worldwide/v1/settings response so the frontend keeps a single fetch.
 */
add_action('rest_api_init', function () {
    register_rest_route('worldwide/v1', '/product-sectors', array(
        'methods'             => 'GET',
        'callback'            => function () {
            return rest_ensure_response(worldwide_get_product_sectors());
        },
        'permission_callback' => '__return_true',
    ));
});

add_filter('rest_post_dispatch', function ($result, $server, $request) {
    if ($request->get_route() !== '/worldwide/v1/settings') return $result;
    if (!($result instanceof WP_REST_Response)) return $result;

    $data = $result->get_data();
    if (!is_array($data)) return $result;

    $data['product_sectors'] = worldwide_get_product_sectors();
    $result->set_data($data);

    return $result;
}, 10, 3);
