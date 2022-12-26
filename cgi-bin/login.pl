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

my $owner = $q->param("owner");
my $password2 = $q->param("password");

if(defined($owner) and defined($password)){
    my $sth = $dbh->prepare("SELECT password FROM Users WHERE owner=?");
    $sth->execute;
    my $contrasena;
    while(my @row=$sth->fetchrow_array){
        $contrasena = $row[0];
      }
    my $sth2 = $dbh->prepare("SELECT firstName From Users WHERE owner=?");
    $sth2->execute;
    my $firstName;
    while(my @row2 = $sth2->fetchrow_array){
        $firstName = $row2[0];
      }
    my $sth3 = $dbh->prepare("SELECT lastName FROM Users WHERE owner=?");
    $sth3->execute;
    my $lastName;
    while(my @row3 = $sth3->fetchrow_array){
        $lastName = $row3[0];
      }
     print "<?xml version='1.0' encoding='UTF-8'>";
     print <<XML;
        <user>
          <owner>$owner</owner>
          <firstName>$firstName</firstName>
          <lastName>$lastName</lastName>
        </user>
XML
     }
else{
 print "<?xml version='1.0' encoding='UTF-8'>";
 print <<XML;
  <user>
    <owner></owner>
    <firstName></firstName>
    <lastName></lastName>
  </user>
XML
}

