import jsPDF from "jspdf";

export const generatePdf = (proposal) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("CLIENT PROPOSAL", 20, 20);

  doc.setFontSize(14);

  doc.text(`Title: ${proposal.title}`, 20, 40);
  doc.text(`Client: ${proposal.clientName}`, 20, 50);
  doc.text(`Email: ${proposal.clientEmail}`, 20, 60);
  doc.text(`Price: ₹${proposal.price}`, 20, 70);
  doc.text(`Timeline: ${proposal.timeline}`, 20, 80);

  doc.text("Description:", 20, 95);
  doc.text(proposal.projectDescription, 20, 105, {
    maxWidth: 170,
  });

  doc.save(`${proposal.title}.pdf`);
};