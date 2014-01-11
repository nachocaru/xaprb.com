$skip = 0;
while(<>){
   if (!$skip) {
      if ($seen_tags && m/^\S/){
         $skip++;
         print; next;
      }
      if (m!^tags:!) {
         $seen_tags++;
      }
      if ($seen_tags) {
         next;
      } else {
         print;
      }
   }
   else {
      print;
   }
}
