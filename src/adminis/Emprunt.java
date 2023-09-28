package adminis;

import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;

import com.mysql.jdbc.Statement;

import conn.Connec;

import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import java.sql.*;


public class Emprunt extends JFrame implements ActionListener {
	java.sql.Statement st;
	ResultSet rst;
	Connec cn=new Connec();
	JComboBox jcb,jcb2;
	JLabel lb1,lb2,lb3,lb4,lb5,lb6,lb7;
	JTextField tf1,tf5,tf6,tf7;
	JButton jb,jb2,bt3,blivre,babonne;
	public Emprunt(){
		this.setTitle("plume d'encre");
		this.setSize(400,500);
		this.setLocationRelativeTo(null);
		JPanel pn=new JPanel();
		pn.setLayout(null);
		pn.setBackground(new Color(0xDCC8BF));
		add(pn);
		
		//label
		lb3=new JLabel("Emprunt des livres");
		lb3.setBounds(100,50,180,25);
		//lb3.setForeground(Color.blue);
		lb3.setFont(new Font("Arial",Font.BOLD,18));
		pn.add(lb3);
				
		
		lb1=new JLabel("IdAbonne");
		lb1.setBounds(30,100,130,25);
		pn.add(lb1);
		 tf1=new JTextField();
		 tf1.setBounds(110,100,130,25);
		pn.add(tf1);
		
		lb2=new JLabel("Livre");
		lb2.setBounds(30,150,130,25);
		pn.add(lb2);
		
		
		jcb=new JComboBox();
		jcb.setBounds(100,150,220,25);
		//ajout des titres des livres
		String kk4="select titre from livre";
try{
	st=cn.connecion().createStatement();
	rst=st.executeQuery(kk4);
	while(rst.next()){
	jcb.addItem(rst.getString("titre"));

	}
}
catch(SQLException ex){
	
}
		pn.add(jcb);
	
		//button
		jb=new JButton("Valider");
		jb.setBounds(100,190,100,25);
		jb.addActionListener(this);
		pn.add(jb);
		//retour
		//
		lb4=new JLabel("Retour des livres");
		lb4.setBounds(100,240,160,25);
		//lb4.setForeground(Color.blue);
		lb4.setFont(new Font("Arial",Font.BOLD,18));
		pn.add(lb4);
		
		lb5=new JLabel("IdAbonne");
		lb5.setBounds(30,280,130,25);
		pn.add(lb5);
		 tf5=new JTextField();
		 tf5.setBounds(110,280,130,25);
		pn.add(tf5);
		//livre
		lb6=new JLabel("Livre");
		lb6.setBounds(30,320,130,25);
		pn.add(lb6);
		//combo
		jcb2=new JComboBox();
		jcb2.setBounds(100,320,220,25);
		//ajout des titres des livres au combo livres
		String kk5="select titre from livre";
try{
	st=cn.connecion().createStatement();
	rst=st.executeQuery(kk5);
	while(rst.next()){
	jcb2.addItem(rst.getString("titre"));

	}
}
catch(SQLException ex){
	
}
		pn.add(jcb2);
		//button
				jb2=new JButton("Valider");
				jb2.setBounds(100,360,100,25);
				jb2.addActionListener(this);
				pn.add(jb2);
		//bouton requete
				bt3=new JButton("Requetes");
				bt3.setBounds(10,420,110,30);
				bt3.addActionListener(this);
				pn.add(bt3);
		//bouton livre
				blivre=new JButton("Livres");
				blivre.setBounds(135,420,110,30);
				blivre.addActionListener(this);
				pn.add(blivre);
	 //bouton abonn�
				babonne=new JButton("Abonnes");
				babonne.setBounds(260,420,110,30);
				babonne.addActionListener(this);
				pn.add(babonne);
				
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Emprunt ep=new Emprunt();
		ep.setVisible(true);

	}

	@Override
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub
		if(e.getSource()==jb){
			String a,b;
			a=tf1.getText();b=jcb.getSelectedItem().toString();
			String qr="update livre set disponible='NON',idabonne='"+a+"' where titre='"+b+"'";
			try{
				st=cn.connecion().createStatement();
				if(JOptionPane.showConfirmDialog(this,"ajouter?",null,JOptionPane.OK_CANCEL_OPTION)==JOptionPane.OK_OPTION){
					st.executeUpdate(qr);
					JOptionPane.showMessageDialog(this,"validaton reussie!");
				}
				
			}
			catch(SQLException ex){
				JOptionPane.showMessageDialog(this,"validaton echouee!",null,JOptionPane.ERROR_MESSAGE);
			}
		}
		if(e.getSource()==jb2){
			String a,b;
			a=tf5.getText();
			b=jcb2.getSelectedItem().toString();
			String qr="update livre set disponible='OUI',idabonne=NULL where idabonne='"+a+"' and titre='"+b+"'";
			try{
				st=cn.connecion().createStatement();
				if(JOptionPane.showConfirmDialog(this,"ajouter?",null,JOptionPane.OK_CANCEL_OPTION)==JOptionPane.OK_OPTION){
					st.executeUpdate(qr);
					JOptionPane.showMessageDialog(this,"validaton reussie!");
				}
				
			}
			catch(SQLException ex){
				JOptionPane.showMessageDialog(this,"validaton echouee!",null,JOptionPane.ERROR_MESSAGE);
			}
			
		}
		//requetes
		if(e.getSource()==bt3){
			dispose();
			Requete rq=new Requete();
			rq.setVisible(true);
			
		}
		//livres
		if(e.getSource()==blivre){
			dispose();
			Livre lv=new Livre();
			lv.setVisible(true);
			
		}
		//abonn�s
		if(e.getSource()==babonne){
			dispose();
			Abonne ab=new Abonne();
			ab.setVisible(true);
			
		}
		//
		
	}

}
