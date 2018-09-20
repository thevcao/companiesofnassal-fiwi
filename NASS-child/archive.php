<?php
/**
 * Template Name: Posts
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * If you'd like to further customize these archive views, you may create a
 * new template file for each specific one. For example, Twenty Fourteen
 * already has tag.php for Tag archives, category.php for Category archives,
 * and author.php for Author archives.
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

    <div class="container news-posts">

      <div class="">
        <div class="row">
          <div class="col offset-lg-1 pl-lg-0">
            <?php get_search_form();?>


          </div>

        </div>



      </div>

      <div class="posts-row">


            <?php if ( have_posts() ) : while (have_posts()) : the_post(); ?>


            <div class="row featured-post mt-5 filterable" data-src="<?php $var = sanitize_title_for_query( get_the_title(get_field('project_type')->ID) ); echo esc_attr( $var);?>">
              <div class="col-lg-11 mx-auto">
                <div class="row align-items-center">
                <div class="col-md-8 pr-md-0">
                  <a href="<?php the_permalink();?>" class=""><div class="card">

                        <?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' ); $url = $thumb['0']; ?>
                         <?php if( has_post_thumbnail()): echo '<img src="' . $url . '" alt="' . get_the_title() . '">';
                                else:
                                echo '<img src="' . get_template_directory_uri() . '/dist/img/default-blog-' . sanitize_title_for_query(get_bloginfo( 'name')) . '.jpg">';
                                  endif;?>

                    </div></a>
                </div>
                <div class="col-md-4 pl-md-5 col-11 mx-auto mt-md-0 mt-2 mb-md-0 mb-3">

                          <h5><a href="<?php the_permalink();?>" class=""><?php echo mb_strimwidth(get_the_title(), 0, 80, '...');?></a></h5>
                          <h6><a href="<?php echo get_site_url();?>/category/<?php
                            $category = get_the_category();
                            echo $category[0]->slug;
                            ?>">Posted in: <?php
                            $category = get_the_category();
                            echo $category[0]->cat_name;
                            ?></a></h6>
                          <?php echo '<p>' . mb_strimwidth(get_the_excerpt(), 0, 70, '...') .'</p>';?>

                          <a href="<?php the_permalink();?>" class="btn">Read More</a>


                </div>


                </div>
              </div>
            </div>

            <?php endwhile; endif;?>
      </div>


    </div>
      <section class="pagination mb-5">
              <div class="container">

                  <div class="row">
                      <div class="col-auto mr-auto">
                          <div class="nav-next alignright"><?php previous_posts_link( '<i class="fa fa-angle-left"></i> Newer posts' ); ?></div>

                      </div>
                      <div class="col-auto ml-auto">

                      <div class="nav-previous alignleft"><?php next_posts_link( 'Older posts <i class="fa fa-angle-right"></i>' ); ?></div>

                      </div>

                  </div>

              </div>


          </section>
  </main>



<?php get_template_part('templates/footer'); ?>
