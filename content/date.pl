while(<>){
   if (m!permalink: /(....)/(..)/(..)/.*$!) {
      print "date: \"$1-$2-$3\"\n";
   }
   print;
}
