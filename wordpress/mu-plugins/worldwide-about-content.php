<?php
/**
 * Plugin Name: Worldwide Supply 28 - About Page Content
 * Description: Adds the editable About Us copy (overview, story, mission, vision, core values) to the Site Settings page via ACF and merges it into the /worldwide/v1/settings REST payload.
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) exit;

// Same page the "Site Settings" admin menu opens - see worldwide-supply-settings.php.
define('WORLDWIDE_ABOUT_PAGE_ID', 122);
define('WORLDWIDE_ABOUT_SEED', 'worldwide_about_content_seeded');

/**
 * Bilingual text pair - every visible string exists in English and Spanish
 * because the frontend language switcher reads both.
 */
function worldwide_about_text_pair($key, $name, $label, $type = 'text', $rows = 3) {
    $fields = array();

    foreach (array('en' => 'English', 'es' => 'Spanish') as $lang => $lang_label) {
        $field = array(
            'key'   => 'field_wa_' . $key . '_' . $lang,
            'label' => $label . ' (' . $lang_label . ')',
            'name'  => $name . '_' . $lang,
            'type'  => $type,
        );
        if ($type === 'textarea') {
            $field['rows'] = $rows;
        }
        $fields[] = $field;
    }

    return $fields;
}

function worldwide_about_field_group() {
    $fields = array();

    $fields[] = array(
        'key'          => 'field_wa_tab_overview',
        'label'        => 'About - Overview',
        'name'         => '',
        'type'         => 'tab',
        'instructions' => 'The opening paragraph on the About Us page.',
        'placement'    => 'top',
        'endpoint'     => 0,
    );
    $fields = array_merge($fields, worldwide_about_text_pair('overview', 'about_overview', 'Company Overview', 'textarea', 6));

    $fields[] = array(
        'key'          => 'field_wa_tab_story',
        'label'        => 'About - Our Story',
        'name'         => '',
        'type'         => 'tab',
        'instructions' => 'The company history section.',
        'placement'    => 'top',
        'endpoint'     => 0,
    );
    $fields = array_merge($fields, worldwide_about_text_pair('story_title', 'about_story_title', 'Story Heading', 'text'));
    $fields = array_merge($fields, worldwide_about_text_pair('story_intro', 'about_story_intro', 'Story Intro Paragraph', 'textarea', 3));
    $fields = array_merge($fields, worldwide_about_text_pair('story_together', 'about_story_together', 'How The Partnership Began', 'textarea', 6));
    $fields = array_merge($fields, worldwide_about_text_pair('story_family', 'about_story_family', 'Family Spirit Paragraph', 'textarea', 4));

    $fields[] = array(
        'key'          => 'field_wa_tab_mission',
        'label'        => 'About - Mission & Vision',
        'name'         => '',
        'type'         => 'tab',
        'instructions' => 'The two cards under the founders.',
        'placement'    => 'top',
        'endpoint'     => 0,
    );
    $fields = array_merge($fields, worldwide_about_text_pair('mission_title', 'about_mission_title', 'Mission Heading', 'text'));
    $fields = array_merge($fields, worldwide_about_text_pair('mission_desc', 'about_mission_desc', 'Mission Text', 'textarea', 5));
    $fields = array_merge($fields, worldwide_about_text_pair('vision_title', 'about_vision_title', 'Vision Heading', 'text'));
    $fields = array_merge($fields, worldwide_about_text_pair('vision_desc', 'about_vision_desc', 'Vision Text', 'textarea', 5));

    $fields[] = array(
        'key'          => 'field_wa_tab_values',
        'label'        => 'About - Core Values',
        'name'         => '',
        'type'         => 'tab',
        'instructions' => 'Up to five core values. Leave a heading empty to hide that value.',
        'placement'    => 'top',
        'endpoint'     => 0,
    );
    for ($i = 1; $i <= 5; $i++) {
        $fields[] = array(
            'key'   => 'field_wa_value_' . $i . '_separator',
            'label' => 'Core Value ' . $i,
            'name'  => '',
            'type'  => 'separator',
        );
        $fields = array_merge($fields, worldwide_about_text_pair('value_' . $i . '_title', 'about_value_' . $i . '_title', 'Value ' . $i . ' Heading', 'text'));
        $fields = array_merge($fields, worldwide_about_text_pair('value_' . $i . '_desc', 'about_value_' . $i . '_desc', 'Value ' . $i . ' Text', 'textarea', 2));
    }

    return array(
        'key'      => 'group_worldwide_about_content',
        'title'    => 'Worldwide Supply 28 - About Page Content',
        'fields'   => $fields,
        'location' => array(
            array(
                array('param' => 'page', 'operator' => '==', 'value' => (string) WORLDWIDE_ABOUT_PAGE_ID),
            ),
            array(
                array('param' => 'page_slug', 'operator' => '==', 'value' => 'site-settings'),
            ),
        ),
        'menu_order'            => 1,
        'position'              => 'normal',
        'style'                 => 'default',
        'label_placement'       => 'top',
        'instruction_placement' => 'label',
        'active'                => true,
        'description'           => 'Editable About Us copy: overview, company story, mission, vision and core values.',
        'show_in_rest'          => 1,
    );
}

