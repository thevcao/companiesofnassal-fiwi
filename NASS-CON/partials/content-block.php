<?php $maintemplate = get_template_directory_uri(); ?>



      <section class="content-block <?php echo get_sub_field('brand');?>">
        <div class="container">

          <div class="row mb-4">
              <div class="col-md-5 offset-xl-1 pl-md-0">

                <?php
                if(!get_sub_field('normal_weight')):
                echo '<h2 class="heavy">' . get_sub_field('title') .'</h2>';
                else:
                echo '<h3>' . get_sub_field('title') .'</h3>';
                endif;?>
              </div>
              <div class="col-md-6 editor">
                <?php the_sub_field('content');?>



              </div>
            </div>
        </div>

      </section>
