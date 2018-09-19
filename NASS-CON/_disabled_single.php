<?php
/**
 * The Template for displaying all single posts
 *
 * @package Smores
 * @since Smores 2.0
 */
?>
<?php get_template_part('templates/header'); ?>

        <?php if ( have_posts() ) : while (have_posts()) : the_post(); ?>

        <?php echo get_the_title();?>
        <?php the_content();?>

        <?php endwhile; endif ?>


<?php get_template_part('templates/footer'); ?>
