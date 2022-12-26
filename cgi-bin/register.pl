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

my $userName = $q->param('userName');
my $password2 = $q->param('password');
my $firstName = $q->param('firstName');
my $lastName = $q->param('lastName');

if(defined($userName) and defined($password2) and defined($firstName) and defined($lastName)){
      my $sth = $dbh->prepare("INSERT INTO Users VALUES(?,?,?,?)");
      $sth->execute($userName,$password2,$firstName,$lastName);
      print <<XML;
    <User>
       <owner>$userName</owner>
       <firstName>$firstName</firstName>
       <lastName>$lastName</lastName>
     </User>
XML
 $sth->finish;
  }else{
    print <<XML;
    <User>
      <owner></owner>
      <firstName></firstName>
      <lastName></lastName>
    </User>
XML
 }

sub RevisarUserName{
 my $userName=$_[0];
 my $sth=$dbh->prepare("SELECT userName FROM Users WHERE userName=?");
 $sth->execute($userName);
 my @row = $sth->fetchrow_array;
 $sth->finish;
 return @row;
}
                                                    }

