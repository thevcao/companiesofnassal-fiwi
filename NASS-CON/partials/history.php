<?php $maintemplate = get_template_directory_uri(); ?>


<section class="history">
  <div class="container">

    <div class="row">
        <div class="col-md-11 offset-md-1 pl-md-0 margin-left">
          <h3 class="mb-5">Our History</h3>
        </div>
      </div>
  </div>
  <div class="timeline-container">
    <div class="overlay-layer"></div>

    <div class="timeline-wrapper dragscroll">

          <ul class="timeline full-height">

            <?php $events = get_sub_field('timeline');


                          $i = 1; foreach($events as $event):


                          $excerpt = mb_strimwidth($event['description'], 0, 50, '...');
                          $full = $event['description'];

                          echo '<li id="event-' . $event['title'] . '" data-attr="' . $i++ . '"><img src="' . $event['sizes']['large'] .' alt="' . $event['title'] . ' - ' $excerpt . '"><div class="card"><h5>' . $event['title'] . '</h5><p>' .  $excerpt . '</p><p class="more">' .  $full . '</p></div></li>';
                          endforeach;

                    ?>


          </ul>



    </div>
  </div>
</section>
