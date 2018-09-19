<?php $maintemplate = get_template_directory_uri();

$type = get_sub_field('post_type'); ?>



                <section class="case-studies-loop">

                  <div class="container">
                    <div class="row">
                      <div class="col-md-8 mr-auto">
                        <div class="row align-items-end">
                        <div class="col-auto">
                          <h3 class="mb-0"><?php the_sub_field('title');?></h3>
                        </div>
                        <div class="col-auto">
                          <?php if($type == 'portfolio'):

                          echo '<a href="/projects">View All</a>';

                          else:
                          echo '<a href="/category/insights">View All</a>';
                          endif;

                          ?>

                        </div>


                        </div>
                      </div>
                    </div>
                    <?php


                              if($type != 'portfolio'):


//                              $order = 'meta_key';
//
//                              $args = array(
//
//                                  'posts_per_page' => 1,
//                                  'orderby' => $order,
//                                  'order'   => 'DESC',
//                                  'post_type' => $type,
//                                  'meta_query' => array(
//                                      'relation' => 'AND',
//                                      array(
//                                      array(
//                                          'key'     => 'case_study',
//                                          'value'   => 'yes',
//                                          'compare' => 'LIKE',
//                                      ),
////                                      array(
////                                          'key'     => 'featured_post',
////                                          'value'   => 'yes',
////                                          'compare' => 'LIKE',
////                                      ),
//                                    )
//                                  ),
//                                  'meta_key'       => 'project_completion',
//                                  'orderby'        => 'meta_value_num',
//                                  'order'   => 'DESC',
//                                );

//                              else:
                                $id = get_sub_field('category');
                                $args = array(
                                  'posts_per_page' => 1,
                                  'orderby' => 'date',
                                  'order'   => 'DESC',
                                  'post_type' => 'post',
                                  'cat' => $id,
                                  'meta_query' => array(
                                      array(
                                          'key'     => 'featured_post',
                                          'value'   => 'yes',
                                          'compare' => 'LIKE',
                                      ),
                                  ),
                                );

//                              endif;

                              $loop = new WP_Query( $args );
                              if($loop->have_posts()):?>
                    <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>

                            <div class="row featured-post mt-md-5 mt-3 mb-3">
                              <div class="col-md-12 mr-auto">
                                <div class="row align-items-center">
                                <div class="col-md-8 pr-md-0">
                                  <div class="card">

                                        <?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large' ); $url = $thumb['0']; ?>
                                         <?php if( has_post_thumbnail()): echo '<img src="' . $url . '">'; endif;?>

                                  </div>
                                </div>
                                <div class="col-md-4 pl-md-5 mx-md-0 mt-md-0 col-11 mx-auto mt-5">

                                          <h4><?php echo get_the_title();?></h4>

                                            <?php if($type == 'portfolio'):?>
                                              <p><?php the_field('excerpt');?></p>
                                            <?php else:
                                                  echo '<p>' . get_the_excerpt() . '</p>';
                                            endif;?>
                                          <a href="<?php the_permalink();?>" class="btn">Read More</a>


                                </div>


                                </div>
                              </div>
                            </div>

                    <?php endwhile; wp_reset_postdata();?>
                    <?php endif; endif;?>


                             <?php




                              if($type == 'portfolio'):
                              $args = array(

                                  'posts_per_page' => 10,
                                  'orderby' => 'meta_key' ,
                                  'order'   => 'ASC',
                                  'post_type' => 'portfolio',
                                  'meta_query' => array(
                                      'relation' => 'AND',
                                      array(
                                      array(
                                          'key'     => 'case_study',
                                          'value'   => 'yes',
                                          'compare' => 'LIKE',
                                      ),
//                                      array(
//                                          'key'     => 'featured_post',
//                                          'value'     => 'yes',
//                                          'compare' => 'NOT LIKE',
//
//                                      ),
                                    )
                                  ),
                                  'meta_key'       => 'project_completion',
                                  'orderby'        => 'meta_value_num',
                                  'order'   => 'DESC',


                                );

                              else:
                              $id = get_sub_field('category');

                              $args = array(

                                  'posts_per_page' => 10,
                                  'orderby' => 'date',
                                  'order'   => 'DESC',
                                  'post_type' => 'post',
                                  'cat' => $id,
                                  'meta_query' => array(
                                      array(
                                          'key'     => 'featured_post',
                                          'value'     => 'yes',
                                          'compare' => 'NOT LIKE',
                                      ),
                                  ),


                                );


                              endif;

                              $loop = new WP_Query( $args );
                              if ( $loop->have_posts() ) : ?>
                    <div class="row">
                      <div class="loop-container">
                        <div class="swiper-container case-slider">


                          <div class="swiper-wrapper">


                    <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>


                            <div class="swiper-slide">

                              <div class="card">

                                <?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large' ); $url = $thumb['0']; ?>
                                 <?php if( has_post_thumbnail()): echo '<img src="' . $url . '">'; endif;?>

                                  <h4 class="gradient" title="<?php echo get_the_title();?>"><?php echo get_the_title();?></h4>
                                <?php if($type == 'portfolio'):
                                $excerpt = mb_strimwidth(get_field('excerpt'), 0, 70, '...');
                                echo '<p class="mb-0">' . $excerpt. '</p>';
                                else:
                                echo '<p class="mb-0">' . get_the_excerpt() . '</p>';
                                endif;?>
                                  <a href="<?php the_permalink();?>" class="btn">Read More</a>
                              </div>

                            </div>

                    <?php endwhile; wp_reset_postdata();?>


                          </div>

                           <div class="swiper-pagination"></div>
                        </div>

                      </div>
                    </div>

                    <?php endif;?>

                  </div>


                </section>


