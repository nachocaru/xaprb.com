use English qw(-no_match_vars);

$cats = 0;
while (<>) {
   if (!$skip) {
      if (m/^categories:/){
         $cats++;
      }
      if (m/^---$/) {
         $dashes++;
         if ($dashes == 2) {
            $skip = 1;
         }
      }
      if ($cats >0 && $dashes < 2) {
         s/^\s+-/  -/;
      }
      print;
   } else {
      print;
   }
}
