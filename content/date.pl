while(<>){
   if (m!^date: .*[^>]$!) {
      $seen_date++;
   }
   if (m!^title: .*[^>]$!) {
      $seen_title++;
   }
   if (m/^---$/) {
      $seen_dashes++;
   }
   if ($seen_title && !$seen_date ) {
      print unless m/^ /;
   } else {
      print;
   }
}
