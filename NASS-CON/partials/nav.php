<?php ?>

<nav class="full-menu">
    <?php wp_nav_menu( array( 'theme_location' => 'main' ) ); ?>
        <div class="row office-info align-items-end">
          <div class="col-md-8">
            <div class="">
            <p class="uppercase"><?php the_field('footer_companies', 'options');?></p>
            <div class="row">

              <?php if( have_rows('offices', 'options') ):?>
              <?php while ( have_rows('offices', 'options') ) : the_row();?>
              <div class="col-md-auto mr-md-4 office-address">

                <p><?php
                  echo explode(', ' , get_sub_field('address')['address'], 2)[0];
                  echo '<br>' . explode(',' , get_sub_field('address')['address'], 2)[1];
                  ?></p>

              </div>

              <?php endwhile; ?>
              <?php endif; ?>

            </div>

            </div>

          </div>
          <div class="col-md-4">
            <ul class="socials">


              <?php if( have_rows('socials', 'options') ):?>
              <?php while ( have_rows('socials', 'options') ) : the_row();?>
              <li><a href="<?php the_sub_field('link');?>"><?php the_sub_field('type');?></a></li>

              <?php endwhile; ?>
              <?php endif; ?>

            </ul>

          </div>

      </div>
  </nav>
