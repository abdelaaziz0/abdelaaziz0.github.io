# Add labels for the site's custom Chirpy tabs so the theme's page title
# and breadcrumb lookups have a value in the active locale.
Jekyll::Hooks.register :site, :post_read do |site|
  locale = site.data.dig('locales', site.config['lang'])
  next unless locale

  locale['tabs'] ||= {}
  {
    'research' => 'Research',
    'tools' => 'Tools',
    'writeups' => 'Writeups'
  }.each do |key, label|
    locale['tabs'][key] ||= label
  end
end
