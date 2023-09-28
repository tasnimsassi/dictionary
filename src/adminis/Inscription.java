package adminis;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.sql.*;

public class Inscription extends JFrame implements ActionListener {

    private JTextField usernameField;
    private JPasswordField passwordField;
    private JTextField emailField;
    private JButton createAccountButton ,backButton;
    private Connection connection;

    public Inscription(Connection connection) {
        this.connection = connection;

        setTitle("Création de compte");
        setSize(700, 400);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

        
        // En-tête
        JLabel titleLabel = new JLabel("Bienvenue à Plume d'Encre");
        titleLabel.setFont(new Font("Arial", Font.BOLD, 16));
       add(titleLabel, BorderLayout.NORTH);
        
        
        JPanel panel = new JPanel();
        panel.setLayout(null);
        panel.setBackground(new Color(0xDCC8BF));

        JTextArea introTextArea = new JTextArea("Bienvenue à notre bibliothèque ! Cette bibliothèque permet principalement de faire les sauvegardes dans la base de données, de l'inscription des abonnés, de l'emprunt ou retour des livres par les abonnés. Elle permet ensuite de faire des requêtes pour vérifier la disponibilité des livres, ou dans le cas échéant de connaître l'abonné qui l'a emprunté.");
        introTextArea.setEditable(false);
        introTextArea.setLineWrap(true);
        introTextArea.setBackground(new Color(0xDCC8BF)); // pour changer la couleur de fond

        introTextArea.setWrapStyleWord(true);

        // Définir une police en gras et de grande taille
        Font font = new Font("Arial", Font.BOLD, 14);
        introTextArea.setFont(font);

        introTextArea.setBounds(400, 50, 250, 300);
        panel.add(introTextArea);

        
        JLabel usernameLabel = new JLabel("Nom d'utilisateur:");
        usernameLabel.setBounds(50, 50, 150, 30);
        panel.add(usernameLabel);

        usernameField = new JTextField();
        usernameField.setBounds(200, 50, 150, 30);
        panel.add(usernameField);

        JLabel passwordLabel = new JLabel("Mot de passe:");
        passwordLabel.setBounds(50, 100, 150, 30);
        panel.add(passwordLabel);

        passwordField = new JPasswordField();
        passwordField.setBounds(200, 100, 150, 30);
        panel.add(passwordField);

        JLabel emailLabel = new JLabel("Adresse e-mail:");
        emailLabel.setBounds(50, 150, 150, 30);
        panel.add(emailLabel);

        emailField = new JTextField();
        emailField.setBounds(200, 150, 150, 30);
        panel.add(emailField);

        createAccountButton = new JButton("Créer un compte");
        createAccountButton.setBounds(200, 200, 150, 30);
        createAccountButton.addActionListener(this);
        panel.add(createAccountButton);
        
        backButton = new JButton("Retour");
        backButton.setBounds(200, 250,150, 30);
        backButton.addActionListener(this);
        panel.add(backButton);

        add(panel);
        backButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                dispose(); // Ferme la fenêtre actuelle
                Conx conx = new Conx(); // Crée une nouvelle instance de Conx
                conx.setVisible(true); // Affiche la fenêtre de Conx
            }
        });
    }

    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == createAccountButton) {
            String username = usernameField.getText();
            String password = new String(passwordField.getPassword());
            String email = emailField.getText();

            if (username.isEmpty() || password.isEmpty() || email.isEmpty()) {
                JOptionPane.showMessageDialog(this, "Veuillez remplir tous les champs.");
                return;
            }

            try {
                connection = DriverManager.getConnection("jdbc:mysql://localhost/biblio", "root", "tasnim");

                PreparedStatement statement = connection.prepareStatement("SELECT * FROM users WHERE email = ?");
                statement.setString(1, email);
                ResultSet result = statement.executeQuery();

                if (result.next()) {
                    JOptionPane.showMessageDialog(this, "L'adresse e-mail est déjà utilisée.");
                    return;
                }

                statement = connection.prepareStatement("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
                statement.setString(1, username);
                statement.setString(2, password);
                statement.setString(3, email);
                statement.executeUpdate();

                JOptionPane.showMessageDialog(this, "Compte créé avec succès.");
                dispose(); // fermer la fenêtre de création de compte
            } catch (SQLException ex) {
                JOptionPane.showMessageDialog(this, "Erreur lors de la création du compte:\n" + ex.getMessage());
            }
        }
    }
}
