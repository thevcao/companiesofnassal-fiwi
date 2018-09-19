<?php
/**
 * The template for displaying Category pages
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Smores
 * @since Smores 2.0
 */
?>

<?php get_template_part('templates/header'); ?>


        <?php if ( have_posts() ) : while (have_posts()) : the_post(); ?>

        <?php echo get_the_title();?>
        <?php the_date();?>
        <?php the_excerpt();?>
        <?php the_permalink();?>

        <?php endwhile; endif ?>


<div class="nav-next alignright"><?php previous_posts_link( 'Newer posts' ); ?></div>
<div class="nav-previous alignleft"><?php next_posts_link( 'Older posts' ); ?></div>


<?php get_template_part('templates/footer'); ?>
