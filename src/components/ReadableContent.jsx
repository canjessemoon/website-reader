import React from 'react';

const ReadableContent = ({ content }) => {
    if (!content || (!content.title && !content.content)) {
        return null;
    }
    
    return (
        <div className="w-full max-w-3xl mx-auto mb-6 p-8 sm:p-10 md:p-12 bg-white rounded-lg shadow-md">
            {content.title && (
                <h2 className="text-2xl font-bold mb-4 text-gray-800">{content.title}</h2>
            )}
            
            {(content.byline || content.siteName) && (
                <div className="mb-4 text-sm text-gray-600">
                    {content.byline && <p>By {content.byline}</p>}
                    {content.siteName && <p>Source: {content.siteName}</p>}
                </div>
            )}
            
            {content.excerpt && (
                <div className="mb-4 italic text-gray-700 border-l-4 border-gray-300 pl-4">
                    {content.excerpt}
                </div>
            )}
            
            <div 
                className="prose max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: content.content }}
            />
        </div>
    );
};

export default ReadableContent;