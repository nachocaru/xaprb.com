use English qw(-no_match_vars);

my %cat_for= (
    'About '                 => 'About',
    'About'                  => 'About',
    'Aspersa'                => 'Open Source',
    'C'                      => 'Programming',
    'CSS'                    => 'Web',
    'Cacti'                  => 'Monitoring',
    'Cassandra'              => 'Databases',
    'Coding'                 => 'Programming',
    'Commentary'             => 'Commentary',
    'Conferences'            => 'Conferences',
    'CouchDB'                => 'Databases',
    'Deployment'             => 'Operations',
    'Desktop'                => 'Desktop',
    'Drizzle'                => 'Databases',
    'GNU/Linux'              => 'Open Source',
    'Gadgets'                => 'Hardware',
    'Go'                     => 'Programming',
    'Health'                 => 'Health',
    'High Availability'      => 'High Availability',
    'High Performance MySQL' => 'Writing',
    'Innotop'                => 'Open Source',
    'Internet'               => 'Web',
    'Javascript'             => 'Web',
    'Maatkit'                => 'Open Source',
    'MariaDB'                => 'Databases',
    'Modeling'               => 'Architecture',
    'MongoDB'                => 'Databases',
    'Monitoring'             => 'Monitoring',
    'Music'                  => 'Music',
    'Open Source'            => 'Open Source',
    'OpenSQL Camp'           => 'Conferences',
    'Operations'             => 'Operations',
    'Oracle'                 => 'MySQL',
    'PHP'                    => 'Programming',
    'Percona Toolkit'        => 'Open Source',
    'Perl'                   => 'Programming',
    'PostgreSQL'             => 'Databases',
    'Review'                 => 'Reviews',
    'Riak'                   => 'Databases',
    'SQL'                    => 'Databases',
    'Scalability'            => 'Performance',
    'Security'               => 'Security',
    'Sphinx'                 => 'Databases',
    'Sys Admin'              => 'Operations',
    'Tools'                  => 'Open Source',
    'Uncategorized'          => 'Databases',
    'Visual Basic'           => 'Programming',
    'World Wide Web'         => 'Web',
    'XML'                    => 'Web',
);

$skip = 0;
my %cats;
my $type = [];

my %pats = (
   'Maatkit' => ['Open Source', 'Databases'],
   'MySQL Toolkit' => ['Open Source', 'Databases'],
   'aspersa|innotop' => ['Open Source', 'Databases'],
   'SQL' => ['Databases'],
);

while (<>) {
    if ( !$skip ) {
       foreach my $pat (keys %pats) {
          if (m/$pat/i ){
             push @$type, @{$pats{$pat}};
          }
       }
        if ( $seen_cats && m/^\s+- (.*)/ ) {
           $cat = $1;
           $cat =~ s/^\s+//g;
           $cat =~ s/\s+$//g;
           $newcat = $cat_for{$cat};
           die "$ARGV[0], $cat" unless $newcat;
           $cats{$newcat}++;
           next;
        }
        if (m!^categories:!) {
            $seen_cats++;
            next;
        }
        if (m/---/){
           $dashes++;
           if ($dashes == 2) {
              if (!$seen_cats) {
                 if (!$type) {
                    print;
                    $skip++;
                    next;
                 }
                 $cats{$_}++ foreach @$type;
              }
              print "categories:\n" if %cats;
              foreach my $cat (sort keys %cats) {
                 print "  - $cat\n";
              }

              $skip++;
           }
        }
        print;
    }
    else {
        print;
    }
}
