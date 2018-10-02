<?php
/**
 * The template for displaying the footer
 *
 * @package Smores
 * @since Smores 2.0
 */

//$name = sanitize_title_for_query(get_bloginfo( 'name'));
//$site_name = esc_attr( $name );
?>

    <?php if(!get_field('coming_soon', 'options')):?>
    <footer>
      <div class="container">

        <div class="row">
          <div class="col-md-2 mx-md-0 col-8 mx-auto order-2 order-md-1">
            <a href="<?php echo get_site_url(1);?>" class="logo">
            <img src="<?php echo get_template_directory_uri(); ?>/dist/img/logo-full-companies-of-nassal.svg">
            </a>
          </div>
          <div class="col-md-4 col-12 ml-md-auto mx-md-0 mx-auto order-1 order-md-2">
            <ul class="footer-links">
              <li><a href="https://www.ziprecruiter.com/candidate/search?search=hiring_company_id%3A%22fb2989f5%22" target="_blank">Careers</a></li>
              <li><a href="#returnTop"><i class="fa fa-angle-up"></i> Back to Top</a></li>
            </ul>

          </div>

      </div>
        <div class="row office-info align-items-end">
          <div class="col-md">
            <div class="">

            <div class="row">

              <?php if( have_rows('offices', 'options') ):?>
              <?php while ( have_rows('offices', 'options') ) : the_row();?>
              <div class="col-md-auto mr-lg-4 office-address">

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
          <div class="col-auto ml-md-auto mx-md-0 mx-auto">
            <ul class="socials">


              <?php if( have_rows('socials', 'options') ):?>
              <?php while ( have_rows('socials', 'options') ) : the_row();?>
              <li><a href="<?php the_sub_field('link');?>"><?php the_sub_field('type');?></a></li>

              <?php endwhile; ?>
              <?php endif; ?>

            </ul>

          </div>

      </div>
        <div class="row copy align-items-end">
          <div class="col-md-6">
            <p>&copy; <?php echo date("Y"); ?> The Companies of Nassal</p>
          </div>
          <div class="col-md-6 by-fiwi">
            <img src="<?php echo get_template_directory_uri(); ?>/dist/img/FIWI-classic-website.svg">
          </div>
        </div>
      </div>

    </footer>
    <?php else:?>
    </hidden>
    <?php endif;?>
    <?php wp_footer(); ?>

    <script>
    function get_browser(){var r,e=navigator.userAgent,o=e.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];return/trident/i.test(o[1])?(r=/\brv[ :]+(\d+)/g.exec(e)||[],{name:"IE",version:r[1]||""}):"Chrome"===o[1]&&null!=(r=e.match(/\bOPR|Edge\/(\d+)/))?{name:"Opera",version:r[1]}:(o=o[2]?[o[1],o[2]]:[navigator.appName,navigator.appVersion,"-?"],null!=(r=e.match(/version\/(\d+)/i))&&o.splice(1,1,r[1]),{name:o[0],version:o[1]})}$(window).load(function(){outdatedBrowser({bgColor:"",color:"#ffffff",lowerThan:"transform",languagePath:""})});var browser=get_browser();$("span.version").text(browser.version);
    </script>

  </body>




</html>
