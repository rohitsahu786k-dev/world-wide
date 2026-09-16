# WordPress backend

The site is a static Next.js export. Everything editable lives in WordPress and
reaches the frontend over the `worldwide/v1` REST namespace.

## Files

These are the source of truth. They are deployed to `wp-content/mu-plugins/`
on the WordPress host (must-use plugins: always active, cannot be deactivated
by accident).

| File | What it manages |
| --- | --- |
| `mu-plugins/worldwide-product-sectors.php` | The `product_sector` post type + its ACF fields, and `GET /worldwide/v1/product-sectors` |
| `mu-plugins/worldwide-about-content.php` | About Us copy fields on the Site Settings page, and `GET /worldwide/v1/about` |

`worldwide-supply-settings.php` (company, contact, logos, hero banners,
founders, images) already lived on the host and is not duplicated here.

Both files register their fields with `acf_add_local_field_group()`, so the
field *definitions* come from code and cannot be lost with a database restore.
Only the *content* lives in the database. The matching import-ready exports are
in `../acf-json/`, for reference or for rebuilding the groups on a fresh site.

## Where an editor changes things

Log in to `/wp-admin` first — nothing is editable without it.

- **Product sector cards** — *Product Sectors* in the admin menu. Each sector is
  one entry: title (English name), Spanish name, badge, description, background
  image, link, and a "Show on Website" switch. Card order is the **Order** field
  in the Page Attributes box (lower number first).
- **About Us copy** — *Site Settings* → the `About - ...` tabs: overview, story,
  mission, vision, and five core values.
- **Company, contact, logos, hero banners, founders** — *Site Settings*, the
  original tabs.
- **Blog articles** — *Posts*, the normal WordPress editor.

## How changes reach the site

`SiteSettingsContext` fetches `/worldwide/v1/settings` in the browser on every
page load, so edits show up without a redeploy. The same endpoint is also read
at build time, so the exported HTML carries the current content for crawlers.

The host runs LiteSpeed in front of WordPress and caches REST responses, so the
frontend appends a cache-busting parameter. When checking an endpoint by hand,
add one too (`?n=1`), otherwise a stale copy can be served.

## Seeding

Each plugin seeds its content once, guarded by an option
(`worldwide_product_sectors_seeded`, `worldwide_about_content_seeded`), so
re-deploying the file never overwrites what an editor has changed.

## Deploying a change to these files

Upload the changed file to `wp-content/mu-plugins/` on the host, then verify:

```
curl -s "https://<wp-host>/wp-json/worldwide/v1/product-sectors?n=$RANDOM"
curl -s "https://<wp-host>/wp-json/worldwide/v1/about?n=$RANDOM"
```
