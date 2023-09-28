package adminis;

import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.table.DefaultTableModel;

import conn.Connec;

import java.sql.*;

public class Requete extends JFrame implements ActionListener {
	JLabel lb1,lb2,lb3,lb4,lb5,lb6;
	JTextField tf1,tf2,tf3,tf4,tf5;
	JButton bt1,bt2,bt3,bt4,bt5;
	ResultSet rst;
	Statement st;
	JTable tb,tb2,tb3;
	JScrollPane js,js2,js3;
	JComboBox jcb1,jcb2,jcb3;
	
	Connec cn=new Connec();
	
	public Requete(){
		this.setTitle("Plume d'Encre");
		this.setSize(640,600);
		this.setLocationRelativeTo(null);
		JPanel pn=new JPanel();
		pn.setLayout(null);
		pn.setBackground(new Color(0xDCC8BF));
		add(pn);
		//lb
		lb1=new JLabel("Livres empruntes");
		lb1.setBounds(160,10,200,30);
		lb1.setFont(new Font("Arial",Font.BOLD,20));
		
		pn.add(lb1);
		//combo
		jcb1=new JComboBox();
		jcb1.addItem("");
		jcb1.setBounds(20,50,160,25);
		//ajout des titres des livres au combo livres
		String kk5="select titre from livre";
try{
	st=cn.connecion().createStatement();
	rst=st.executeQuery(kk5);
	while(rst.next()){
	jcb1.addItem(rst.getString("titre"));

	}
}
catch(SQLException ex){
	
}
		pn.add(jcb1);
		
		//combo2
				jcb2=new JComboBox();
		jcb2.addItem("");
		jcb2.setBounds(200,50,170,25);
		//ajout des titres des livres au combo livres
		String kk6="select nomab from abonne";
try{
	st=cn.connecion().createStatement();
	rst=st.executeQuery(kk6);
	while(rst.next()){
	jcb2.addItem(rst.getString("nomab"));

	}
}
catch(SQLException ex){
	
}
		pn.add(jcb2);
		//button
				bt1=new JButton("Chercher");
				bt1.setBounds(400,50,100,25);
				bt1.addActionListener(this);
				pn.add(bt1);
	//Livre disponible
				//lb
				lb2=new JLabel("Livres disponibles");
				lb2.setBounds(160,290,200,30);
				lb2.setFont(new Font("Arial",Font.BOLD,20));
				//lb2.setForeground(Color.BLUE);
				pn.add(lb2);
	//jcb3	
				jcb3=new JComboBox();
				jcb3.setBounds(20,330,160,25);
				//ajout des titres des livres au combo livres
				String kk7="select titre from livre";
		try{
			st=cn.connecion().createStatement();
			rst=st.executeQuery(kk7);
			while(rst.next()){
			jcb3.addItem(rst.getString("titre"));

			}
		}
		catch(SQLException ex){
			
		}
				pn.add(jcb3);
		//bt
		bt2=new JButton("V�rifier");
		bt2.setBounds(210,330,100,25);
		bt2.addActionListener(this);
		pn.add(bt2);
		//bt
				bt3=new JButton("Abonne");
				bt3.setBounds(50,500,100,25);
				bt3.addActionListener(this);
				pn.add(bt3);
		//bt
				bt4=new JButton("Emprunt");
				bt4.setBounds(180,500,100,25);
				bt4.addActionListener(this);
				pn.add(bt4);
				//bt
				bt5=new JButton("Livre");
				bt5.setBounds(300,500,100,25);
				bt5.addActionListener(this);
				pn.add(bt5);
				
		
		DefaultTableModel df=new DefaultTableModel();
		init();
		df.addColumn("Livre_ID");
		df.addColumn("Livre_Titre");
		df.addColumn("Emprunteur_Nom");
		df.addColumn("Emprunteur_ID");
		tb.setModel(df);
		pn.add(js);
		String qr="select * from abonne inner join livre on abonne.idab=livre.idabonne";
		try{
			st=cn.connecion().createStatement();
			rst=st.executeQuery(qr);
			while(rst.next()){
			df.addRow(new Object[]{
					rst.getString("idlivre"),rst.getString("titre"),rst.getString("nomab"),rst.getString("idab")
			});	
			}
		}
		catch(SQLException ex){
			
		}
		//tablemodel2
		DefaultTableModel df2=new DefaultTableModel();
		init2();
		df2.addColumn("Livre_ID");
		df2.addColumn("Livre_Titre");
		df2.addColumn("Emprunteur");
		tb2.setModel(df2);
		pn.add(js2);
		//tablemodel3
		DefaultTableModel df3=new DefaultTableModel();
		init3();
		df3.addColumn("Livre_ID");
		df3.addColumn("Livre_Titre");
		tb3.setModel(df3);
		pn.add(js3);
		String qr3="select idlivre,titre from livre where disponible='OUI'";
		try{
			st=cn.connecion().createStatement();
			rst=st.executeQuery(qr3);
			while(rst.next()){
			df3.addRow(new Object[]{
					rst.getString("idlivre"),rst.getString("titre")
			});	
			}
		}
		catch(SQLException ex){
			
		}
	}
	//init
	public void init(){
		tb=new JTable();
		js=new JScrollPane();
		js.setBounds(10,180,600,100);
		js.setViewportView(tb);
	}
	//init2
	public void init2(){
		tb2=new JTable();
		js2=new JScrollPane();
		js2.setBounds(10,90,600,80);
		js2.setViewportView(tb2);
	}
	//init3
		public void init3(){
			tb3=new JTable();
			js3=new JScrollPane();
			js3.setBounds(10,370,600,100);
			js3.setViewportView(tb3);
		}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
    Requete rq=new Requete();
    rq.setVisible(true);
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub
		if(e.getSource()==bt1){
		String b,c;
		b=jcb1.getSelectedItem().toString();
		c=jcb2.getSelectedItem().toString();
		String qr="select * from pret where titre='"+b+"' or nomab='"+c+"'";
		
		//tablemodel2
				DefaultTableModel df2=new DefaultTableModel();
				df2.addColumn("Livre_ID");
				df2.addColumn("Livre_Titre");
				df2.addColumn("Emprunteur");
				tb2.setModel(df2);
		try{
			st=cn.connecion().createStatement();
			rst=st.executeQuery(qr);
			while(rst.next()){
			df2.addRow(new Object[]{
					rst.getString("idlivre"),rst.getString("titre"),rst.getString("nomab")
			});	
			}
		}
		catch(SQLException ex){
			JOptionPane.showMessageDialog(this,"Erreur,insertion impossible!",null,JOptionPane.ERROR_MESSAGE);
		}
			
		}
		if(e.getSource()==bt2){
			String a=jcb3.getSelectedItem().toString();
		  Verification vf=new Verification();
			if(vf.verifier(a)==true){
				JOptionPane.showMessageDialog(this,"DISPONIBLE");
			}
			else
				JOptionPane.showMessageDialog(this,"INDISPONIBLE",null,JOptionPane.ERROR_MESSAGE);
			
		}
		//abonne
		if(e.getSource()==bt3){
			dispose();
			Abonne ab=new Abonne();
			ab.setVisible(true);
			
		}
		//emprunt
		if(e.getSource()==bt4){
			dispose();
			Emprunt ep=new Emprunt();
			ep.setVisible(true);
			
		}
		//livre
		if(e.getSource()==bt5){
			dispose();
			Livre lv=new Livre();
			lv.setVisible(true);
	}
	}
	}
