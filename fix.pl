use English qw(-no_match_vars);

while (<>) {
   if (m/class=.download/){
      $dashes++;
   }
   if (m/^ *$/) {
      $dashes = 0;
   }
   print unless $dashes;
}
