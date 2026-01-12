'use client';

import React, { useState, useMemo } from 'react';
import { hadithData } from '@/data/hadiths';
import './page.css';

export default function HadisKutuphanesi() {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Trouver la collection sélectionnée
  const collection = hadithData.collections.find(c => c.id === selectedCollection);
  
  // Trouver le livre sélectionné
  const book = collection?.books.find(b => b.id === selectedBook);
  
  // Collecter tous les hadiths du livre
  const allHadiths = useMemo(() => {
    if (!book) return [];
    return book.chapters.flatMap(ch => ch.hadiths);
  }, [book]);

  // Filtrer les hadiths selon la recherche
  const filteredHadiths = useMemo(() => {
    if (!searchQuery) return allHadiths;
    const query = searchQuery.toLowerCase();
    return allHadiths.filter(hadith =>
      hadith.textAr.toLowerCase().includes(query) ||
      hadith.narrator.toLowerCase().includes(query) ||
      hadith.reference.toLowerCase().includes(query)
    );
  }, [allHadiths, searchQuery]);

  // Toggle favorite
  const toggleFavorite = (hadithId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(hadithId)) {
        newFavorites.delete(hadithId);
      } else {
        newFavorites.add(hadithId);
      }
      return newFavorites;
    });
  };

  // Reset navigation
  const resetToCollections = () => {
    setSelectedCollection(null);
    setSelectedBook(null);
    setSearchQuery('');
  };

  const resetToBooks = () => {
    setSelectedBook(null);
    setSearchQuery('');
  };

  // Niveau 1 : Sélection de la collection
  if (!selectedCollection) {
    return (
      <div className="page-container">
        <div className="home-header">
          <h1>Hadis Kütüphanesi</h1>
          <p>Otantik hadis koleksiyonlarına erişin</p>
        </div>

        <div className="collections-grid">
          {hadithData.collections.map(collection => (
            <button
              key={collection.id}
              onClick={() => setSelectedCollection(collection.id)}
              className="collection-card"
            >
              <div className="collection-icon">📚</div>
              <h2>{collection.name}</h2>
              <p className="collection-name-ar">{collection.nameAr}</p>
              <p className="collection-count">{collection.books.length} Kitap</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Niveau 2 : Liste des livres
  if (!selectedBook) {
    return (
      <div className="page-container">
        <div className="page-header">
          <button onClick={resetToCollections} className="back-button">
            ← Geri
          </button>
          <h1>{collection?.name}</h1>
          <p className="header-subtitle">{collection?.nameAr}</p>
        </div>

        <div className="content-wrapper">
          <h2>Kitaplar ve Bölümler</h2>
          
          <div className="books-grid">
            {collection?.books.map(book => {
              const allHadiths = book.chapters.flatMap(ch => ch.hadiths);
              const totalHadiths = allHadiths.length;
              
              // Trouver le premier et dernier numéro
              const firstId = allHadiths.length > 0 ? allHadiths[0].id : 0;
              const lastId = allHadiths.length > 0 ? allHadiths[allHadiths.length - 1].id : 0;
              
              return (
                <button
                  key={book.id}
                  onClick={() => setSelectedBook(book.id)}
                  className="book-card"
                >
                  <div className="book-icon">📖</div>
                  <h3>{book.name}</h3>
                  <p className="book-name-ar">{book.nameAr}</p>
                  <p className="book-count">{totalHadiths} hadis</p>
                  <p className="book-range">#{firstId} → #{lastId}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Niveau 3 : Affichage des hadiths
  return (
    <div className="page-container">
      <div className="page-header sticky">
        <button onClick={resetToBooks} className="back-button">
          ← Geri
        </button>
        
        <div className="breadcrumb">
          <button onClick={resetToCollections}>Ana Sayfa</button>
          <span>›</span>
          <button onClick={resetToBooks}>{collection?.name}</button>
          <span>›</span>
          <span>{book?.name}</span>
        </div>

        <h1>{book?.name}</h1>
        <p className="header-subtitle">{book?.nameAr}</p>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Hadis ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="content-wrapper">
        <div className="results-count">
          {filteredHadiths.length} hadis bulundu
        </div>

        <div className="hadiths-list">
          {filteredHadiths.map((hadith) => (
            <div key={hadith.id} className="hadith-card">
              <div className="hadith-header">
                <div className="hadith-badges">
                  <span className="badge reference">{hadith.reference}</span>
                  {hadith.grade && (
                    <span className="badge grade">{hadith.grade}</span>
                  )}
                </div>
                <button
                  onClick={() => toggleFavorite(hadith.id)}
                  className="favorite-button"
                >
                  {favorites.has(hadith.id) ? '❤️' : '🤍'}
                </button>
              </div>

              {hadith.narrator && (
                <div className="narrator">
                  <span className="narrator-label">Ravi:</span> {hadith.narrator}
                </div>
              )}

              <div className="hadith-text-ar">
                <p>{hadith.textAr}</p>
              </div>

              {hadith.textTr && (
                <div className="hadith-text-tr">
                  <p>{hadith.textTr}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredHadiths.length === 0 && (
          <div className="no-results">
            <p>Hadis bulunamadı</p>
            <button
              onClick={() => setSearchQuery('')}
              className="clear-search-button"
            >
              Aramayı Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
