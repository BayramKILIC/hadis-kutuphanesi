'use client';

import React, { useState, useMemo } from 'react';
import { hadithData } from '@/data/hadiths';

export default function HadisKutuphanesi() {
  const [selectedCollection, setSelectedCollection] = useState<any>(null);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [selectedChapter, setSelectedChapter] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showArabic, setShowArabic] = useState(true);
  const [showTurkish, setShowTurkish] = useState(true);

  const searchResults = useMemo(() => {
    if (!searchTerm) return null;
    
    const results: any[] = [];
    const term = searchTerm.toLowerCase();
    
    hadithData.collections.forEach(collection => {
      collection.books.forEach(book => {
        book.chapters.forEach(chapter => {
          chapter.hadiths.forEach(hadith => {
            if (
              hadith.textTr.toLowerCase().includes(term) ||
              hadith.textAr.includes(searchTerm) ||
              hadith.narrator.toLowerCase().includes(term)
            ) {
              results.push({
                ...hadith,
                collectionName: collection.name,
                bookName: book.name,
                chapterName: chapter.name
              });
            }
          });
        });
      });
    });
    
    return results;
  }, [searchTerm]);

  const toggleFavorite = (hadithId: number) => {
    setFavorites(prev => 
      prev.includes(hadithId) 
        ? prev.filter(id => id !== hadithId)
        : [...prev, hadithId]
    );
  };

  const HadithCard = ({ hadith, showContext = false }: any) => (
    <div className="hadith-card">
      <div className="hadith-header">
        <div style={{ flex: 1 }}>
          {showContext && (
            <div className="hadith-context">
              {hadith.collectionName} › {hadith.bookName} › {hadith.chapterName}
            </div>
          )}
          <div className="hadith-badges">
            <span className="badge badge-primary">{hadith.reference}</span>
            <span className="badge badge-secondary">{hadith.grade}</span>
          </div>
        </div>
        <button
          onClick={() => toggleFavorite(hadith.id)}
          className={`favorite-btn ${favorites.includes(hadith.id) ? 'active' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </button>
      </div>
      
      {showArabic && (
        <div className="hadith-text-ar">
          <p>{hadith.textAr}</p>
        </div>
      )}
      
      {showTurkish && (
        <div className="hadith-text-tr">
          <p>{hadith.textTr}</p>
        </div>
      )}
      
      <div className="hadith-narrator">
        <span>Ravi:</span> {hadith.narrator}
        {showArabic && <span style={{ marginRight: '0.5rem' }} dir="rtl"> ({hadith.narratorAr})</span>}
      </div>
    </div>
  );

  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="header-title-section">
              <div>
                <h1 className="header-title">Hadis Kütüphanesi</h1>
                <p className="header-subtitle">مكتبة الأحاديث النبوية</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            
            <div className="search-box">
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <input
                type="text"
                placeholder="Hadis, ravi veya konu ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={showArabic}
                  onChange={(e) => setShowArabic(e.target.checked)}
                />
                <span>Arapça</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={showTurkish}
                  onChange={(e) => setShowTurkish(e.target.checked)}
                />
                <span>Türkçe</span>
              </label>
            </div>
          </div>
        </div>
      </header>

      <div className="container main-content">
        {searchResults && (
          <div>
            <h2 className="section-title">
              Arama Sonuçları ({searchResults.length})
            </h2>
            {searchResults.length === 0 ? (
              <p style={{ color: '#6b7280' }}>Sonuç bulunamadı.</p>
            ) : (
              searchResults.map((hadith: any) => (
                <HadithCard key={hadith.id} hadith={hadith} showContext={true} />
              ))
            )}
          </div>
        )}

        {!searchTerm && (
          <div className="grid-3">
            <div className="card">
              <h2 className="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                </svg>
                Koleksiyonlar
              </h2>
              <div className="button-list">
                {hadithData.collections.map((collection: any) => (
                  <button
                    key={collection.id}
                    onClick={() => {
                      setSelectedCollection(collection);
                      setSelectedBook(null);
                      setSelectedChapter(null);
                    }}
                    className={`list-button ${selectedCollection?.id === collection.id ? 'active' : ''}`}
                  >
                    <span className="button-name">{collection.name}</span>
                    <span className="button-name-ar">{collection.nameAr}</span>
                  </button>
                ))}
              </div>
            </div>

            {selectedCollection && (
              <div className="card">
                <h2 className="card-title">Kitaplar</h2>
                <div className="button-list">
                  {selectedCollection.books.map((book: any) => (
                    <button
                      key={book.id}
                      onClick={() => {
                        setSelectedBook(book);
                        setSelectedChapter(null);
                      }}
                      className={`list-button ${selectedBook?.id === book.id ? 'active' : ''}`}
                    >
                      <span className="button-name">{book.name}</span>
                      <span className="button-name-ar">{book.nameAr}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedBook && (
              <div className="card">
                <h2 className="card-title">Bölümler</h2>
                <div className="button-list">
                  {selectedBook.chapters.map((chapter: any) => (
                    <button
                      key={chapter.id}
                      onClick={() => setSelectedChapter(chapter)}
                      className={`list-button ${selectedChapter?.id === chapter.id ? 'active' : ''}`}
                    >
                      <span className="button-name">{chapter.name}</span>
                      <span className="button-name-ar">{chapter.nameAr}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!searchTerm && selectedChapter && (
          <div style={{ marginTop: '2rem' }}>
            <h2 className="section-title">
              Hadisler - {selectedChapter.name}
            </h2>
            {selectedChapter.hadiths.map((hadith: any) => (
              <HadithCard key={hadith.id} hadith={hadith} />
            ))}
          </div>
        )}

        {!searchTerm && !selectedCollection && (
          <div className="welcome">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <h2>Hoş Geldiniz</h2>
            <p>Hadisleri keşfetmeye başlamak için bir koleksiyon seçin</p>
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="container">
          <p>© 2026 Hadis Kütüphanesi - Tüm hakları saklıdır</p>
          <p>Kutub al-Sittah (Altı Kitap) koleksiyonu</p>
        </div>
      </footer>
    </div>
  );
}