#include <stdio.h>
#include <stdlib.h>
#include "dico.h"
#include <time.h>
#include <unistd.h>
void traitement(Tarbre mon_dico)
{

    char buffer[100];
    Tarbre dico = mon_dico;
    int NbMots = 0;

    printf("\n\n========================= Chargement du dictionnaire =========================\n\n");

    while (NbMots++ < 8 )
    {
        usleep(650000);
        piocherMot(buffer);
        printf("Ajout de mot numero %4d : \"%s\"\n", NbMots, buffer);
        dico = dicoInsererMot(buffer, dico);
    }

    printf("\n\n========================= Fin du chargement ==================================\n\n");

    printf("\n\n========================= Affichage le contenu du dictionnaire =========================\n\n");
   
    dicoAfficher(dico);
     printf("\n\n====================nombre d'occurence====================\n\n");
    dicoAfficher1(dico, buffer, 0);
   
    printf("\n\n========================================================================================\n\n");

    printf("\n\n========================= Les details du dictionnaire =========================\n\n");

    printf("%s = %d\n", "Le nombre des differents mots", dicoNbMotsDifferents(dico, 0));
    printf("%s = %d\n", "Le nombre totale des mots", dicoNbMotsTotal(dico));
   
      printf("\n\n========================= suppression du dictionnaire =========================\n\n");
    //Verify that the dictionary is not empty
    if (!dicoEstVide(dico)) {
        printf("le dictionnaire contient des mots\n");   
     }
     //  Call the dicoSupprimerTout function
      dicoSupprimerTout(&dico);
      dicoAfficher(dico);
      // Verify that the dictionary is now empty
      if (dicoEstVide(dico)) {
        printf("le dictionnaire est maintenant vide \n");
      }
     printf("\n\n=======================goodbye beautiful ========================================\n\n");

    NbMots = 0;

    while (NbMots++ < 2)
    {
        sleep(1);
        piocherMot(buffer);

        printf("\n Le Nombre d'occurrence du \"%s\" = %d\n", buffer, dicoNbOcc(buffer, dico, 0));
    }

    printf("\n\n===============================================================================\n\n");
     
    mon_dico = dico;
     
}

int main()
{

    Tarbre dico;
    char buffer[100];
    dico = arbreConsVide();

    traitement(dico);
    
  

}


