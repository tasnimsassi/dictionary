
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `biblio`
--

-- --------------------------------------------------------

--
-- Structure de la table `abonne`
--

CREATE TABLE IF NOT EXISTS `abonne` (
  `idab` int(11) NOT NULL,
  `nomab` varchar(100) NOT NULL,
  PRIMARY KEY (`idab`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `abonne`
--

INSERT INTO `abonne` (`idab`, `nomab`) VALUES
(1, 'sassi tasnim'),
(2, 'achour malek'),
(3, 'ouerghi mariem'),
(4, 'garali donia'),
(5, 'bahrouni hadhemi'),
(6, 'hammami syrine'),
(7, 'RAISSA BETEL');

-- --------------------------------------------------------

--
-- Structure de la table `livre`
--

CREATE TABLE IF NOT EXISTS `livre` (
  `idlivre` int(11) NOT NULL,
  `titre` varchar(90) NOT NULL,
  `autheur` varchar(50) DEFAULT NULL,
  `disponible` varchar(10) NOT NULL,
  `idabonne` int(11) DEFAULT NULL,
  PRIMARY KEY (`idlivre`),
  KEY `fk1` (`idabonne`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `livre`
--

INSERT INTO `livre` (`idlivre`, `titre`, `autheur`, `disponible`, `idabonne`) VALUES
(1, 'Les mains sales', NULL, 'OUI', NULL),
(2, 'Tragedie', NULL, 'OUI', NULL),
(3, 'le soleil des independance', NULL, 'OUI', NULL),
(4, 'Republique à vendre', NULL, 'OUI', NULL),
(5, 'Tartarin de Tarascon', NULL, 'NON', 4),
(6, 'Etudiant de soweto', NULL, 'NON', 5),
(7, 'une vie de boy', NULL, 'OUI', NULL);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `pret`
--
CREATE TABLE IF NOT EXISTS `pret` (
`idlivre` int(11)
,`titre` varchar(90)
,`nomab` varchar(100)
);
-- --------------------------------------------------------

--
-- Structure de la vue `pret`
--
DROP TABLE IF EXISTS `pret`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `pret` AS select `livre`.`idlivre` AS `idlivre`,`livre`.`titre` AS `titre`,`abonne`.`nomab` AS `nomab` from (`livre` join `abonne` on((`livre`.`idabonne` = `abonne`.`idab`))) where (`livre`.`disponible` = 'NON');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `livre`
--
ALTER TABLE `livre`
  ADD CONSTRAINT `fk1` FOREIGN KEY (`idabonne`) REFERENCES `abonne` (`idab`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
alter table users add column email varchar(50);
select * from users
