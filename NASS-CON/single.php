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

  <?php get_template_part('templates/header');
  $headshot = get_field('headshot');?>

    <main>

      <?php get_template_part('partials/banner');?>

        <section class="post-content">

          <div class="container">
            <div class="row">
              <div class="col-sm-11 ml-auto">
                <div class="row align-items-start">
              <div class="col-md-auto offset-md-1">
              <ul class="socials shares">
                <li>Share:</li>
                <li><a href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-facebook"></i></a></li>
                <li><a href="https://twitter.com/home?status=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-twitter"></i></a></li>
                <li><a href="https://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-linkedin"></i></a></li>
                <li><a href="https://plus.google.com/share?url=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-google-plus"></i></a></li>
                <li>
                  <button class="toggle share-toggle tooltipped tooltipped-no-delay tooltipped-w" aria-label="Click to Copy URL" data-clipboard-text="<?php the_permalink();?>">
                  <?php include get_template_directory() . '/dist/img/share.svg';?>
                  </button>
                </li>


              </ul>


              </div>
              <div class="col-md-8 ml-md-3 mr-auto">

                <?php if ( have_posts() ) : while (have_posts()) : the_post(); the_content(); ?>
                <?php if(get_field('pr_snippet')): echo'<h6>About the Nassal Company</h6>'; the_field('pr_snippet'); endif;?>
                <?php if(get_field('media_contact')): echo '<h6>Media Contact</h6>'; the_field('media_contact'); endif; endwhile; endif;?>

              </div>

                </div>

              </div>



            </div>


          </div>
        </section>



    </main>

<?php get_template_part('templates/footer'); ?>
