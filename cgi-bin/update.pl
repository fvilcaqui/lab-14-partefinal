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

my $title=$q->param('title');
my $owner=$q->param('userName');
my $text=$q->param('text');
if(defined($title) and defined($owner) and defined($text)){
    if(revisarTitulo($owner,$title)){
      my $sth = $dbh->prepare("UPDATE Articles SET text=? WHERE title=? AND owner=?");
      $sth->execute($text,$title,$owner);
      $sth->finish;
      print <<XML;
  <articles>
    <title>$title</title>
    <text>$text</text>
  </articles>
XML
                
      }else{
         print <<XML;
   <articles>
     <title></title>
     <text></text>
   </articles>
XML
     }   
}else{
   print <<XML;
 <articles>
     <title></title>
     <text></text>
 </articles>
XML

}

sub revisarTitulo{
  my $owner=$_[0];
  my $title=$_[1];
  my $sth=$dbh->prepare("SELECT title FROM Articles WHERE owner=? AND title=?");
  $sth->execute($owner,$title);
  my @row = $sth->fetchrow_array;
  $sth->finish;
  return $row[0];
}
