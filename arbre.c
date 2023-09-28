#include "arbre.h"
#include <stdio.h>
#include <stdlib.h>
#include <stddef.h>

/* -------------------------------------------------------*/
/* Primitives de gestion des arbres */
/* -------------------------------------------------------*/

Tarbre arbreConsVide()
{
    return NULL;
}

int arbreEstVide(Tarbre a)
{
    return a == NULL;
}

Tarbre arbreCons(char c, int n, Tarbre fg, Tarbre fd)
{

    Tarbre a = arbreConsVide();
    a = (struct arbre *)malloc(sizeof(struct arbre));
    a->ch = c;
    a->n = n;
    a->fg = fg;
    a->fd = fd;
    return a;
}

char arbreRacineLettre(Tarbre a)
{
    return a->ch;
}

int arbreRacineNbOcc(Tarbre a)
{
    return a->n;
}

Tarbre arbreFilsGauche(Tarbre a)
{
    return a->fg;
}

Tarbre arbreFilsDroit(Tarbre a)
{
    return a->fd;
}

void arbreSuppr(Tarbre a)
{
    if (!arbreEstVide(a))
    {
        arbreSuppr(arbreFilsGauche(a));
        arbreSuppr(arbreFilsDroit(a));
        free(a);
        a = NULL;
    }
}
