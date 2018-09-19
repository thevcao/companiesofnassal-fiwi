<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other 'pages' on your WordPress site will use a different template.
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Smores
 * @since Smores 2.0
 */
?>

<?php get_template_part('templates/header');?>

  <main>
  <?php get_template_part('partials/banner');?>

  <?php // check if the flexible content field has rows of data
  if( have_rows('section') ):

       // loop through the rows of data
      while ( have_rows('section') ) : the_row();

          if( get_row_layout() == 'card_content' ):

              include( locate_template( 'partials/card-content.php', false, false ) );

          endif;

          if( get_row_layout() == 'content_block' ):

              include( locate_template( 'partials/content-block.php', false, false ) );

          endif;

          if( get_row_layout() == 'history' ):

              include( locate_template( 'partials/history.php', false, false ) );

          endif;

          if( get_row_layout() == 'about_cta' ):

              include( locate_template( 'partials/about-cta.php', false, false ) );

          endif;

      endwhile;

  endif;

  ?>

  </main>



<?php get_template_part('templates/footer'); ?>
