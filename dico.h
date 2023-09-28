#include "arbre.h"
void dicoAfficher(Tarbre a);
void dicoAfficher1(Tarbre a, char mot[], int hauteur);
Tarbre dicoInsererMot(char mot[], Tarbre A);
int dicoNbMotsDifferents(Tarbre pt, int somme);
Tarbre ajout(Tarbre A, char y, int t);
int dicoNbOcc(char mots[], Tarbre arbre, int i);
int piocherMot(char *motPioche);
int nombreAleatoire(int nombreMax);
int dicoNbMotsTotal(Tarbre a);
int dicoEstVide(Tarbre a);
void dicoSupprimerTout(Tarbre *a) ;