add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) return;

    // Registered from code, not imported into the database - see the note in
    // worldwide-product-sectors.php.
    acf_add_local_field_group(worldwide_about_field_group());
});

/**
 * Seed the copy that used to live in the frontend, once. Guarded by an option
 * so later edits in wp-admin are never overwritten.
 */
function worldwide_about_defaults() {
    return array(
        'about_overview' => array(
            'en' => 'Worldwide Supply 28 SL, based in Spain, has over 15 years of experience in wholesale, luxury retail, and travel retail. We work with leading international retailers, duty frees, and distributors worldwide, supplying high-end perfumery, luxury cosmetics, skincare, and niche fragrances. We represent products from major groups such as LVMH, PUIG, L\'Oreal Luxe, COTY, P&G, as well as selected niche perfume houses.',
            'es' => 'Worldwide Supply 28 SL, con sede en Espana, cuenta con mas de 15 anos de experiencia en venta al por mayor, venta al por menor de lujo y travel retail. Trabajamos con minoristas internacionales lideres, tiendas libres de impuestos (duty free) y distribuidores en todo el mundo, suministrando perfumeria de alta gama, cosmetica de lujo, cuidado de la piel y fragancias de nicho.',
        ),
        'about_story_title' => array(
            'en' => 'Company History - Our Story',
            'es' => 'Historia de la Empresa - Nuestra Historia',
        ),
        'about_story_intro' => array(
            'en' => 'Worldwide Supply 28 SL was born from the shared vision of two partners whose paths in the luxury and wholesale industry were destined to meet.',
            'es' => 'Worldwide Supply 28 SL nacio de la vision compartida de dos socios cuyos caminos en la industria del lujo y del comercio al por mayor estaban destinados a encontrarse.',
        ),
        'about_story_together' => array(
            'en' => 'When their paths crossed, they quickly recognized that their backgrounds were not just compatible, but complementary: one side brought deep-rooted trade and logistics experience, the other brought sector-specific expertise and a strong network within the perfumery and cosmetics world. United by a shared passion for the industry and a mutual belief in doing business the right way with reliability, transparency, and long-term relationships, they founded Worldwide Supply 28 SL.',
            'es' => 'Cuando sus caminos se cruzaron, reconocieron rapidamente que sus trayectorias no solo eran compatibles, sino complementarias: una parte aportaba una profunda experiencia en comercio y logistica, y la otra aportaba conocimientos especificos del sector y una solida red en el mundo de la perfumeria y cosmetica. Unidos por una pasion compartida y la conviccion mutua de hacer negocios de forma correcta con fiabilidad, transparencia y relaciones a largo plazo, fundaron Worldwide Supply 28 SL.',
        ),
        'about_story_family' => array(
            'en' => 'More than business partners, Sakina and Siddharth work together like family, sharing the same drive, ambition, and hunger to keep growing. That spirit of togetherness and continuous growth is what defines Worldwide Supply 28 SL today.',
            'es' => 'Mas que socios comerciales, Sakina y Siddharth trabajan juntos como una familia, compartiendo el mismo impulso, ambicion y deseo de seguir creciendo. Ese espiritu de union y crecimiento continuo es lo que define a Worldwide Supply 28 SL hoy en dia.',
        ),
        'about_mission_title' => array('en' => 'Our Mission', 'es' => 'Nuestra Mision'),
        'about_mission_desc'  => array(
            'en' => 'To connect global brands with trusted retail, duty-free, and distribution partners worldwide, delivering premium perfumery, cosmetics, and lifestyle products with reliability, flexibility, and consistency at every stage of the supply chain.',
            'es' => 'Conectar marcas globales con socios minoristas, duty-free y distribuidores de confianza en todo el mundo, entregando productos de perfumeria, cosmetica y estilo de vida de calidad superior con fiabilidad, flexibilidad y consistencia en cada etapa de la cadena de suministro.',
        ),
        'about_vision_title' => array('en' => 'Our Vision', 'es' => 'Nuestra Vision'),
        'about_vision_desc'  => array(
            'en' => 'To become a leading international gateway for brands seeking to enter new markets, and for retailers and distributors seeking a dependable long-term sourcing partner in the luxury and premium goods sector.',
            'es' => 'Convertirnos en un portal internacional lider para marcas que buscan ingresar a nuevos mercados, y para minoristas y distribuidores que buscan un socio de suministro a largo plazo fiable en el sector de productos de lujo y calidad superior.',
        ),
        'about_value_1_title' => array('en' => 'Reliability', 'es' => 'Fiabilidad'),
        'about_value_1_desc'  => array('en' => 'Consistent, dependable delivery for every client, every time.', 'es' => 'Entregas constantes y fiables para cada cliente, siempre.'),
        'about_value_2_title' => array('en' => 'Transparency', 'es' => 'Transparencia'),
        'about_value_2_desc'  => array('en' => 'Honest, long-term relationships with partners and clients.', 'es' => 'Relaciones honestas y duraderas con socios y clientes.'),
        'about_value_3_title' => array('en' => 'Flexibility', 'es' => 'Flexibilidad'),
        'about_value_3_desc'  => array('en' => 'Adapting to the needs of each market and client profile.', 'es' => 'Adaptacion a las necesidades de cada mercado y perfil de cliente.'),
        'about_value_4_title' => array('en' => 'Growth Mindset', 'es' => 'Mentalidad de Crecimiento'),
        'about_value_4_desc'  => array('en' => 'Continuous drive to expand, improve, and innovate.', 'es' => 'Impulso continuo para expandirse, mejorar e innovar.'),
        'about_value_5_title' => array('en' => 'Family Spirit', 'es' => 'Espiritu Familiar'),
        'about_value_5_desc'  => array('en' => 'A close-knit team culture built on trust and shared ambition.', 'es' => 'Una cultura de equipo unida basada en la confianza y la ambicion compartida.'),
    );
}

