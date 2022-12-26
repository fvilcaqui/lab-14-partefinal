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
if(defined($owner)){
    my $sth->prepare('SELECT title FROM Articles WHERE owner=?');
      $sth->execute($owner);
      my @titulos;
      my $articles = "";
      while(my @row = $sth->fetchrow_array){
           push(@titulos,$row[0]);
      }
      foreach my $line(@titulos){
          $articles .= <<XML;
          <article>
              <owner>$owner</owner>
               <title>$line</title>
          </articles>
XML
     }
}else {
   print <<XML;
         <article>
            <owner></owner>
            <title></title>
         </article>
XML
}

