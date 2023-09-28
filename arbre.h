#ifndef ARBRE_H_INCLUDED
#define ARBRE_H_INCLUDED

typedef struct arbre
{
    char ch;
    int n;
    struct arbre *fd;
    struct arbre *fg;
} arbre;

typedef struct arbre *Tarbre;

Tarbre arbreConsVide();
int arbreEstVide(Tarbre a);
Tarbre arbreCons(char c, int n, Tarbre fg, Tarbre fd);
char arbreRacineLettre(Tarbre a);
int arbreRacineNbOcc(Tarbre a);
Tarbre arbreFilsGauche(Tarbre a);
Tarbre arbreFilsDroit(Tarbre a);
void arbreSuppr(Tarbre a);

#endif // ARBRE_H_INCLUDED
