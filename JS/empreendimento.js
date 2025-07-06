document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('attractions-container');
  
    const empreendimentos = [
      {
        nome: "Quiosque do Zé",
        categoria: "Quiosque",
        descricao: "Famoso pelo pastel de camarão e suco natural. Atendimento simpático e vista privilegiada do mar.",
        horario: "08:00 às 18:00"
      },
      {
        nome: "Bar da Duna",
        categoria: "Quiosque",
        descricao: "Oferece porções, drinks tropicais e música ambiente. Ideal para relaxar após a trilha.",
        horario: "09:00 às 20:00"
      },
      {
        nome: "Restaurante Sol Nascente",
        categoria: "Restaurante",
        descricao: "Gastronomia caiçara com pratos típicos como peixe na folha de bananeira e moqueca.",
        horario: "11:00 às 21:00"
      },
      {
        nome: "Trilhas & Aventuras",
        categoria: "Atração",
        descricao: "Empresa de ecoturismo que oferece trilhas guiadas e aluguel de caiaque na Prainha.",
        horario: "07:30 às 17:00"
      },
      {
        nome: "Sorveteria Gelinho do Mar",
        categoria: "Atração",
        descricao: "Sorvetes artesanais e paletas mexicanas com sabores tropicais e opções veganas.",
        horario: "10:00 às 19:00"
      }
    ];
  
    empreendimentos.forEach(ponto => {
      const card = document.createElement('div');
      card.classList.add('attraction-card');
  
      card.innerHTML = `
        <h3>${ponto.nome}</h3>
        <p><strong>Categoria:</strong> ${ponto.categoria}</p>
        <p><strong>Descrição:</strong> ${ponto.descricao}</p>
        <p><strong>Horário:</strong> ${ponto.horario}</p>
      `;
  
      container.appendChild(card);
    });
  });
  