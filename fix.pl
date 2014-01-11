$skip = 0;
while(<>){
   if (!$skip) {
      if (m!^tags:!) {
         $seen_tags++;
      }
      if (m/^---/){
         $dashes++;
      }
      if (m!^description:!) {
         $seen_d++;
         if ($seen_d>=2){
            $skip=1;
         }
      }
      if ($seen_d && $dashes<2) {
         next;
      } else {
         print;
      }
   }
   else {
      print;
   }
}