add_action('init', function () {
    if (get_option(WORLDWIDE_ABOUT_SEED)) return;
    if (!function_exists('update_field')) return;

    foreach (worldwide_about_defaults() as $name => $pair) {
        update_field($name . '_en', $pair['en'], WORLDWIDE_ABOUT_PAGE_ID);
        update_field($name . '_es', $pair['es'], WORLDWIDE_ABOUT_PAGE_ID);
    }

    update_option(WORLDWIDE_ABOUT_SEED, '1');
});

/**
 * Build the about payload the frontend consumes.
 */
function worldwide_get_about_content() {
    $fields = function_exists('get_fields') ? get_fields(WORLDWIDE_ABOUT_PAGE_ID) : array();
    $fields = is_array($fields) ? $fields : array();
    $defaults = worldwide_about_defaults();

    $pair = function ($name) use ($fields, $defaults) {
        $fallback = isset($defaults[$name]) ? $defaults[$name] : array('en' => '', 'es' => '');
        $en = !empty($fields[$name . '_en']) ? $fields[$name . '_en'] : $fallback['en'];
        $es = !empty($fields[$name . '_es']) ? $fields[$name . '_es'] : $fallback['es'];
        return array('en' => $en, 'es' => $es);
    };

    $values = array();
    for ($i = 1; $i <= 5; $i++) {
        $title = $pair('about_value_' . $i . '_title');
        if (empty($title['en']) && empty($title['es'])) continue;
        $values[] = array(
            'title' => $title,
            'desc'  => $pair('about_value_' . $i . '_desc'),
        );
    }

    return array(
        'overview' => $pair('about_overview'),
        'story'    => array(
            'title'    => $pair('about_story_title'),
            'intro'    => $pair('about_story_intro'),
            'together' => $pair('about_story_together'),
            'family'   => $pair('about_story_family'),
        ),
        'mission' => array(
            'title' => $pair('about_mission_title'),
            'desc'  => $pair('about_mission_desc'),
        ),
        'vision' => array(
            'title' => $pair('about_vision_title'),
            'desc'  => $pair('about_vision_desc'),
        ),
        'core_values' => $values,
    );
}

add_action('rest_api_init', function () {
    register_rest_route('worldwide/v1', '/about', array(
        'methods'             => 'GET',
        'callback'            => function () {
            return rest_ensure_response(worldwide_get_about_content());
        },
        'permission_callback' => '__return_true',
    ));
});

add_filter('rest_post_dispatch', function ($result, $server, $request) {
    if ($request->get_route() !== '/worldwide/v1/settings') return $result;
    if (!($result instanceof WP_REST_Response)) return $result;

    $data = $result->get_data();
    if (!is_array($data)) return $result;

    $data['about_content'] = worldwide_get_about_content();
    $result->set_data($data);

    return $result;
}, 10, 3);
