use English qw(-no_match_vars);

while (<>) {
   $nl = 0;
   if (m/^\*   /) {
      $ul = 1;
      print "\n";
   }
   if ($ul && m/^[^\s*]/) {
      $ul = 0;
   }
   if ($ul) {
      s/^\s*//;
   }
   if (s!</ul>\s*$!!) {
      $nl = 1;
   }
   print;
   print "\n" if ($ul && $_ !~ m/^[*\[]/);
}
