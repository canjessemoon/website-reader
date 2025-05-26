import React, { useState, useEffect } from 'react';
import { testProxies } from '../utils/contentExtractor';
import './ProxyStatus.css';

const ProxyStatus = ({ onClose }) => {
    const [proxies, setProxies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkProxies = async () => {
            try {
                setLoading(true);
                const workingProxies = await testProxies();
                setProxies(workingProxies);
                setError(null);
            } catch (err) {
                setError('Failed to test proxy services');
                console.error('Proxy test error:', err);
            } finally {
                setLoading(false);
            }
        };

        checkProxies();
    }, []);

    return (
        <div className="proxy-status-overlay">
            <div className="proxy-status-modal">
                <div className="proxy-status-header">
                    <h3>CORS Proxy Status</h3>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                
                <div className="proxy-status-content">
                    {loading && (
                        <div className="loading">Testing proxy services...</div>
                    )}
                    
                    {error && (
                        <div className="error">{error}</div>
                    )}
                    
                    {!loading && !error && (
                        <>
                            <p>Working proxy services ({proxies.length} available):</p>
                            {proxies.length > 0 ? (
                                <ul className="proxy-list">
                                    {proxies.map((proxy, index) => (
                                        <li key={index} className="proxy-item working">
                                            <span className="status-indicator">✓</span>
                                            <span className="proxy-name">{proxy.name}</span>
                                            <span className="proxy-hostname">({proxy.hostname})</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="no-proxies">
                                    <p>⚠️ No proxy services are currently working.</p>
                                    <p>You may only be able to access sites that allow direct CORS requests.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
                
                <div className="proxy-status-footer">
                    <p><small>This tool uses multiple proxy services to bypass CORS restrictions when reading website content.</small></p>
                </div>
            </div>
        </div>
    );
};

export default ProxyStatus;
