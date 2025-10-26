import React from 'react';

const ImageSelectPopup = ({ 
    audioSrc, 
    select1, 
    setSelect1, 
    select2, 
    setSelect2, 
    onSubmit,
    image1 = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop",
    image2 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
}) => {
    return (
        <>
            <audio 
                src={audioSrc} 
                controls 
            />
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '1.5rem', 
                marginBottom: '1.5rem' 
            }}>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center' 
                }}>
                    <img 
                        src={image1} 
                        alt="pp 1"
                        style={{ 
                            width: '128px', 
                            height: '128px', 
                            objectFit: 'cover', 
                            borderRadius: '0.5rem', 
                            marginBottom: '0.75rem', 
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                        }}
                    />
                    <select 
                        value={select1}
                        onChange={(e) => setSelect1(e.target.value)}
                        style={{ 
                            width: '100%', 
                            padding: '0.5rem', 
                            border: '2px solid #d1d5db', 
                            borderRadius: '0.5rem',
                            fontSize: '14px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    >
                        <option value="">Select...</option>
                        <option value="bonjour">Bonjour</option>
                        <option value="salut">Salut</option>
                    </select>
                </div>


                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center' 
                }}>
                    <img 
                        src={image2} 
                        alt="pp 2"
                        style={{ 
                            width: '128px', 
                            height: '128px', 
                            objectFit: 'cover', 
                            borderRadius: '0.5rem', 
                            marginBottom: '0.75rem', 
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                        }}
                    />
                    <select 
                        value={select2}
                        onChange={(e) => setSelect2(e.target.value)}
                        style={{ 
                            width: '100%', 
                            padding: '0.5rem', 
                            border: '2px solid #d1d5db', 
                            borderRadius: '0.5rem',
                            fontSize: '14px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    >
                        <option value="select">Select...</option>
                        <option value="bonjour">Bonjour</option>
                        <option value="salut">Salut</option>
                    </select>
                </div>
            </div>

            {/* زر Next */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button 
                    onClick={onSubmit}
                    disabled={!select1 || !select2}
                    style={{ 
                        backgroundColor: (!select1 || !select2) ? '#9ca3af' : '#22c55e',
        color: 'white', 
        padding: '0.75rem 3rem', 
        borderRadius: '0.5rem', 
        fontWeight: 'bold',
        border: 'none',
        cursor: (!select1 || !select2) ? 'not-allowed' : 'pointer',
        fontSize: '16px',
                        top: '87%'
                    }}
                    // onMouseOver={(e) => e.target.style.backgroundColor = '#16a34a'}
                    // onMouseOut={(e) => e.target.style.backgroundColor = '#22c55e'}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default ImageSelectPopup;