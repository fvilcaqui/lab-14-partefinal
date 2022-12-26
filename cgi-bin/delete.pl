#!/usr/bin/perl
use strict;
use warnings;
use DBI;
use CGI;

my $user = 'alumno';
my $password = "pweb1";
my $dsn = "DBI:MariaDB:database=pweb1;host=192.168.0.19";
my $dbh = DBI->connect($dsn,$user,$password) or die("No se pudo conectar!");

my $q = CGI->new;
print $q->header('text/xml;charset=UTF-8');

my $owner = $q->param("user");
my $title = $q->title("title");
if(defined($owner) and defined($title)){
  my $sth = $dbh->prepare("DELETE FROM Articles WHERE owner=? and title=?");
    $sth->execute($owner,$title);  
  print <<XML;
<article>
 <owner>$owner<owner>
 <title>$title<title>
</article>
XML
}else { 
print <<XML;
<article>
  <owner></owner>
  <title></title>
</article>
XML
}
