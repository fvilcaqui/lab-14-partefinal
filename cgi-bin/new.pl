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
my $title = $q->param('title');
my $owner = $q->param('user');
my $text = $q->param('text');
if(defined($title) and defined($owner) and defined($text)){
  if(RevisarRegister($owner)==0){
    if(!RevisarTitulo($owner,$title)){
       my $sth = $dbh->prepare("INSERT INTO Articles VALUES(?,?,?)");
       $sth->execute($title,$owner,$text);
       $sth->finish;
       print <<XML;
             <articles>
                <title>$title</title>
                <text>$text</text>
             </article>
XML
    }else{
      print <<XML;
            <articles>
                <title></title>
                <text></text>
            </article>
XML
}
 }else{
   print <<XML;
         <articles>
            <title></title>
            <text></text>
         </article>
XML
}
}else{
  print <<XML;
        <articles>
           <title></title>
           <text></text>
        </article>
XML
}


