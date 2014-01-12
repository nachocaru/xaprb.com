use English qw(-no_match_vars);

while (<>) {
   $nl = 0;
   if (m/^---$/){
      $dashes++;
   }
   if (m/<pre>/){
      $pre++;
   }
   if (m!</pre>!){
      $pre--;
   }
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
   print "\n" if ($pre <=0 && $dashes>1 && $_ !~ m/^[*\[]/);
}
