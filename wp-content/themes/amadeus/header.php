<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package Amadeus
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site">
	<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'amadeus' ); ?></a>

	<header id="masthead" class="site-header clearfix" role="banner">

		<?php if ( has_nav_menu( 'social' ) ) : ?>
		<nav class="social-navigation clearfix">
			<div class="container">
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'social',
						'link_before'    => '<span class="screen-reader-text">',
						'link_after'     => '</span>',
						'menu_class'     => 'menu clearfix',
						'fallback_cb'    => false,
					)
				);
				?>
			</div>
		</nav>
		<?php endif; ?>	

		<?php if ( get_theme_mod( 'menu_position', 'below' ) == 'above' ) : ?>
		<nav id="site-navigation" class="main-navigation menu-above" role="navigation">
			<div class="container">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'menu_id'        => 'primary-menu',
				)
			);
			?>
			</div>
		</nav><!-- #site-navigation -->
		<nav class="mobile-nav"></nav>
		<?php endif; ?>		

		

		<?php if ( get_theme_mod( 'menu_position', 'below' ) == 'below' ) : ?>
		<nav id="site-navigation" class="main-navigation" role="navigation">
			<div class="container">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'menu_id'        => 'primary-menu',
				)
			);
			?>
			</div>
		</nav><!-- #site-navigation -->
		<nav class="mobile-nav"></nav>
		<?php endif; ?>

	</header><!-- #masthead -->

	<?php amadeus_banner(); ?>

	<div id="content" class="site-content container">
