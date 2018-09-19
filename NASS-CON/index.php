<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme and one
 * of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query,
 * e.g., it puts together the home page when no home.php file exists.
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Smores
 * @since Smores 2.0
 */
?>

<?php get_template_part('templates/header'); ?>

  <main>
  <?php get_template_part('partials/banner');?>

    <div class="container">
    <div class="row mb-5 mt-5">
      <div class="col-lg-11 offset-lg-1 pl-sm-0 editor">
                    <?php
                    $s=get_search_query();
                    $args = array(
                                    's' =>$s
                                );
                        // The Query
                    $the_query = new WP_Query( $args );?>

                    <?php echo get_search_form();?>

                    <?php if ( $the_query->have_posts() ) {
                            _e("<ol class='search-results'>");
                            $i = 1; while ( $the_query->have_posts() ) {
                               $the_query->the_post();
                                     ?>
                                        <li><h6><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h6>
                                        <ul>
                                          <li><p><a href="<?php the_permalink(); ?>"><?php the_permalink(); ?></a></p></li>
                                        <li><p><?php echo get_the_excerpt();?></p></li>

                                        </ul>
                                        </li>
                                     <?php
                            }

                        echo '</ol>';
                        } else {
                    ?>

                        <h2 class="mt-5">Nothing Found</h2>
                        <div class="alert alert-info">
                          <p>Sorry, but nothing matched your search criteria. Please try again with some different keywords.</p>
                        </div>
                    <?php } ?>
      </div>
    </div>


    </div>
</main>

<?php get_template_part('templates/footer'); ?>
