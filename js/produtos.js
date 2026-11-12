// Cada produto: [nome, categoria, preço]
const dados = [
  // Jogos
  ["Corrida de Trenó Turbo", "Jogos", 149.90],
  ["Aventura no Polo Norte", "Jogos", 129.90],
  ["Fábrica de Brinquedos", "Jogos", 99.90],
  ["Batalha de Bolas de Neve", "Jogos", 79.90],
  ["Duendes Ninja", "Jogos", 119.90],
  ["Natal Zumbi", "Jogos", 159.90],
  ["Rena Voadora 2", "Jogos", 89.90],
  ["RPG Reino de Gelo", "Jogos", 189.90],
  ["Monte seu Boneco de Neve", "Jogos", 59.90],
  ["Futebol na Neve", "Jogos", 139.90],
  // Teclados e mouses
  ["Teclado Mecânico Vermelho", "Teclados e Mouses", 299.90],
  ["Teclado Mecânico Verde", "Teclados e Mouses", 289.90],
  ["Teclado Sem Fio Branco", "Teclados e Mouses", 179.90],
  ["Teclado Gamer RGB", "Teclados e Mouses", 249.90],
  ["Teclado Compacto 60%", "Teclados e Mouses", 329.90],
  ["Mouse Gamer Rena", "Teclados e Mouses", 129.90],
  ["Mouse Sem Fio Neve", "Teclados e Mouses", 99.90],
  ["Mouse Ergonômico", "Teclados e Mouses", 159.90],
  ["Mouse Pad Gigante Natal", "Teclados e Mouses", 69.90],
  ["Mouse Pad Floco de Neve", "Teclados e Mouses", 49.90],
  // Monitores
  ["Monitor 24 pol Full HD", "Monitores", 899.00],
  ["Monitor 27 pol Full HD", "Monitores", 1199.00],
  ["Monitor 27 pol 144Hz", "Monitores", 1499.00],
  ["Monitor 32 pol Curvo", "Monitores", 1899.00],
  ["Monitor 34 pol Ultrawide", "Monitores", 2399.00],
  ["Monitor 24 pol 165Hz", "Monitores", 1099.00],
  ["Monitor 27 pol 2K", "Monitores", 1699.00],
  ["Monitor Portátil 15 pol", "Monitores", 799.00],
  ["Monitor 22 pol Office", "Monitores", 649.00],
  ["Monitor 28 pol 4K", "Monitores", 2199.00],
  // Componentes
  ["Placa de Vídeo 8GB", "Componentes", 2499.00],
  ["Placa de Vídeo 12GB", "Componentes", 3299.00],
  ["Processador 6 Núcleos", "Componentes", 1099.00],
  ["Processador 8 Núcleos", "Componentes", 1599.00],
  ["Memória RAM 16GB", "Componentes", 349.00],
  ["Memória RAM 32GB", "Componentes", 649.00],
  ["SSD 500GB", "Componentes", 279.00],
  ["SSD 1TB", "Componentes", 449.00],
  ["Fonte 650W", "Componentes", 399.00],
  ["Placa-Mãe", "Componentes", 599.00],
  // Acessórios
  ["Headset Gamer 7.1", "Acessórios", 259.00],
  ["Headset Sem Fio", "Acessórios", 349.00],
  ["Webcam Full HD", "Acessórios", 189.00],
  ["Microfone USB", "Acessórios", 229.00],
  ["Cadeira Gamer Natalina", "Acessórios", 1299.00],
  ["Suporte para Headset", "Acessórios", 59.00],
  ["Hub USB 4 Portas", "Acessórios", 69.00],
  ["Controle Sem Fio", "Acessórios", 199.00],
  ["Fita LED RGB", "Acessórios", 79.00],
  ["Kit Enfeites para Gabinete", "Acessórios", 39.90]
];

// Transforma a lista acima em objetos mais fáceis de usar.
// Todo produto com número múltiplo de 5 entra em oferta.
const produtos = dados.map(function (item, posicao) {
  return {
    id: posicao + 1,
    nome: item[0],
    categoria: item[1],
    preco: item[2] * 10,
    oferta: (posicao + 1) % 5 === 0
  };
});
