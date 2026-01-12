'use client';

import React, { useState, useEffect } from 'react';
import { hadithData } from '@/data/hadiths';
import './admin.css';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState('bukhari');
  const [selectedBookId, setSelectedBookId] = useState('');
  const [currentHadithIndex, setCurrentHadithIndex] = useState(0);
  const [turkishText, setTurkishText] = useState('');
  const [modifications, setModifications] = useState<Record<number, string>>({});
  const [searchId, setSearchId] = useState('');

  const ADMIN_PASSWORD = 'hadis2026'; // Changez ce mot de passe !

  // Charger les modifications depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('hadith_translations');
    if (saved) {
      setModifications(JSON.parse(saved));
    }
  }, []);

  // Sauvegarder dans localStorage
  const saveToLocalStorage = (mods: Record<number, string>) => {
    localStorage.setItem('hadith_translations', JSON.stringify(mods));
  };

  const collection = hadithData.collections.find(c => c.id === selectedCollection);
  const book = collection?.books.find(b => b.id === selectedBookId);
  const allHadiths = book ? book.chapters.flatMap(ch => ch.hadiths) : [];
  const currentHadith = allHadiths[currentHadithIndex];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Mot de passe incorrect !');
    }
  };

  const handleSave = () => {
    if (!currentHadith) return;
    
    const newMods = {
      ...modifications,
      [currentHadith.id]: turkishText
    };
    
    setModifications(newMods);
    saveToLocalStorage(newMods);
    
    alert('Traduction sauvegardée ! ✅');
  };

  const handleNext = () => {
    if (currentHadithIndex < allHadiths.length - 1) {
      setCurrentHadithIndex(currentHadithIndex + 1);
      loadHadith(allHadiths[currentHadithIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentHadithIndex > 0) {
      setCurrentHadithIndex(currentHadithIndex - 1);
      loadHadith(allHadiths[currentHadithIndex - 1]);
    }
  };

  const handleSearchById = () => {
    const id = parseInt(searchId);
    const index = allHadiths.findIndex(h => h.id === id);
    if (index !== -1) {
      setCurrentHadithIndex(index);
      loadHadith(allHadiths[index]);
    } else {
      alert('Hadith non trouvé !');
    }
  };

  const loadHadith = (hadith: any) => {
    setTurkishText(modifications[hadith.id] || hadith.textTr || '');
  };

  const exportTranslations = () => {
    const dataStr = JSON.stringify(modifications, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hadith_translations_turkish.json';
    link.click();
  };

  const getProgress = () => {
    const total = allHadiths.length;
    const translated = allHadiths.filter(h => modifications[h.id]?.trim()).length;
    return total > 0 ? ((translated / total) * 100).toFixed(1) : 0;
  };

  // Page de connexion
  if (!isAuthenticated) {
    return (
      <div className="admin-container">
        <div className="login-box">
          <h1>🔐 Admin - Traductions Turques</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <button type="submit" className="login-button">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Sélection du livre
  if (!selectedBookId) {
    return (
      <div className="admin-container">
        <div className="admin-header">
          <h1>📚 Sélectionnez un livre</h1>
          <button onClick={exportTranslations} className="export-button">
            💾 Exporter les traductions
          </button>
        </div>

        <div className="books-list">
          {collection?.books.map(book => {
            const total = book.chapters.flatMap(ch => ch.hadiths).length;
            const translated = book.chapters.flatMap(ch => ch.hadiths)
              .filter(h => modifications[h.id]?.trim()).length;
            const percentage = total > 0 ? ((translated / total) * 100).toFixed(0) : 0;

            return (
              <button
                key={book.id}
                onClick={() => setSelectedBookId(book.id)}
                className="book-select-card"
              >
                <h3>{book.name}</h3>
                <p className="book-ar">{book.nameAr}</p>
                <div className="progress-info">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span>{translated}/{total} traduits ({percentage}%)</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Interface d'édition
  if (!currentHadith) {
    return (
      <div className="admin-container">
        <p>Aucun hadith disponible dans ce livre.</p>
        <button onClick={() => setSelectedBookId('')}>Retour</button>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Header */}
      <div className="admin-header">
        <button onClick={() => setSelectedBookId('')} className="back-button">
          ← Retour aux livres
        </button>
        <h1>{book?.name}</h1>
        <div className="progress-info">
          <span>Progression : {getProgress()}%</span>
          <button onClick={exportTranslations} className="export-button">
            💾 Exporter
          </button>
        </div>
      </div>

      {/* Navigation rapide */}
      <div className="quick-nav">
        <div className="search-box">
          <input
            type="number"
            placeholder="ID du hadith"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearchById} className="search-button">
            🔍 Rechercher
          </button>
        </div>
        <span className="hadith-counter">
          Hadith {currentHadithIndex + 1} / {allHadiths.length}
        </span>
      </div>

      {/* Hadith actuel */}
      <div className="editor-container">
        {/* Référence */}
        <div className="hadith-reference">
          <span className="badge">#{currentHadith.id}</span>
          <span className="badge">{currentHadith.reference}</span>
          {modifications[currentHadith.id] && (
            <span className="badge success">✅ Traduit</span>
          )}
        </div>

        {/* Narrateur */}
        {currentHadith.narrator && (
          <div className="narrator-box">
            <strong>Ravi :</strong> {currentHadith.narrator}
          </div>
        )}

        {/* Texte arabe */}
        <div className="text-section">
          <h3>📖 Arabe</h3>
          <div className="text-box arabic">
            {currentHadith.textAr}
          </div>
        </div>

        {/* Texte anglais (référence) */}
        <div className="text-section">
          <h3>🇬🇧 Anglais (référence)</h3>
          <div className="text-box english">
            {currentHadith.narrator && `Narrated ${currentHadith.narrator}: `}
            {/* Note: Le texte anglais n'est pas dans la structure actuelle */}
            <em>Texte anglais non disponible dans les données</em>
          </div>
        </div>

        {/* Éditeur turc */}
        <div className="text-section">
          <h3>🇹🇷 Turc (à éditer)</h3>
          <textarea
            value={turkishText}
            onChange={(e) => setTurkishText(e.target.value)}
            className="text-editor"
            placeholder="Entrez la traduction turque ici..."
            rows={8}
          />
        </div>

        {/* Boutons d'action */}
        <div className="action-buttons">
          <button 
            onClick={handlePrevious} 
            disabled={currentHadithIndex === 0}
            className="nav-button"
          >
            ← Précédent
          </button>
          
          <button onClick={handleSave} className="save-button">
            💾 Enregistrer
          </button>
          
          <button 
            onClick={handleNext} 
            disabled={currentHadithIndex === allHadiths.length - 1}
            className="nav-button"
          >
            Suivant →
          </button>
        </div>

        {/* Raccourcis clavier */}
        <div className="keyboard-shortcuts">
          <small>
            💡 Raccourcis : Ctrl+S = Sauvegarder | Ctrl+← = Précédent | Ctrl+→ = Suivant
          </small>
        </div>
      </div>
    </div>
  );
}
