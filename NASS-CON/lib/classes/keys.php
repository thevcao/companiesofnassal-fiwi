<?php

/* Main DEV PU Keys */

//Gravity Forms Key

define( 'GF_LICENSE_KEY', 'cc1a81a1a6a0ca24d1f9b396295e006b' );
//define( 'GF_LICENSE_KEY', 'bf96718925e225bd4b57cbc0eeec9e11' );

update_option( 'searchwp_license_key', 'f5032c560460f52ba7f4b137bee7cc4a' );
update_option( 'searchwp_license_status', 'valid' );
update_option( 'searchwp_license_expiration', '1515110399' );

$all_import_key = 'PMXI_Plugin_Options' ;
$AIPkey = get_option( 'PMXI_Plugin_Options' );

$AIPkey['licenses']['PMXI_Plugin'] = 'bf96718925e225bd4b57cbc0eeec9e11';
$AIPkey['statuses']['PMXI_Plugin'] = 'valid';

update_option( $all_import_key, $AIPkey );

$all_export_key = 'PMXE_Plugin_Options' ;
$AEPkey = get_option( 'PMXE_Plugin_Options' );

$AEPkey['license'] = '5fb5501ce572d5152a38cf388f2d21e6';
$AEPkey['license_status'] = 'valid';

update_option( $all_export_key, $AEPkey );