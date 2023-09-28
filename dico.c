#include "arbre.h"
#include <stdio.h>
#include <stdlib.h>
#include <stddef.h>
#include <string.h>
#include <time.h>
#include <unistd.h>

/* -------------------------------------------------------*/
/* Primitives de gestion d’un dictionnaire */
/* -------------------------------------------------------*/

Tarbre ajout(Tarbre A, char y, int t)
{
    Tarbre a = arbreConsVide();
    a = (struct arbre *)malloc(sizeof(struct arbre));
    a->ch = y;
    a->n = t;
    a->fg = NULL;
    a->fd = NULL;
    if (A == NULL)
    {
       
        A = a;
        return (A);
    }
    else
    {

        if (A->fg == NULL)
        {
          
            A->fg = a;
        }
        else
        {
            
            ajout(A->fg, y, t);
        }
        return (A);
    }
   
}

Tarbre dicoInsererMot(char mot[], Tarbre A)
{
   
    int i = 0;
    int l = strlen(mot);
    if (A == NULL)
    {
        
        if (mot[0] == '\0')
        {
            A = arbreCons('\0', 0, arbreConsVide(), arbreConsVide());
        }
        else
        {

            for (int i = 0; i < l; i++)
            {
                A = ajout(A, mot[i], 0);
                
            }
            A = ajout(A, '\0', 1);
            return (A);
        }
    }
    else
    {

        Tarbre pointeur = A;
        do
        {
            while (mot[i] == pointeur->ch && (i < l))
            {

                /* descendre vers la gauche correspond à passer à la lettre suivante dans le corps d’un mot */

                /* cas 1 (mot existe) --> incrémentation de la nbr d’occurrence d'un mot */

                if (i == l - 1)
                {
                    pointeur = pointeur->fg;
                    i++;
                    if (pointeur->ch == '\0')
                    {

                        /* cas 1 (mot existe) --> incrémentation de la nbr d’occurrence d'un mot */
                        (pointeur->n)++;
                        
                    }

                    else
                    {
                        /* cas 2 (le mot a ajouter est une partie d'un mot existant ) --> descendre vers la droite */
                        while (pointeur->fd != NULL)
                        {
                            pointeur = pointeur->fd;
                        }
                        pointeur->fd = ajout(pointeur->fd, '\0', 1);
                    }
                    return (A);
                }
                else
                {
                    pointeur = pointeur->fg;
                    i++;
                }
            }

            /* descendre vers la droite correspond à passer à une autre lettre en même position */
            while (mot[i] != pointeur->ch && (i < l))
            {
                if (pointeur->fd == NULL)
                {
                    for (i = i; i < l; i++)
                    {
                        pointeur->fd = ajout(pointeur->fd, mot[i], 0);
                    }
                    pointeur->fd = ajout(pointeur->fd, '\0', 1);
                    return (A);
                }
                else
                {
                    pointeur = pointeur->fd;
                }
            }
        } while (i < l);
    }
}
int dicoNbOcc(char mots[], Tarbre arbre, int i)
{
    Tarbre p = arbre;
    Tarbre fg;
    Tarbre fd;

    if (arbre->ch == '\0')
    {
        return (arbreRacineNbOcc(arbre));
    }

    else if ((arbreRacineLettre(arbre) != '\0') && (arbreRacineLettre(arbre) != mots[i]))
    {
        dicoNbOcc(mots, arbreFilsDroit(arbre), i);
    }
    else if ((arbreRacineLettre(arbre) != '\0') && (arbreRacineLettre(arbre) == mots[i]))
    {
        dicoNbOcc(mots, arbreFilsGauche(arbre), i + 1);
    }
}
int dicoNbMotsDifferents(Tarbre pt, int somme)
{
    if (pt != NULL)
    {
        if (arbreRacineLettre(pt) == '\0')

            return 1 + (dicoNbMotsDifferents(arbreFilsGauche(pt), somme) + dicoNbMotsDifferents(arbreFilsDroit(pt), somme));

        else

            somme = dicoNbMotsDifferents(arbreFilsGauche(pt), somme) + dicoNbMotsDifferents(arbreFilsDroit(pt), somme);
        return somme;
    }
}
int nombreAleatoire(int nombreMax)
{
    srand(time(NULL));
    return (rand() % nombreMax);
}
int piocherMot(char *motPioche)
{
    FILE *dico = NULL;
    int nombreMots = 0, numMotChoisi = 0, i = 0;
    int caractereLu = 0;
    dico = fopen("dico.txt", "r");
    if (dico == NULL)
    {
        printf("\n Le chargement du dictionnaire n'est pas possible");
        return 0;
    }
    do
    {
        caractereLu = fgetc(dico);
        if (caractereLu == '\n')
            nombreMots++;
    } while (caractereLu != EOF);

    numMotChoisi = nombreAleatoire(nombreMots);
    rewind(dico);
    while (numMotChoisi > 0)
    {
        caractereLu = fgetc(dico);
        if (caractereLu == '\n')
            numMotChoisi--;
    }
    fgets(motPioche, 100, dico);
    motPioche[strlen(motPioche) - 1] = '\0';
    fclose(dico);
    return 1;
}
void dicoAfficher1(Tarbre a, char mot[], int hauteur)
{

    // Test si l'arbre est vide.
    if (!arbreEstVide(a))
    {
        mot[hauteur] = arbreRacineLettre(a);
        // Si c'est la fin du mot.
        if (arbreRacineLettre(a) == '\0')
        {
            printf("-\"%s\" son nombres d'occurence = %d\n", mot, arbreRacineNbOcc(a));
        }
        /*Si le mot n'est pas terminé :
            1) Déplacer au sous arbre gauche pour afficher le reste du mot.
            2) Déplacer au sous arbre droite pour afficher, soit le differents parties du mot soit un nouveau mot.
        */
        else
        {
            dicoAfficher1(arbreFilsGauche(a), mot, hauteur + 1);
            dicoAfficher1(arbreFilsDroit(a), mot, hauteur);
        }
    }
}

int dicoNbMotsTotal(Tarbre a)
{
    if (arbreEstVide(a))
    {
        return 0;
    }
    else
    {
        return arbreRacineNbOcc(a) + dicoNbMotsTotal(arbreFilsGauche(a)) + dicoNbMotsTotal(arbreFilsDroit(a));
    }
}
void dicoAfficher(Tarbre a)
{
    
    if (a != NULL)
    {
        
         printf("%c ", a->ch);
         dicoAfficher(a->fg);
         dicoAfficher(a->fd);
    }
}

int dicoEstVide(Tarbre a) {
    return arbreEstVide(a);
}

void dicoSupprimerTout(Tarbre *a) {
    if (*a == NULL) {
        return;
    }
    arbreSuppr(*a);
    *a = NULL;
}

