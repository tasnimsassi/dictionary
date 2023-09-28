package adminis;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.sql.*;
import adminis.Inscription;

public class Conx extends JFrame implements ActionListener {

    private JTextField usernameField;
    private JPasswordField passwordField;
    private JButton loginButton;
    private JButton createAccountButton;
    private Connection connection;

    public Conx() {
        this.setTitle("Plume d'Encre");
    	this.setSize(700,400);
        this.setLocationRelativeTo(null);
        JPanel contentPane = new JPanel();
        contentPane.setLayout(new BorderLayout());
        setContentPane(contentPane);

        contentPane.setBackground(new Color(0xDCC8BF));

        // En-tête
        JLabel titleLabel = new JLabel("Bienvenue dans la bibliothèque");
        titleLabel.setFont(new Font("Arial", Font.BOLD, 16));
        titleLabel.setHorizontalAlignment(SwingConstants.CENTER);
        contentPane.add(titleLabel, BorderLayout.NORTH);

        // Centre (champs de saisie et boutons)
        JPanel centerPanel = new JPanel(new GridBagLayout());
        centerPanel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        centerPanel.setBackground(new Color(0xDCC8BF));
        contentPane.add(centerPanel, BorderLayout.CENTER);

        GridBagConstraints c = new GridBagConstraints();
        c.insets = new Insets(5, 5, 5, 5);
        c.fill = GridBagConstraints.HORIZONTAL; // ajouter pour remplir tout l'espace disponible
        c.weightx = 1.0; // uniformiser la taille des colonnes
        c.weighty = 1.0; // uniformiser la taille des lignes
        c.anchor = GridBagConstraints.LINE_END;
        c.gridx = 0;
        c.gridy = 0;
        centerPanel.add(new JLabel("Nom d'utilisateur:"), c);

        c.gridx = 1;
        c.gridy = 0;
        c.anchor = GridBagConstraints.LINE_START;
        usernameField = new JTextField(20);
        usernameField.setPreferredSize(new Dimension(200, 30));
        centerPanel.add(usernameField, c);

        c.gridx = 0;
        c.gridy = 1;
        c.anchor = GridBagConstraints.LINE_END;
       
        centerPanel.add(new JLabel("Mot de passe:"), c);

        c.gridx = 1;
        c.gridy = 1;
        c.anchor = GridBagConstraints.LINE_START;
        passwordField = new JPasswordField(20);
        passwordField.setPreferredSize(new Dimension(200, 30));
        centerPanel.add(passwordField, c);

        c.gridx = 0;
        c.gridy = 2;
        c.gridwidth = 2;
        c.anchor = GridBagConstraints.CENTER;
        loginButton = new JButton("Connexion");
        loginButton.setPreferredSize(new Dimension(150, 30));
        loginButton.addActionListener(this);
        centerPanel.add(loginButton, c);

        c.gridx = 0;
        c.gridy = 3;
        c.gridwidth = 2;
        c.anchor = GridBagConstraints.CENTER;
        createAccountButton = new JButton("Créer un compte");
        createAccountButton.setPreferredSize(new Dimension(150, 30));
        createAccountButton.addActionListener(this);
        centerPanel.add(createAccountButton, c);

        // Pied de page
        JLabel footerLabel = new JLabel("© Bibliothèque 2023");
        footerLabel.setHorizontalAlignment(SwingConstants.CENTER);
        contentPane.add(footerLabel, BorderLayout.SOUTH);
    }


    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == loginButton) {
            String username = usernameField.getText();
            String password = new String(passwordField.getPassword());

            // Connexion à la base de données MySQL
            Connection conn = null;
            PreparedStatement pstmt = null;
            ResultSet rs = null;
            try {
                Class.forName("com.mysql.cj.jdbc.Driver");
                conn = DriverManager.getConnection("jdbc:mysql://localhost/biblio", "root", "tasnim");

                // Vérifiez si les informations d'identification sont valides
                pstmt = conn.prepareStatement("SELECT * FROM users WHERE username=? AND password=?");
                pstmt.setString(1, username);
                pstmt.setString(2, password);
                rs = pstmt.executeQuery();
                if (rs.next()) {
                    // Les informations d'identification sont valides
                    JOptionPane.showMessageDialog(null, "Connexion réussie !");
                    dispose(); // Fermez la fenêtre d'authentification
                    Abonne abonne = new Abonne();
                    abonne.setVisible(true); // Ouvrez la fenêtre principale de l'application
                } else {
                    // Les informations d'identification sont invalides
                    JOptionPane.showMessageDialog(null, "Nom d'utilisateur ou mot de passe invalide !");
                }
            } catch (ClassNotFoundException ex) {
                ex.printStackTrace();
            } catch (SQLException ex) {
                ex.printStackTrace();
            } finally {
                try {
                    if (rs != null) {
                        rs.close();
                    }
                    if (pstmt != null) {
                        pstmt.close();
                    }
                    if (conn != null) {
                        conn.close();
                    }
                } catch (SQLException ex) {
                    ex.printStackTrace();
                }
            }
        } else if (e.getSource() == createAccountButton) {
            // Ouvrez une fenêtre pour la création de compte ici
        	Inscription inscription = new Inscription(connection);
        	inscription.setVisible(true);
        }
    }

    public static void main(String[] args) {
        Conx loginFrame = new Conx();
        loginFrame.setVisible(true);
    }
}
