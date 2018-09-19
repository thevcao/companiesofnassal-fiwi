<?php?>

<div id="outdated">
     <h6>Your browser is out-of-date!</h6>
     <p>Update your browser to view this website correctly.</p>
    <div id="ie">
        <img src="<?php echo get_template_directory_uri(); ?>/dist/img/ie.svg">
        <p>You are running Version <span class="version"></span></p>
        <p>Updating your browser is more secure and is free!</p>
        <a id="btnUpdateBrowser" href="https://support.microsoft.com/en-us/help/17621/internet-explorer-downloads" target="_blank">Update Internet Explorer</a>
    </div>
    <div id="firefox">
        <img src="<?php echo get_template_directory_uri(); ?>/dist/img/firefox.svg">
        <p>You are running Version <span class="version"></span></p>
        <p>Updating your browser is more secure and is free!</p>
        <a id="btnUpdateBrowser" href="https://www.mozilla.org/en-US/firefox/new/" target="_blank">Update Firefox</a>
    </div>
    <div id="chrome">
        <img src="<?php echo get_template_directory_uri(); ?>/dist/img/chrome.svg">
        <p>You are running Version <span class="version"></span></p>
        <p>Updating your browser is more secure and is free!</p>
        <a id="btnUpdateBrowser" href="https://www.google.com/chrome/" target="_blank">Update Chrome</a>
    </div>
    <div id="safari">
        <img src="<?php echo get_template_directory_uri(); ?>/dist/img/safari.svg">
        <p>You are running Version <span class="version"></span></p>
        <p>Updating your browser is more secure and is free!</p>
        <a id="btnUpdateBrowser" href="https://www.apple.com/safari/" target="_blank">Update Safari</a>
    </div>
    <div class="thanks">
    <img src="<?php echo get_template_directory_uri(); ?>/dist/img/fiwi-management.svg">
        <p>Thanks<span>- Management</span></p>
    </div>
     <p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Close">&times;</a></p>
</div>
