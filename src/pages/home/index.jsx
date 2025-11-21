import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './style.css';
import Header  from '../../components/header/Header';
import ArticleCard from '../../components/article-card/ArticleCard';
import Pagination from "../../components/pagination/Pagination";
import SidebarArticles from '../../components/sidebar-menu/SidebarArticles';
import { useArticles } from "./hooks/useArticles";
import { onDelete } from './hooks/onDelete';

export default function Home({onLoginClick, onRegisterClick, isAuthenticated, userName, onLogout}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const mainContentRef = useRef(null);
    const { articles, isLoading, error, fetchArticles } = useArticles();
    const [showSidebar, setShowSidebar] = useState(false);  
    const [refreshKey, setRefreshKey] = useState(0);

    const articlesPerPage = 10;

    const currentArticles = useMemo(() => {
        const indexOfLastArticle = currentPage * articlesPerPage;
        const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
        return articles.slice(indexOfFirstArticle, indexOfLastArticle);
    }, [articles, currentPage]);

    const totalPages = Math.ceil(articles.length / articlesPerPage);

    const handleSearch = useCallback((term, filter) => {
        setSearchTerm(term);
        setCurrentPage(1);
        fetchArticles(term, filter);
    }, [fetchArticles]); 

    useEffect(() => {
        if (mainContentRef.current) {
            mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [currentPage]);

    return (
        <div className="home-container">
            <Header
                isAuthenticated={isAuthenticated}
                userName={userName}
                handleSearch={handleSearch}
                onLoginClick={onLoginClick}
                onRegisterClick={onRegisterClick}
                onLogout={onLogout}
                onFavoritesClick={() => setShowSidebar(true)}
            />           
            <div className="main-content" ref={mainContentRef}>                             
                {isLoading && <p>Loading results...</p>}
                {error && <p className="error-message">Error: {error}</p>}
                {articles.length > 0 && (
                    <div>
                        <div className='results-header'>
                            <h2>Search Results for "{searchTerm}"</h2>
                            <p>{articles.length} results.</p>
                        </div>                                                
                        {currentArticles.map((article, index) => (<ArticleCard 
                        key={index} article={article} isAuthenticated={isAuthenticated} onSaved={() => setRefreshKey(prev => prev + 1)} />))}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>                  
                )}
                {showSidebar && (
                <SidebarArticles
                    key={refreshKey}
                    userId={userName.id}
                    onClose={() => setShowSidebar(false)}
                    isAuthenticated={isAuthenticated}
                    onDelete={onDelete}                 
                />
                )}
                {!isLoading && !error && searchTerm && articles.length === 0 && (
                    <p>No articles found for "{searchTerm}".</p>
                )}
            </div>
        </div>
    );
}
