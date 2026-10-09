export const products = [
  { id: 1, name: 'Sunday Morning Roses', category: 'Flowers', price: 58, image: 'photo-1494972308805-463bc619d34e', tag: 'Bestseller', note: 'A dozen stems, all heart.' },
  { id: 2, name: 'The Little Love Box', category: 'Gift boxes', price: 42, image: 'photo-1549465220-1a8b9238cd48', tag: 'Made for sharing', note: 'A little bit of everything.' },
  { id: 3, name: 'The Good Mood Bear', category: 'Keepsakes', price: 36, image: 'photo-1559454403-b8fb88521f11', tag: 'A warm hug', note: 'Fluffy, friendly, forever.' },
  { id: 4, name: 'Chocolate, Obviously', category: 'Sweet treats', price: 28, image: 'photo-1548907040-4d42d979d68e', tag: 'Sweet favorite', note: 'Small batch, big feelings.' },
  { id: 5, name: 'Petal & Posy Bouquet', category: 'Flowers', price: 64, image: 'photo-1520763185298-1b434c919102', tag: 'Just because', note: 'Fresh-picked and full of joy.' },
  { id: 6, name: 'Movie Night, Sorted', category: 'Gift boxes', price: 48, image: 'photo-1607082349566-187342175e2f', tag: 'Cozy night in', note: 'Snacks for the best seat.' },
  { id: 7, name: 'A Very Sweet Bundle', category: 'Sweet treats', price: 32, image: 'photo-1606313564200-e75d5e30476c', tag: 'A little indulgence', note: 'For your favorite sweet tooth.' },
  { id: 8, name: 'Tiny Cheers Gift Set', category: 'Gift boxes', price: 54, image: 'photo-1513201099705-a9746e1e201f', tag: 'Celebrate them', note: 'A reason to raise a glass.' },
]

export const imageUrl = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
